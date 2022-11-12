
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
