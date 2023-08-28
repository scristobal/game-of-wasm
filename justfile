build:
    cargo build --target=wasm32-unknown-unknown --release
    wasm-bindgen ./target/wasm32-unknown-unknown/release/glife_wasm.wasm --out-dir ./site/bin
