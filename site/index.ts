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

ctx.font = '28px VT323';

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
    const beforeTime = performance.now();

    performance.mark('render-loop-in');

    universe.tick();

    performance.mark('after-tick');

    drawCells(ctx);

    performance.mark('after-render');

    tickTimer.updateRenderTimes(beforeTime, performance.now());
    tickTimer.render();

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

class TickTimer {
    times: number[] = Array(100);
    ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx!;
    }

    updateRenderTimes(initialTime: number, endTime: number) {
        const delta = endTime - initialTime;
        this.times.shift();
        this.times.push(delta);
    }

    getAverageRenderTimes() {
        let sum = 0;
        for (let i = 0; i < this.times.length; i++) {
            sum += this.times[i]!;
        }
        let mean = sum / this.times.length;

        return Math.round(mean).toString();
    }

    render() {
        this.ctx.fillText(`${this.getAverageRenderTimes()}ms`, 10, 30);
    }
}

const tickTimer = new TickTimer(ctx);

drawCells(ctx);
renderLoop();

export {};
