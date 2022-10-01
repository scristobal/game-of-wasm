# Rust-WASM experiments 🦀 🕸

## 🥪 Instructions

1. Compile to WASM and create a NPM package with `wasm-pack build --target bundler`.
2. Go to `/site`.
3. Link the folder `/pkg` to `hello-wasm` package with [npm-link](<https://docs.npmjs.com/cli/v8/commands/npm-link>).
    1. go to `pkg/` and execute `npm link`
    2. go to site and run `npm link hello-wasm`
4. Install with `npm i` and run webpack server with `npm run dev`.

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
