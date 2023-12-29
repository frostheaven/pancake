import { SM4encrypt, encryptkey, get_pyodide_loader } from "./pyodide.func.js"
import { popFuncs } from "./func.js"
// 文件传输相关脚本

let pyodide_loader = new Object
await get_pyodide_loader().then((res) => {
    pyodide_loader = res
}).catch((err) => {
    console.log('pyodide启动获取失败', err)
})

function Uint8ArrayToString(fileData) {
    let dataString = "";
    for (let i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
    }

    return dataString

}

//连接websocket
function connectWebsocket(port = 5000) {
    // 建立WebSocket连接
    const socket = new WebSocket('ws://localhost:' + port)
    // 处理连接打开事件
    socket.onopen = (event) => {
        // console.log('文件上传开启', event)
    }

    // 处理连接关闭事件
    socket.onclose = (event) => {
        // console.log('文件上传关闭', event)
        // 尝试重新连接
        setTimeout(connectWebsocket(port), 1000 / 2)
    }

    // 处理连接错误事件
    socket.onerror = (error) => {
        console.log('WebSocket Error', error)
    }

    return socket
}

// 文件拖曳上传
/**
dataTransfer 对象拥有的属性和方法：
    dropEffect：获取当前选定的拖放操作类型或者设置的为一个新的类型。值必须为none, copy, link或move。
    effectAllowed：提供所有可用的操作类型。必须是none, copy, copyLink, copyMove, link, linkMove, move, all or uninitialized 之一。
    files：包含数据传输中可用的所有本地文件的列表。
    items：只读，提供一个包含所有拖动数据列表的DataTransferItemList对象。
    types：只读，一个提供dragstart事件中设置的格式的字符串数组。
    clearData()：删除与给定类型关联的数据。不给定参数则删除所有
    getData()：检索给定类型的数据。
    setData()：设置给定类型的数据。不存在则添加到末尾，存在则替换相同位置的数据。
    setDragImage()：用于设置自定义的拖动图像。
*/

function randomString(length, chars) {
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}


export function fileDropUpload(port = 5002) {
    const dropArea = document.getElementById('dropArea');
    const pop = new popFuncs()
    const stopPropagation = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };

    const socket = connectWebsocket(port)

    dropArea.addEventListener('dragenter', stopPropagation, false);
    dropArea.addEventListener('dragover', stopPropagation, false);
    // 修改前端发送文件的代码
    dropArea.addEventListener('drop', async (dragEvent) => {
        stopPropagation(dragEvent);
        const file = dragEvent.dataTransfer.files[0];
        pop.displayPop()
        pop.resetPop()
        pop.showInfo('文件上传成功，开始发送...')

        // 读取文件数据并分块发送到服务器
        const chunkSize = 1024 * 8;
        const totalChunks = Math.ceil(file.size / chunkSize);
        pop.addInfo(`总分块数：${totalChunks}`)
        const cbckey = randomString(15, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        // console.log('cbckey', cbckey)
        let Ccbckey = ""
        await encryptkey(cbckey, pyodide_loader).then((res) => {
            Ccbckey = res.map((el) => el)
            // console.log('Ccbckey', Ccbckey)
        }).catch((err) => {
            console.log('密钥加密错误', err)
        })

        for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = Math.min((i + 1) * chunkSize, file.size);
            const chunk = file.slice(start, end);
            // 读取文件数据块并发送到服务器
            const reader = new FileReader();
            pop.addInfo(`正在发送分块：${i + 1}...`)
            reader.onload = async (event) => {
                const fileDataArray = event.target.result;
                const fileDataBase64 = btoa(
                    new Uint8Array(fileDataArray)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                // console.log('base64编码结果：', fileDataBase64)

                await SM4encrypt(fileDataBase64, cbckey, pyodide_loader).then((res) => {
                    // const cipher_list = res.map(char_cipher => char_cipher)
                    const cipher_list = res
                    // console.log('加密成功：', cipher_list)
                    // 发送文件数据块和文件名到服务器
                    const fileInfo = {
                        name: file.name,
                        totalChunks,
                        currentChunk: i + 1,
                        key: Ccbckey,
                        data: cipher_list
                    };
                    console.log('fileInfo', fileInfo)
                    socket.send(JSON.stringify(fileInfo));
                }).catch((err) => {
                    console.log('文件加密错误：' + err)
                    return []
                })

            };
            reader.readAsArrayBuffer(chunk)
        }
        pop.addInfo(`文件已全部发送`)

    }, false);

}



//文件选择上传
export function fileInputUpload(port = 5003) {
    const fileInput = document.getElementById('fileInput');

    const socket = connectWebsocket(port)
    const pop = new popFuncs()

    // fileInput.addEventListener('change', (event) => {
    //     const file = event.target.files[0];

    //     if (file) {
    //         const reader = new FileReader();

    //         reader.onload = (loadEvent) => {
    //             const fileData = loadEvent.target.result;

    //             // 发送文件数据到服务器
    //             socket.send(fileData);

    //             console.log('文件已发送到服务器');
    //         };

    //         reader.readAsArrayBuffer(file);
    //     }
    // });

    fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        pop.displayPop()
        pop.resetPop()
        pop.showInfo('文件上传成功，开始发送...')

        // 读取文件数据并分块发送到服务器
        const chunkSize = 1024 * 8;
        const totalChunks = Math.ceil(file.size / chunkSize);
        pop.addInfo(`总分块数：${totalChunks}`)
        const cbckey = randomString(15, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        // console.log('cbckey', cbckey)
        let Ccbckey = ""
        await encryptkey(cbckey, pyodide_loader).then((res) => {
            Ccbckey = res.map((el) => el)
            // console.log('Ccbckey', Ccbckey)
        }).catch((err) => {
            console.log('密钥加密错误', err)
        })

        for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = Math.min((i + 1) * chunkSize, file.size);
            const chunk = file.slice(start, end);
            // 读取文件数据块并发送到服务器
            const reader = new FileReader();
            pop.addInfo(`正在发送分块：${i + 1}...`)
            reader.onload = async (event) => {
                const fileDataArray = event.target.result;
                const fileDataBase64 = btoa(
                    new Uint8Array(fileDataArray)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
                // console.log('base64编码结果：', fileDataBase64)

                await SM4encrypt(fileDataBase64, cbckey, pyodide_loader).then((res) => {
                    // const cipher_list = res.map(char_cipher => char_cipher)
                    const cipher_list = res
                    // console.log('加密成功：', cipher_list)
                    // 发送文件数据块和文件名到服务器
                    const fileInfo = {
                        name: file.name,
                        totalChunks,
                        currentChunk: i + 1,
                        key: Ccbckey,
                        data: cipher_list
                    };
                    console.log('fileInfo', fileInfo)
                    socket.send(JSON.stringify(fileInfo));
                }).catch((err) => {
                    console.log('文件加密错误：' + err)
                    return []
                })

            };
            reader.readAsArrayBuffer(chunk)
        }
        pop.addInfo(`文件已全部发送`)

        //获取到文件后把input框内的文件删除,这样选同一个文件上传时才会触发change事件
        fileInput.value = ''

    }, false);
}



