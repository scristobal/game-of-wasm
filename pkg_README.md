# Game of Life, Rust-WASM experiment 🦀 🕸

```typescript
const { Universe } = await import('glife-wasm');
const { memory } = await import('glife-wasm/glife_wasm_bg.wasm');

const universe = Universe.new(512, 512);

universe.tick();

const cellsPtr = universe.cells();
const cells = new Uint8Array(memory.buffer, cellsPtr, 512 * 512);
```

Tweaked and updated from the [Rust-wasm book 📖](https://rustwasm.github.io/docs/book/).
