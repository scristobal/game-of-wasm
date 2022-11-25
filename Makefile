bundler:
	rm -rf pkg
	wasm-pack build --target bundler --release
web:
	rm -rf pkg
	wasm-pack build --target web
