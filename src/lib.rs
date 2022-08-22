use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub fn fib(num: i32) -> i32 {
    let mut res = 1;
    let mut prev = 0;

    for _ in 1..num {
        let next = prev + res;
        prev = res;
        res = next;
    }

    return res;
}
