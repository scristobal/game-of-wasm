# Rust-WASM experiments 🦀 🕸

## 🥪 Instructions

1. Compile to WASM and create a NPM package with `wasm-pack build --target bundler` or use `Makefile`, eg `make wasm`. Output will be in the `pkg/` folder
2. Go to `/site` install deps with `npm i` and run a dev server with `npm run dev`. This will create a `npm link` under the hood to `../pkg`
3. To build the web app, run `npm run build`. This will remove the `npm link`, install modules and build the app.

Note: At the time of the writing, if you plan to release the wasm module, you need to add `glife_wasm_bg.wasm.d.ts` to the `files` array in `pkg/package.json`. Related to <https://github.com/rustwasm/wasm-pack/issues/990> but not exactly, files are included but not definitions.

## 🗓 change log

### Sun 21 Aug 2022

Follow MDN tutorial, [Rust-WASM](https://developer.mozilla.org/en-US/docs/WebAssembly/Rust_to_wasm).

- Created a library crate
- Use `wasm_bindgen` to generate bindings:
  - Call JS's `alert` from Rust
  - Call a Rust function `greet` from JS
- Compiled to WASM
- Tests on local server
- Create a NPM symlink package
- Import NPM symlink into a sample project
- Run the sample project

This was similar to <https://rustwasm.github.io/docs/wasm-bindgen/examples/hello-world.html> although that seems to be a bit out of date, check the comment on webpack imports

Next:

- Configure TypeScript in the sample project, and check imports and definitions.

### Mon 22 Aug 2022

Done today:

- Updated to webpack 5
- Transpiled using SWC 🦀
- Added TypeScript
- Used top level await and wasm async experimental features
- A very rude performance test

Next:

- Try something more ambitious, follow up tutorial from rust-wasm book

### Sat 1 Oct 2022

Done today:

- Adapted example from [rust-wasm book](https://rustwasm.github.io/docs/book/game-of-life/introduction.html) to use TypeScript and SWC on Webpack.
- Followed until <https://rustwasm.github.io/docs/book/game-of-life/implementing.html#rendering-to-canvas-directly-from-memory>

Next:

- Continue book example

### Sun 2 Oct 2022

- Published to NPM <https://www.npmjs.com/package/glife-wasm>
- Deployed to Vercel <https://samuelsh-glife-wasm.vercel.app/>
- Improved NPM scripts for development and build
- Bug hunting re. `wasm-pack build`  <https://github.com/rustwasm/wasm-pack/issues/990>
- Exercises section 4.4 rust-wasm book

### Sun 9 Oct 2022

- Added interactivity
- Styled with PicoCSS

Next:

- Try to write directly into memory.

### Tue 11 Oct 2022

- Cells are modified directly in memory on mouse over.

Next:

- Continue rust-wasm book

## To do list

- [x] [MDN's Rust-WASM intro](https://developer.mozilla.org/en-US/docs/WebAssembly/Rust_to_wasm).
- [ ] A slightly more involved example with the [Rust-wasm book 📖](https://rustwasm.github.io/docs/book/)
- [ ] Check out the [`js!` macro](https://docs.rs/stdweb/0.4.0/stdweb/macro.js.html)
- [ ] [wasm-bindgen](https://rustwasm.github.io/docs/wasm-bindgen/)
- [ ] [wasm-pack](https://rustwasm.github.io/docs/wasm-pack/)
- [ ] In general the [rust-wasm docs](https://rustwasm.github.io/docs.html) and blog!
- [ ] Run JS in WASI [post on wasm.builders](https://www.wasm.builders/gunjan_0307/compiling-javascript-to-wasm-34lk)
- [ ] Try out [WALT](https://github.com/ballercat/walt)

## Further and off-topic

### 👾 Graphics

- <https://nercury.github.io/rust/opengl/tutorial/2018/02/08/opengl-in-rust-from-scratch-00-setup.html>
- <https://crates.io/crates/wgpu>

### 💻 Programming

- <https://github.com/bytecodealliance/wasmtime/blob/main/docs/WASI-tutorial.md#from-rust>
- <https://deno.com/blog/roll-your-own-javascript-runtime>
