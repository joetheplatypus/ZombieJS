export default function lerp(x1, x2, y1, y2, xval) {
  const val = ((y2-y1)*(xval-x1))/(x2-x1) + y1
  //occurs in lost packets where using extrapolation causes lagginess
  if(val > y2) {
    // return y2;
  }
  // console.log(`lerping from ${y1} to ${y2} returns ${val} given ${x1} compared to ${x2} and is ${xval}`)
  return val
}