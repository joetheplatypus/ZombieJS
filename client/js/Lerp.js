export default function lerp(x1, x2, y1, y2, xval) {
  const val = ((y2-y1)*(xval-x1))/(x2-x1) + y1
  console.log(`lerping from ${y1} to ${y2} returns ${val}`)
  return val
}