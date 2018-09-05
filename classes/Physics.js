module.exports = {
  rectIntersect(rectA, rectB) {
    if (rectA.x1 < rectB.x2 && rectA.x2 > rectB.x1 && rectA.y1 < rectB.y2 && rectA.y2 > rectB.y1) {
      return true
    } else {
      return false
    }
  },
  rectangle(x, y, width, height) {
    return {
      x1: x,
      x2: x + width,
      y1: y,
      y2: y + height
    }
  }
}