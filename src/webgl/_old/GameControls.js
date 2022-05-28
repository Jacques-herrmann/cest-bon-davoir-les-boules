import WebGL from './webgl'
import { Vector3 } from 'three'
import { clamp } from './utils/math'

let i = 0
const STATES = {
  LOBBY: i++,
  GAME: i++,
  END: i++
}
const S = 25
const F = 2

export default class GameControls {
  constructor (object) {
    this.target = object
    this.state = STATES.LOBBY
    this.initSpeed = 10
    this.impulses = {
      left: 1,
      right: 1,
      front: 1,
      back: 1
    }
    document.addEventListener('keyup', this.handleKeyUp.bind(this))
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
    document.addEventListener('keypress', this.handleKeyPress.bind(this))
  }

  static get STATES () {
    return STATES
  }

  start (ev) {
    this.target.applyForce(new Vector3(this.initSpeed, 0, 0))
    this.state = STATES.GAME
    // Run Physical World
    // Update Ball with Physical world
  }

  stop () {
    this.state = STATES.END
    // End Physical World
    // Show End screen
  }

  handleKeyUp (ev) {
    switch (ev.code) {
      case ('Space'):
        this.start()
        break
      case 'ArrowLeft':
        // Left pressed
        this.impulses.left = 1
        break
      case 'ArrowRight':
        // Right pressed
        this.impulses.right = 1
        break
      case 'ArrowUp':
        // Up pressed
        this.impulses.front = 1
        break
      case 'ArrowDown':
        // Down pressed
        this.impulses.back = 1
        break
    }
  }

  handleKeyDown (ev) {
    switch (ev.code) {
      case ('Space'):
        this.initSpeed += 3
        break
      case 'ArrowLeft':
        // Left pressed
        this.impulses.left *= F
        break
      case 'ArrowRight':
        // Right pressed
        this.impulses.right *= F
        break
      case 'ArrowUp':
        // Up pressed
        this.impulses.front *= F
        break
      case 'ArrowDown':
        // Down pressed
        this.impulses.back *= F
        break
    }
  }

  handleKeyPress (ev) {
    switch (ev.code) {
      case 'ArrowLeft':
        // Left pressed
        break
      case 'ArrowRight':
        // Right pressed
        break
      case 'ArrowUp':
        // Up pressed
        break
      case 'ArrowDown':
        // Down pressed
        break
    }
  }

  update () {
    const up = new Vector3(0, 1, 0)
    const front = new Vector3().copy(this.target.direction)
    const back = new Vector3().copy(front).multiplyScalar(-1)
    const right = new Vector3().copy(front).cross(up)
    const left = new Vector3().copy(right).multiplyScalar(-1)

    front.multiplyScalar(S * clamp(this.impulses.front, 1, 3))
    back.multiplyScalar(S * clamp(this.impulses.back, 1, 3))
    left.multiplyScalar(S * clamp(this.impulses.left, 1, 3))
    right.multiplyScalar(S * clamp(this.impulses.right, 1, 3))

    const frontBack = new Vector3().addVectors(front, back)
    const sides = new Vector3().addVectors(left, right)

    const final = new Vector3().addVectors(frontBack, sides)

    // if (final.x !== 0 && final.z !== 0) {
    // console.log(final)
    this.target.physics.applyForce(final)
    // }
  }
}
