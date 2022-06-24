import {Group} from "three";
import Grid from "./Grid";

export default class Terrain extends Group {
	constructor() {
		super()

		this.grid = new Grid(6)
		this.add(this.grid)
	}
}