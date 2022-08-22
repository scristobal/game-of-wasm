const main = async function () {
    const js = await import('hello-wasm');
    js.greet('WebAssembly with npm');
};

main();
