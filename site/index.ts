const { Universe } = await import('hello-wasm');

const pre = document.getElementById('game-of-life-canvas')!;
const universe = Universe.new();

const renderLoop = () => {
    pre.textContent = universe.render();
    universe.tick();

    requestAnimationFrame(renderLoop);
};

requestAnimationFrame(renderLoop);

export {};
