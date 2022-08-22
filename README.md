# Rust-WASM experiments 🦀 🕸

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

Instructions:

1. Compile to WASM (actually, NPM) with `wasm-pack build --target bundler`.
2. Go to `/site`.
3. Then link the folder `/pkg` to `hello-wasm` package with [npm-link](<https://docs.npmjs.com/cli/v8/commands/npm-link>).
4. Install with `npm i` and run webpack server with `npm run serve`.

Next:

- Configure TypeScript in the sample project, and check imports and definitions.
- Try something more ambitious, eg. a small frontend showing performance of native JS vs Rust-WASM on some CPU intensive workload.

## To do list

- [x] [MDN's Rust-WASM intro](https://developer.mozilla.org/en-US/docs/WebAssembly/Rust_to_wasm).
- [ ] A slightly more involved example with the [Rust-wasm book 📖](https://rustwasm.github.io/docs/book/introduction.html)
- [ ] Check out the [`js!` macro](https://docs.rs/stdweb/0.4.0/stdweb/macro.js.html)
- [ ] [wasm-bindgen](https://rustwasm.github.io/docs/wasm-bindgen/introduction.html)

## Further and off-topic

### 👾 Graphics

- <https://nercury.github.io/rust/opengl/tutorial/2018/02/08/opengl-in-rust-from-scratch-00-setup.html>
- <https://crates.io/crates/wgpu>

### 💻 Programming

- <https://github.com/bytecodealliance/wasmtime/blob/main/docs/WASI-tutorial.md#from-rust>
- <https://deno.com/blog/roll-your-own-javascript-runtime>
