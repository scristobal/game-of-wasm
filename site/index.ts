const { Universe, Cell } = await import('glife-wasm');
const { memory } = await import('glife-wasm/glife_wasm_bg.wasm');

const CELL_SIZE = 5; // px
const DEAD_COLOR = '#FFFFFF';
const ALIVE_COLOR = '#000000';

const universe = Universe.new();
const width = universe.width();
const height = universe.height();

const canvas = document.getElementById('game-of-life-canvas') as HTMLCanvasElement;

const ctx = canvas.getContext('2d')!;

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

canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const renderLoop = () => {
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

    ctx.beginPath();

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const idx = getIndex(row, col);

            ctx.fillStyle = cells[idx] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR;

            ctx.fillRect(col * (CELL_SIZE + 1) + 1, row * (CELL_SIZE + 1) + 1, CELL_SIZE, CELL_SIZE);
        }
    }

    ctx.stroke();
};

drawCells(ctx);
renderLoop();

export {};
