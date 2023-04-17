
# To do list

- [x] [MDN's Rust-WASM intro](https://developer.mozilla.org/en-US/docs/WebAssembly/Rust_to_wasm).
- [x] A slightly more involved example with the [Rust-wasm book 📖](https://rustwasm.github.io/docs/book/)
- [ ] Move to Trunk
- [ ] Remaining exercises [time-optimization](<https://rustwasm.github.io/docs/book/game-of-life/time-profiling.html#exercises>) and [size-optimization](https://rustwasm.github.io/docs/book/game-of-life/code-size.html#exercises)
- [ ] Check out `js_ffi` or [`js-wasm`](<https://github.com/richardanaya/js-wasm>) as the former seems deprecated
- [ ] Check out the [`js!` macro](https://docs.rs/stdweb/0.4.0/stdweb/macro.js.html)
- [x] Wrap it into a Web Component
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

# 🗓 change log

## Sun 21 Aug 2022

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

## Mon 22 Aug 2022

Done today:

- Updated to webpack 5
- Transpiled using SWC 🦀
- Added TypeScript
- Used top level await and wasm async experimental features
- A very rude performance test

Next:

- Try something more ambitious, follow up tutorial from rust-wasm book

## Sat 1 Oct 2022

Done today:

- Adapted example from [rust-wasm book](https://rustwasm.github.io/docs/book/game-of-life/introduction.html) to use TypeScript and SWC on Webpack.
- Followed until <https://rustwasm.github.io/docs/book/game-of-life/implementing.html#rendering-to-canvas-directly-from-memory>

Next:

- Continue book example

## Sun 2 Oct 2022

- Published to NPM <https://www.npmjs.com/package/glife-wasm>
- Deployed to Vercel <https://samuelsh-glife-wasm.vercel.app/>
- Improved NPM scripts for development and build
- Bug hunting re. `wasm-pack build`  <https://github.com/rustwasm/wasm-pack/issues/990>
- Exercises section 4.4 rust-wasm book

## Sun 9 Oct 2022

- Added interactivity
- Styled with PicoCSS

Next:

- Try to write directly into memory.

## Tue 11 Oct 2022

- Cells are modified directly in memory on mouse over.
- Removed pause interaction
- Headless tests w/ `wasm_bindgen_test`

Next:

- Continue rust-wasm book

## Wed 12 Oct 2022

- Bump rand dep, fixed feature errors
- Fixed `extern crate` error on `tests/`
- Profiling and optimizations

## Sun 5 Nov 2022

- Improved canvas drawing performance drastically, using bitmap image
- Fixed user interactions
- New timer class
- Tiding up README and docs

## Sat 11 Nov 2022

- Encapsulated in a Web Component
- Responsive to width and height attributes
- Styles, favicon, and font
- Cleanup dependencies and webpack settings

## Sun 16 Apr 2023

- Removed wasm-pack and replaced with manual build steps using wasm-bindgen
- Separate `site` from Rust module
- Added custom elements manifest and VScode custom data format
- House keepin: updates, package.json, READMEs, etc.
