# Rust-WASM experiments 🦀 🕸

## 🗓 Diary

### Sun 21 Aug 2022

Follow MDN tutorial, [Rust-WASM](https://developer.mozilla.org/en-US/docs/WebAssembly/Rust_to_wasm).

- Created a library crate
- Compiled to WASM
- Tests on local server
- Create a NPM symlink package
- Import NPM symlink into a sample project
- Run the sample project

Instructions:

1. Compile to WASM (actually, NPM) with `wasm-pack build --target bundler`.
2. Go to `/site`.
3. Then link the folder `/pkg` to `hello-wasm` package with [NPM link](<https://docs.npmjs.com/cli/v8/commands/npm-link>).
4. Install with `npm i` and run webpack server with `npm run serve`.

Next:

- Configure TypeScript in the sample project, and check imports and definitions.
- Try something more ambitious.
- Show performance of native JS vs Rust-WASM on some CPU intensive workload.

---
References:

- [x] [MDN's Rust-WASM intro](https://developer.mozilla.org/en-US/docs/WebAssembly/Rust_to_wasm).
- [ ] A slightly more involved example with the [Rust-wasm book 📖](https://rustwasm.github.io/docs/book/introduction.html)
- [ ] Check out the [`js!` macro](https://docs.rs/stdweb/0.4.0/stdweb/macro.js.html)
- [ ] [wasm-bindgen](https://rustwasm.github.io/docs/wasm-bindgen/introduction.html)
