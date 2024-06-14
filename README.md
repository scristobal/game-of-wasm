# Rust-WASM experiments 🦀 🕸

This repo is a playground for experimentation with the interplay between Rust, Web Assembly and Web Components.

There is an implementation og Conway's Game of Life written in Rust and compiled to WASM, wrapped in a web component. The code is adapted from the Rust-WASM book, with a few tweaks/updates.

## 🪁 Try it

The repo is deployed here: <https://game-of-wasm.messy.page/>.

## 🏗️ Build it

Clone the repo and make sure you have Rust and wasm-bindgen installed.

The repo has two main components:

- A Rust implementation of Conways' Game of Life `/`
- A sample page and web component wrapper under `site/`

You need to build the Rust project first and then bring it into the sample site. To do so, simply run `just build`
