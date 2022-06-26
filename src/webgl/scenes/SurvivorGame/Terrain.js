import {Group} from "three";
import Grid from "./Grid";

export default class Terrain extends Group {
	constructor() {
		super()

		this.grid = new Grid(10)
		this.add(this.grid)
	}
}