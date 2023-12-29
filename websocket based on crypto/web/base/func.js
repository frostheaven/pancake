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
            pop_info.innerText += '\n' + msg
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
    }
}

//弹窗功能挂载（至按钮）
export function initPopBtn() {
    const pop = new popFuncs()
    document.getElementById("pop-close-btn").onclick = () => {
        pop.closePop()
        pop.resetPop()
    };
    document.getElementById("pop-check-btn").onclick = () => {
        pop.closePop()
        pop.resetPop()
    };
}




