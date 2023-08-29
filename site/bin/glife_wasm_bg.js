let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}
/**
*/
export const Cell = Object.freeze({ Dead:0,"0":"Dead",Alive:1,"1":"Alive", });
/**
*/
export class Universe {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Universe.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_universe_free(ptr);
    }
    /**
    * @param {number} row
    * @param {number} col
    */
    toggle_cell(row, col) {
        wasm.universe_toggle_cell(this.__wbg_ptr, row, col);
    }
    /**
    * @param {number} width
    * @param {number} height
    * @returns {Universe}
    */
    static new(width, height) {
        const ret = wasm.universe_new(width, height);
        return Universe.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    width() {
        const ret = wasm.universe_width(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * Set the width of the universe.
    *
    * Resets all cells to the dead state.
    * @param {number} width
    */
    set_width(width) {
        wasm.universe_set_width(this.__wbg_ptr, width);
    }
    /**
    * @returns {number}
    */
    height() {
        const ret = wasm.universe_height(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * Set the height of the universe.
    *
    * Resets all cells to the dead state.
    * @param {number} height
    */
    set_height(height) {
        wasm.universe_set_height(this.__wbg_ptr, height);
    }
    /**
    * @returns {number}
    */
    cells() {
        const ret = wasm.universe_cells(this.__wbg_ptr);
        return ret;
    }
    /**
    * @returns {string}
    */
    render() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.universe_render(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    */
    tick() {
        wasm.universe_tick(this.__wbg_ptr);
    }
}

export function __wbindgen_string_new(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

export function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

export function __wbg_getRandomValues_37fa2ca9e4e07fab() { return handleError(function (arg0, arg1) {
    getObject(arg0).getRandomValues(getObject(arg1));
}, arguments) };

export function __wbg_randomFillSync_dc1e9a60c158336d() { return handleError(function (arg0, arg1) {
    getObject(arg0).randomFillSync(takeObject(arg1));
}, arguments) };

export function __wbg_crypto_c48a774b022d20ac(arg0) {
    const ret = getObject(arg0).crypto;
    return addHeapObject(ret);
};

export function __wbindgen_is_object(arg0) {
    const val = getObject(arg0);
    const ret = typeof(val) === 'object' && val !== null;
    return ret;
};

export function __wbg_process_298734cf255a885d(arg0) {
    const ret = getObject(arg0).process;
    return addHeapObject(ret);
};

export function __wbg_versions_e2e78e134e3e5d01(arg0) {
    const ret = getObject(arg0).versions;
    return addHeapObject(ret);
};

export function __wbg_node_1cd7a5d853dbea79(arg0) {
    const ret = getObject(arg0).node;
    return addHeapObject(ret);
};

export function __wbindgen_is_string(arg0) {
    const ret = typeof(getObject(arg0)) === 'string';
    return ret;
};

export function __wbg_msCrypto_bcb970640f50a1e8(arg0) {
    const ret = getObject(arg0).msCrypto;
    return addHeapObject(ret);
};

export function __wbg_require_8f08ceecec0f4fee() { return handleError(function () {
    const ret = module.require;
    return addHeapObject(ret);
}, arguments) };

export function __wbindgen_is_function(arg0) {
    const ret = typeof(getObject(arg0)) === 'function';
    return ret;
};

export function __wbg_log_1d3ae0273d8f4f8a(arg0) {
    console.log(getObject(arg0));
};

export function __wbg_newnoargs_581967eacc0e2604(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

export function __wbg_call_cb65541d95d71282() { return handleError(function (arg0, arg1) {
    const ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
}, arguments) };

export function __wbindgen_object_clone_ref(arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
};

export function __wbg_self_1ff1d729e9aae938() { return handleError(function () {
    const ret = self.self;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_window_5f4faef6c12b79ec() { return handleError(function () {
    const ret = window.window;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_globalThis_1d39714405582d3c() { return handleError(function () {
    const ret = globalThis.globalThis;
    return addHeapObject(ret);
}, arguments) };

export function __wbg_global_651f05c6a0944d1c() { return handleError(function () {
    const ret = global.global;
    return addHeapObject(ret);
}, arguments) };

export function __wbindgen_is_undefined(arg0) {
    const ret = getObject(arg0) === undefined;
    return ret;
};

export function __wbg_call_01734de55d61e11d() { return handleError(function (arg0, arg1, arg2) {
    const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
}, arguments) };

export function __wbg_buffer_085ec1f694018c4f(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};

export function __wbg_newwithbyteoffsetandlength_6da8e527659b86aa(arg0, arg1, arg2) {
    const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_new_8125e318e6245eed(arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
};

export function __wbg_set_5cf90238115182c3(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};

export function __wbg_newwithlength_e5d69174d6984cd7(arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_subarray_13db269f57aa838d(arg0, arg1, arg2) {
    const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_new_abda76e883ba8a5f() {
    const ret = new Error();
    return addHeapObject(ret);
};

export function __wbg_stack_658279fe44541cf6(arg0, arg1) {
    const ret = getObject(arg1).stack;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

export function __wbg_error_f851667af71bcfc6(arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
        deferred0_0 = arg0;
        deferred0_1 = arg1;
        console.error(getStringFromWasm0(arg0, arg1));
    } finally {
        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

export function __wbindgen_memory() {
    const ret = wasm.memory;
    return addHeapObject(ret);
};

