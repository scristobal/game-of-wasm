const js = await import('hello-wasm');

// js.greet('WebAssembly with npm');

const fib = function (n: number): number {
    let res = 1;
    let prev = 0;

    for (let i = 0; i < n; i++) {
        const next = prev + res;
        prev = res;
        res = next;
    }

    return res;
};

const N = 100_000_000;

// test WASM performance
{
    const start = performance.now();

    const a = js.fib(N);

    const end = performance.now();

    const timeTaken = end - start;

    console.log('time WASM', timeTaken);
}

// test JS performance
{
    const start = performance.now();

    const b = fib(N);

    const end = performance.now();

    const timeTaken = end - start;

    console.log('time JS', timeTaken);
}

export {};
