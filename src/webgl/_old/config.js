const config = {
  debug: true,
  global: {
    renderer: {},
    scene: {
      background: '#18191f'
    },
    camera: {
      position: { x: -1000, y: 900, z: -300 }
    }
  },
  controls: {
    forceControl: true
  }
}
const options = {
  number: {
    min: -100,
    max: 100,
    step: 0.1
  },
  color: {
    alpha: true,
    view: 'color'
  },
  position: {
    x: { min: -10000, max: 10000 },
    y: { min: -10000, max: 10000 },
    z: { min: -10000, max: 10000 }
  }
}
export {
  config,
  options
}
