"use strict";const WASM_URL="web-interpreter-opt.wasm";class WebInterpreter extends HTMLElement{#wasm;insertText(e){const s=new TextEncoder,t=s.encode(e),n=this.#wasm.exports.getBuffer(),o=this.#wasm.exports.memory.buffer,i=new Int8Array(o),a=i.subarray(n,n+t.length);for(let e=0;e<t.length;e++)a[e]=t[e];return[n,t.length]}logText(e,t){const n=this.#wasm.exports.memory,s=n.buffer.slice(e,e+t),o=new TextDecoder("UTF-8"),i=o.decode(new Int8Array(s));return i}#newRunner(){const e=new Go;return e.importObject["main.go.printError"]=(e,t)=>{console.error(this.logText(e,t))},e.importObject["main.go.printOut"]=(e,t)=>{console.log(this.logText(e,t))},e.importObject.env={printError:e.importObject["main.go.printError"],printOut:e.importObject["main.go.printOut"]},e}connectedCallback(){this.querySelector("textarea.input").value=`><//> Calculate 5!

><number>    ≈ ><{({°> ~  ><//> b101 = 5
><factorial> ≈ ><(({°> ~  ><//> b001 = 1

><//> while number > 1
><(((@> [><number> o~ ><(({°>]
><>
	><//> factorial = factorial * number
	><factorial> ≈ ><factorial> ♡ ><number> ~

	><//> number -= 1
	<number><< ~
<><
(+o ><factorial> ~ ><//> Should be 120
`;const e=this.#newRunner();"instantiateStreaming"in WebAssembly?WebAssembly.instantiateStreaming(fetch(WASM_URL),e.importObject).then(t=>{this.#wasm=t.instance,e.run(this.#wasm)}):fetch(WASM_URL).then(e=>e.arrayBuffer()).then(t=>WebAssembly.instantiate(t,e.importObject).then(t=>{this.#wasm=t.instance,e.run(this.#wasm)})),this.querySelector("button.play")?.addEventListener("click",()=>{if(!this.#wasm)return;const e=this.querySelector("textarea.input").value,[t,n]=this.insertText(e);this.#wasm.exports.goFysh(t,n)})}}customElements.define("web-interpreter",WebInterpreter)