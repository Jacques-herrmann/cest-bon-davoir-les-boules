import "./style.css"
import Engine from "./webgl/Engine";

const canvas = document.getElementById("webgl")
const engine = new Engine(canvas);

window.engine = engine;
