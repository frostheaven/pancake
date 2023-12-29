## 前端DES加密（文本、文件）demo
### 语言
1.前端页面 `html+css+js`
<br /><br />
2.前端加密/解密 使用WebAssembly `pyodide`库实现浏览器运行python脚本
>前端python引用结构：<br />
/web/base/pyodide.func.js 中引入、配置pyodide<br />
同时写入相关函数，示例如下：<br />
~~~js
export async function test_py(message) {
    let pyodide = await loadPyodide({
        indexURL: "/node_modules/pyodide",
    });
    pyodide.globals.set('test_msg', message)
    return pyodide.runPython(await (await fetch("./pyofile/test.py")).text());
}
~~~
>本函数在`test_py()`闭包中创建python全局变量`test_msg`，并将函数形参`message`赋值给它；在test.py这个python文件中，直接`print(test_msg)`【忽略编译器报错】。在浏览器控制台中可以看到打印出的`message`。<br />
>pyodide库实际是将python翻译成js脚本后执行。<br />
>通过**export**方法将test_py()导出，以导入其他js模块使用（主要是导入**trans.js**中实现传输的文件数据加密/解密）。

<br /><br />
3.服务器 python语言

### 数据传输方式
WebSocket

>由于websocket对于单次传输的长度限制，需要将文件切割来进行分块传输。我们将发送的信息包装成object对象，包含文件名，总分块数，当前的分块号以及分块数据。值得注意的是，由于在`reader.onload(event)`取得的文件数据默认为ArrayBuffer对象，若不进行转换直接用JSON打包似乎会使格式出现问题，因此，先将其转换成`Uint8Array`对象，再用`Array.from()`方法转化为包含字节数据的列表；经过测试，发送与接收均正确。
~~~js
const fileDataArray = new Uint8Array(event.target.result)
const fileInfo = {
        name: file.name,
        totalChunks,
        currentChunk: i + 1,
        data: Array.from(fileDataArray)
    }
    socket.send(JSON.stringify(fileInfo))
~~~

```
websocket based on crypto DES
├─ package-lock.json
├─ package.json
├─ README.md
├─ server
│  └─ server.py
├─ storage
└─ web
   ├─ base
   │  ├─ des.func.js
   │  ├─ des.js
   │  ├─ func.js
   │  ├─ pyodide.func.js
   │  └─ trans.js
   ├─ index.html
   ├─ main.js
   ├─ pyofile
   │  └─ test.py
   └─ style.css

```