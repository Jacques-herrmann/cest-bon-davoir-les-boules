
const toRad = Math.PI / 180

function sphericalToCartesian (r, t, p) {
  return {
    x: r * Math.sin(p) * Math.cos(t),
    y: r * Math.sin(p) * Math.sin(t),
    z: r * Math.cos(p)
  }
}

function clamp (n, min, max) {
  return Math.min(Math.max(n, min), max)
}


export {
  toRad,
  sphericalToCartesian,
  clamp,
}
