import {Group, MeshBasicMaterial, Spherical, Vector3} from "three";
import {toRad} from "../../utils/math";
import gsap from 'gsap'
import Cursor from "../../utils/Cursor";

const disableMaterial = new MeshBasicMaterial({color: 'grey', opacity: 0.7})

export default class Carousel extends Group {
	constructor(radius, delta) {
		super()

		this.radius = radius
		this.delta = delta
		this.index = 0
		this.center = new Vector3()

		this.objects = []
		this.cursor = new Cursor()
		this.cursor.on('click', this.onClick.bind(this))
		this.updateItemsMaterial()
	}

	addItem(object) {
		this.positionObject(object)
		this.objects.push(object)
		super.add(object);
	}

	positionObject(object) {
		const index = this.objects.length
		const spherical = new Spherical(this.radius, Math.PI / 2, index * this.delta * toRad)
		object.position.copy(new Vector3().addVectors(this.center, new Vector3().setFromSpherical(spherical)))
		spherical.radius += 1
		object.lookAt(new Vector3().addVectors(this.center, new Vector3().setFromSpherical(spherical)))
	}

	get active() {
		return this.objects[this.index]
	}

	next() {
		const reach = this.index + 1
		if (reach === this.objects.count) {
			this.index = 0
		}
		this.to(reach)
	}

	previous() {
		const reach = this.index - 1
		if (reach < 0) {
			this.index = this.objects.count - 1
		}
		this.to(reach)
	}

	to(index) {
		const a = (index * this.delta) % 360
		gsap.to(this.rotation, {
			y: -a * toRad,
			duration: 0.4 * (Math.abs(this.index - index) + 1),
			ease: 'power2.out',
			onComplete: () => {
				this.index = index
				this.updateItemsMaterial()
			}
		})
	}

	updateItemsMaterial() {
		this.objects.forEach((o, i) => {
			if (i !== this.index) {
				o.material = disableMaterial
			} else {
				o.material = o.baseMaterial
			}
		})
	}

	// Events
	onClick() {
		const intersects = this.cursor.raycaster.intersectObjects(this.objects)
		if (intersects[0]) {
			const index = this.objects.indexOf(intersects[0].object)
			this.to(index)
		}
	}

	onDragStart() {
	}

	onDragMove() {
	}

	onDragEnd() {
	}

	onScroll() {
	}
}