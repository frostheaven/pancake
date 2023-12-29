import '../../node_modules/pyodide/pyodide.js'

export async function test_py(message) {
    let pyodide = await loadPyodide({
        indexURL: "/node_modules/pyodide",
    });
    // const message = pyodide.toPy({test_msg: 'This is a test'})
    pyodide.globals.set('test_msg', message)
    return pyodide.runPython(await (await fetch("./pyofile/test.py")).text());

}

// test_py().then((result) => {
//     console.log("Python file run result: ", result);
// });
