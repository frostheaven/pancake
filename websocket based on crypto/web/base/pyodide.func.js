import '../../node_modules/pyodide/pyodide.js'

export async function test_py(message) {
    let pyodide = await loadPyodide({
        indexURL: "/node_modules/pyodide",
    });
    // const message = pyodide.toPy({test_msg: 'This is a test'})
    pyodide.globals.set('test_msg', message)
    return pyodide.runPython(await (await fetch("./pyofile/test.py")).text());

}

export async function encryptkey(message, loader) {
    const pyodide = loader
    // const message = pyodide.toPy({test_msg: 'This is a test'})
    pyodide.globals.set('cbckey', message)
    // return 1
    return pyodide.runPython(await (await fetch("./pyofile/ecc_encrypt.py")).text());
}

export async function SM4encrypt(message,key,loader) {
    const pyodide = loader;
    const scriptContent = await (await fetch("./pyofile/SM4_encrypt.py")).text();
    const globals = pyodide.toPy({ plaintext: message, key: key })
    let res = await pyodide.runPython(scriptContent, { globals });

    // console.log('sm4res', res);
    return res;
}

export async function get_pyodide_loader() {
    const pyodide = await loadPyodide({
        indexURL: "/node_modules/pyodide",
    });
    return pyodide
}

