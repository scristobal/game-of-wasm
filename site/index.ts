const { Universe, Cell } = await import('glife-wasm');
const { memory } = await import('glife-wasm/glife_wasm_bg.wasm');

const CELL_SIZE = 1; // px
const DEAD_COLOR = '#FFFFFF';
const ALIVE_COLOR = '#000000';

const universe = Universe.new(512, 512);
const width = universe.width();
const height = universe.height();

const canvas = document.getElementById('game-of-life-canvas') as HTMLCanvasElement;

const ctx = canvas.getContext('2d')!;

const ctx3d = canvas.getContext('webgl')!;

canvas.addEventListener('mousemove', (event) => {
    const boundingRect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / boundingRect.width;
    const scaleY = canvas.height / boundingRect.height;

    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;

    const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
    const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

    const cellsPtr = universe.cells();
    const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

    cells[getIndex(row, col)] = cells[getIndex(row, col)] === Cell.Dead ? Cell.Alive : Cell.Dead;

    drawCells(ctx);
});

canvas.height = CELL_SIZE * height;
canvas.width = CELL_SIZE * width;

const renderLoop = () => {
    updateFps();
    universe.tick();

    // drawGrid(ctx);
    drawCells(ctx);
    requestAnimationFrame(renderLoop);
};

const getIndex = (row: number, column: number) => {
    return row * width + column;
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

    createImageBitmap(img, {
        resizeHeight: CELL_SIZE * height,
        resizeWidth: CELL_SIZE * height,
        resizeQuality: 'pixelated',
    }).then((img) => ctx.drawImage(img, 0, 0));
};

const fps = document.getElementById('fps')!;
const frames: number[] = [];
let lastFrameTimeStamp = performance.now();

const updateFps = function () {
    // Convert the delta time since the last frame render into a measure
    // of frames per second.
    const now = performance.now();
    const delta = now - lastFrameTimeStamp;
    lastFrameTimeStamp = now;
    const currentFps = (1 / delta) * 1000;

    // Save only the latest 100 timings.
    frames.push(currentFps);
    if (frames.length > 100) {
        frames.shift();
    }

    // Find the max, min, and mean of our 100 latest timings.
    let min = Infinity;
    let max = -Infinity;
    let sum = 0;
    for (let i = 0; i < frames.length; i++) {
        sum += frames[i]!;
        min = Math.min(frames[i]!, min);
        max = Math.max(frames[i]!, max);
    }
    let mean = sum / frames.length;

    // Render the statistics.
    fps.textContent = `
Frames per Second:
         latest = ${Math.round(currentFps)}
avg of last 100 = ${Math.round(mean)}
min of last 100 = ${Math.round(min)}
max of last 100 = ${Math.round(max)}
`.trim();
};

drawCells(ctx);
renderLoop();

export {};
