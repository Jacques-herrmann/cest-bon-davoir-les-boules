import "./style.css"
import Engine from "./webgl/engine";

const engine = new Engine(document.getElementById("webgl"));

window.engine = engine;
