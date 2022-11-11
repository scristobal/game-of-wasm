import { Cell as C, Universe as U } from 'glife-wasm';
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

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

@customElement('game-of-life')
class GameOfLife extends LitElement {
    universe: U;
    width: number;
    height: number;

    memory: WebAssembly.Memory;

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    tickTimer: TickTimer;

    constructor(Universe: typeof U, Cell: typeof C, memory: WebAssembly.Memory) {
        super();

        this.canvas = document.createElement('canvas');

        this.ctx = this.canvas.getContext('2d')!;
        this.ctx.font = '28px VT323';

        this.tickTimer = new TickTimer(this.ctx);

        this.universe = Universe.new(512, 512);
        this.width = this.universe.width();
        this.height = this.universe.height();

        this.memory = memory;

        this.canvas.height = this.height;
        this.canvas.width = this.width;

        this.canvas.addEventListener('mousemove', (event) => {
            const boundingRect = this.canvas.getBoundingClientRect();

            const scaleX = this.canvas.width / boundingRect.width;
            const scaleY = this.canvas.height / boundingRect.height;

            const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
            const canvasTop = (event.clientY - boundingRect.top) * scaleY;

            const row = Math.min(Math.floor(canvasTop /* / CELL_SIZE */), this.height);
            const col = Math.min(Math.floor(canvasLeft /* / CELL_SIZE */), this.width);

            const cellsPtr = this.universe.cells();
            const cells = new Uint8Array(this.memory.buffer, cellsPtr, this.width * this.height);

            const index = row * this.width + col;

            const isAlive = cells[index] === Cell.Dead;

            cells[index] = isAlive ? Cell.Alive : Cell.Dead;

            this.drawCells();
        });

        this.drawCells();
        this.renderLoop();
    }

    drawCells() {
        const cellsPtr = this.universe.cells();
        const cells = new Uint8Array(this.memory.buffer, cellsPtr, this.width * this.height);

        const img = this.ctx.createImageData(this.width, this.height);

        const data = img.data;

        for (let idx = 0; idx < cells.length; idx++) {
            data[4 * idx] = cells[idx] === C.Alive ? 0 : 255;
            data[4 * idx + 1] = cells[idx] === C.Alive ? 0 : 255;
            data[4 * idx + 2] = cells[idx] === C.Alive ? 0 : 255;
            data[4 * idx + 3] = 255;
        }

        this.ctx.putImageData(img, 0, 0);
    }

    renderLoop() {
        const beforeTime = performance.now();

        this.universe.tick();

        this.drawCells();

        this.tickTimer.updateRenderTimes(beforeTime, performance.now());
        this.tickTimer.render();

        requestAnimationFrame(this.renderLoop.bind(this));
    }

    render() {
        return this.canvas;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'game-of-life': GameOfLife;
    }
}

export { GameOfLife };
