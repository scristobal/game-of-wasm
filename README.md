# Rust-WASM experiments 🦀 🕸

This repo is a playground for experimentation with the interplay between Rust, Web Assembly and Web Components.

So far there is an implementation og Conway's Game of Life written in Web Assembly and compiled to Rust, wrapped in a web component and a small usage example.

The code is adapted from the Rust-WASM book (link below), with a few tweaks and updates.

Check the result here <https://samuelsh-glife-wasm.vercel.app/> or use it as

```html
<!DOCTYPE html>
<html>
    <head>
        <script defer src="./index.js"></script>
    </head>

    <body>
        <game-of-life width="512" height="512" />
    </body>

</html>
```

## 🏗️ Structure

The repo has two main components:

- A Rust project a the `root/`
- The web component and a sample webpage in `site/`

You need to build the Rust project first and then bring it into the sample website, either locally or using NPM.

### 🍳 Run locally

1. Compile to WASM and create a NPM package with `wasm-pack build --target bundler` or use `Makefile`, eg `make wasm`. Output will be in the `pkg/` folder
2. Go to `/site` install deps with `npm i` and run a dev server with `npm run dev`. Under the hood, this will create a `npm link` to `../pkg`

### 📦 Publish to NPM

1. Update version number on `Cargo.toml`
2. Compile to WASM and create a NPM package with `wasm-pack build --target bundler` or use `Makefile`, eg `make wasm`. Output will be in the `pkg/` folder
3. Go to`site/` and execute `npm run build`. This will remove any existing `npm link`, install modules and build the app.
4. Add `glife_wasm_bg.wasm.d.ts` to the `files` array in `pkg/package.json`. Related to <https://github.com/rustwasm/wasm-pack/issues/990> but not exactly, files are included but not definitions.

### 🕸️ Upload to the Web

Nothing to do, Vercel deploys `main` branch automatically.
