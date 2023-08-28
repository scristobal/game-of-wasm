import { Cell, Universe } from './bin/glife_wasm';
import { memory } from './bin/glife_wasm_bg.wasm';

class TickTimer {
    times: number[] = Array(10);

    set time(delta: number) {
        this.times.shift();
        this.times.push(delta);
    }

    get time() {
        let sum = 0;
        for (let i = 0; i < this.times.length; i++) {
            sum += this.times[i]!;
        }
        let mean = sum / this.times.length;

        return Math.round(mean);
    }
}

class GameOfLife extends HTMLElement {
    private universe;
    private memory;
    private canvas;
    private height;
    private width;
    private ctx;
    private tickTimer;

    constructor(height: number, width: number) {
        super();

        this.width = width;
        this.height = height;

        this.universe = Universe.new(this.width, this.height);
        this.memory = memory;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d')!;

        this.tickTimer = new TickTimer();

        this.canvas.height = height;
        this.canvas.width = width;

        this.canvas.addEventListener('mousemove', this.mouseMoveHandler.bind(this));

        this.ctx.imageSmoothingEnabled = false;

        const style = new CSSStyleSheet();
        style.insertRule(`canvas {
                image-rendering: pixelated;
                image-rendering: crisp-edges;
                height: 100%;
                width: 100%;
            }`);

        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.appendChild(this.canvas);
        shadowRoot.adoptedStyleSheets = [style];
    }

    connectedCallback() {
        setInterval(
            () =>
                console.log(
                    `Average universe tick time: ${this.tickTimer.time}ms or ${
                        1000 / this.tickTimer.time
                    }fps`
                ),
            1000
        );
        this.renderLoop();
    }

    static get observedAttributes() {
        return ['width', 'height'];
    }

    attributeChangedCallback(property: 'width' | 'height', _oldValue: number, newValue: number) {
        if (property === 'height') this.rescale(newValue, this.width);
        if (property === 'width') this.rescale(this.height, newValue);
    }

    private mouseMoveHandler(event: MouseEvent) {
        const canvas = this.shadowRoot!.querySelector('canvas')!;
        const boundingRect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / boundingRect.width;
        const scaleY = canvas.height / boundingRect.height;

        const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
        const canvasTop = (event.clientY - boundingRect.top) * scaleY;

        const row = Math.min(Math.floor(canvasTop /* / CELL_SIZE */), this.height);
        const col = Math.min(Math.floor(canvasLeft /* / CELL_SIZE */), this.width);

        const cellsPtr = this.universe.cells();
        const cells = new Uint8Array(this.memory.buffer, cellsPtr, this.width * this.height);

        const index = row * this.width + col;

        const isDead = cells[index] === Cell.Dead;

        cells[index] = isDead ? Cell.Alive : Cell.Dead;
    }

    private rescale(height: number, width: number) {
        this.height = height;
        this.width = width;

        const canvas = this.shadowRoot!.querySelector('canvas')!;

        canvas.height = this.height;
        canvas.width = this.width;

        this.universe = Universe.new(this.width, this.height);
    }

    private drawCells() {
        const cellsPtr = this.universe.cells();
        const cells = new Uint8Array(this.memory.buffer, cellsPtr, this.width * this.height);

        const img = this.ctx.createImageData(this.width, this.height);

        const data = img.data;

        for (let idx = 0; idx < cells.length; idx++) {
            data[4 * idx] = cells[idx] === Cell.Alive ? 0 : 255;
            data[4 * idx + 1] = cells[idx] === Cell.Alive ? 0 : 255;
            data[4 * idx + 2] = cells[idx] === Cell.Alive ? 0 : 255;
            data[4 * idx + 3] = 255;
        }

        this.ctx.putImageData(img, 0, 0);
    }

    private renderLoop() {
        const beforeTime = performance.now();

        this.universe.tick();

        this.drawCells();

        this.tickTimer.time = performance.now() - beforeTime;

        requestAnimationFrame(this.renderLoop.bind(this));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'game-of-life': GameOfLife;
    }
}

customElements.define('game-of-life', GameOfLife);
