const { Universe, Cell } = await import('glife-wasm');
const { memory } = await import('glife-wasm/glife_wasm_bg.wasm');

const CELL_SIZE = 1; // px
const DEAD_COLOR = '#FFFFFF';
const ALIVE_COLOR = '#000000';

const universe = Universe.new(512, 512);
const width = universe.width();
const height = universe.height();

const canvas = document.getElementById('game-of-life-canvas') as HTMLCanvasElement;

canvas.height = height;
canvas.width = width;

const ctx = canvas.getContext('2d')!;

canvas.addEventListener('mousemove', (event) => {
    const boundingRect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / boundingRect.width;
    const scaleY = canvas.height / boundingRect.height;

    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;

    const row = Math.min(Math.floor(canvasTop / CELL_SIZE), height);
    const col = Math.min(Math.floor(canvasLeft / CELL_SIZE), width);

    const cellsPtr = universe.cells();
    const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

    const index = row * width + col;

    const isAlive = cells[index] === Cell.Dead;

    cells[index] = isAlive ? Cell.Alive : Cell.Dead;

    drawCells(ctx);
});

const renderLoop = () => {
    const currentTime = performance.now();

    universe.tick();
    drawCells(ctx);

    renderTime(currentTime);

    requestAnimationFrame(renderLoop);
};

const drawCells = (ctx: CanvasRenderingContext2D) => {
    const cellsPtr = universe.cells();
    const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

    const img = ctx.createImageData(width, height);

    const data = img.data;

    for (let idx = 0; idx < cells.length; idx++) {
        data[4 * idx] = cells[idx] === Cell.Alive ? 0 : 255;
        data[4 * idx + 1] = cells[idx] === Cell.Alive ? 0 : 255;
        data[4 * idx + 2] = cells[idx] === Cell.Alive ? 0 : 255;
        data[4 * idx + 3] = 255;
    }

    ctx.putImageData(img, 0, 0);

    //createImageBitmap(img).then((img) => ctx.drawImage(img, 0, 0));
};

const fps = document.getElementById('fps')!;
const times: number[] = [];

const renderTime = function (initialTime: number) {
    const now = performance.now();
    const delta = now - initialTime;

    times.push(delta);
    if (times.length > 100) {
        times.shift();
    }

    let sum = 0;
    for (let i = 0; i < times.length; i++) {
        sum += times[i]!;
    }
    let mean = sum / times.length;

    fps.textContent = `Render time ${Math.round(mean)} ms`;
};

drawCells(ctx);
renderLoop();

export {};
