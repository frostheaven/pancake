import { des_decrypt, des_key, des_encrypt } from './des.func.js'

// 基本功能脚本

//获取当前时间
export function getCurrentTime() {
    const socket = new WebSocket('ws://localhost:5001');

    socket.onmessage = function (event) {
        let timeElement = document.getElementById('time');
        let dt_ms = JSON.parse(event.data);
        // console.log(dt_ms);
        timeElement.textContent = dt_ms;
    }

    socket.onclose = function () {
        // console.log('WebSocket连接已关闭');
        // 尝试重新连接
        setTimeout(getCurrentTime, 1000 / 2);
    }
}

//弹窗功能
export class popFuncs {
    constructor() {
        this.displayPop = () => {
            const pop_window = document.getElementById('pop-window');
            pop_window.style.display = "block";
        };
        this.closePop = () => {
            const pop_window = document.getElementById('pop-window');
            pop_window.style.display = "none";
        };
        this.showInfo = (msg) => {
            const pop_info = document.getElementById('pop-info');
            pop_info.innerText = msg;
        };
        this.addInfo = (msg) => {
            const pop_info = document.getElementById('pop-info');
            pop_info.innerText += msg + '\n\n'
        }

        this.showTitle = (msg) => {
            const pop_title = document.getElementById('pop-title');
            pop_title.innerText = msg;
        };

        this.resetPop = () => {
            const pop_title = document.getElementById('pop-title');
            const pop_info = document.getElementById('pop-info');
            pop_title.innerText = '提示';
            pop_info.innerText = '';
        }

        this.fileDecrypt = async () => {
            let file_json = localStorage.getItem('fileInfo')
            const file_info = JSON.parse(file_json)
            const file_encrypt_data = file_info['data']
            const file_name = file_info['name']
            const file_decrypt_base64_data = await des_decrypt(file_encrypt_data, des_key)
            console.log('文件加密数据长度', file_encrypt_data.length)
            console.log('解密后base64长度', file_decrypt_base64_data.length)
            const file_decrypt_data = atob(file_decrypt_base64_data).split('').map(char => char.charCodeAt(0))
            const file_data_stream = new Uint8Array(file_decrypt_data);
            console.log('解密后二进制流', file_data_stream)


            const file_url = window.URL.createObjectURL(new Blob([file_data_stream]));
            const a = document.createElement('a');
            a.href = file_url;
            a.download = file_name;;
            a.click();
            window.URL.revokeObjectURL(file_url)

        }
    }
}

//弹窗功能挂载（至按钮）
export function initPopBtn() {
    const pop = new popFuncs()
    document.getElementById("pop-close-btn").onclick = () => {
        pop.closePop()
        pop.resetPop()
    };
    document.getElementById("pop-check-btn").onclick = async () => {
        await pop.fileDecrypt()
        // pop.resetPop()
    };
}

//文本加密
export function encryptInputText() {
    const encrypt_input = document.getElementById('text-to-encrypt')
    const encrypt_btn = document.getElementById('encrypt-btn')
    const decrypt_input = document.getElementById('text-to-decrypt')

    encrypt_btn.onclick = async () => {
        let plain_text = encrypt_input.value
        let cipher_text = await des_encrypt(String(plain_text), des_key)
        decrypt_input.value = cipher_text
    }
}

//文本解密
export function decryptInputText() {
    const decrypt_input = document.getElementById('text-to-decrypt')
    const decrypt_btn = document.getElementById('decrypt-btn')
    const result_div = document.getElementById('text-decrypt-result')

    decrypt_btn.onclick = async() => {
        let cipher_text = decrypt_input.value
        if(cipher_text == '') {
            alert('解密内容不能为空！')
        }else {
            let plain_text = await des_decrypt(cipher_text, des_key)
            result_div.innerText = plain_text
        }
    }
}