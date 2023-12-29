import { popFuncs } from "./func.js"
import { des_encrypt, des_key } from "./des.func.js"

// 文件传输相关脚本

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

export function fileDropUpload(port = 5002) {
    const dropArea = document.getElementById('dropArea');
    const pop = new popFuncs()
    const stopPropagation = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };

    // const socket = connectWebsocket(port)

    dropArea.addEventListener('dragenter', stopPropagation, false);
    dropArea.addEventListener('dragover', stopPropagation, false);
    // 修改前端发送文件的代码
    dropArea.addEventListener('drop', (dragEvent) => {
        stopPropagation(dragEvent);
        const file = dragEvent.dataTransfer.files[0];
        pop.displayPop()
        pop.resetPop()

        // 读取文件数据并加密
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        pop.addInfo(`开始加密...`)
        reader.onload = async (event) => {
            const fileDataArray = event.target.result
            const fileDataStream = new Uint8Array(fileDataArray)
            console.log('文件二进制流', fileDataStream)
            const fileDataBase64 = btoa(fileDataStream.reduce((data, byte) => data + String.fromCharCode(byte), ''))
            console.log('文件base64长度', fileDataBase64.length)
            const fileDataEncrypt = await des_encrypt(fileDataBase64, des_key)
            // 文件信息
            const fileInfo = {
                name: file.name,
                data: fileDataEncrypt
            };
            console.log('fileInfo', fileInfo)
            pop.addInfo(`文件名：${fileInfo['name']}`)
            console.log('文件加密后长度', fileInfo['data'].length)
            pop.addInfo(`文件加密后内容： ${fileInfo['data']}`)
            localStorage.setItem('fileInfo', JSON.stringify(fileInfo))
            pop.addInfo(`加密完成`)
        };

    }, false);

}

//文件选择上传
export function fileInputUpload(port = 5003) {
    const fileInput = document.getElementById('fileInput');

    // const socket = connectWebsocket(port)
    const pop = new popFuncs()

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        pop.displayPop()
        pop.resetPop()

        // 读取文件数据并加密
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        pop.addInfo(`开始加密...`)
        reader.onload = async (event) => {
            const fileDataArray = event.target.result
            const fileDataStream = new Uint8Array(fileDataArray)
            console.log('文件二进制流', fileDataStream)
            const fileDataBase64 = btoa(fileDataStream.reduce((data, byte) => data + String.fromCharCode(byte), ''))
            console.log('文件base64长度', fileDataBase64.length)
            const fileDataEncrypt = await des_encrypt(fileDataBase64, des_key)
            // 文件信息
            const fileInfo = {
                name: file.name,
                data: fileDataEncrypt
            };
            console.log('fileInfo', fileInfo)
            pop.addInfo(`文件名：${fileInfo['name']}`)
            console.log('文件加密后长度', fileInfo['data'].length)
            pop.addInfo(`文件加密后内容： ${fileInfo['data']}`)
            localStorage.setItem('fileInfo', JSON.stringify(fileInfo))
            pop.addInfo(`加密完成`)
        };

        //获取到文件后把input框内的文件删除,这样选同一个文件上传时才会触发change事件
        fileInput.value = ''


    }, false);
}

