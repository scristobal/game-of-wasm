import * as wasm from "./glife_wasm_bg.wasm";
import { __wbg_set_wasm } from "./glife_wasm_bg.js";
__wbg_set_wasm(wasm);
export * from "./glife_wasm_bg.js";
