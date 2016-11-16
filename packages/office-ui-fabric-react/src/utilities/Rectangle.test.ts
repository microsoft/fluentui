import Rectangle from './Rectangle';

export function areRectanglesEqual(rectangleOne: Rectangle, rectangleTwo: Rectangle) {
  // I'm fixing it to 4 decimal places because it allows enough precision and will handle cases when something should be rounded,
  // like .999999 should round to 1.
  return (parseFloat(rectangleOne.top.toFixed(4)) === parseFloat(rectangleTwo.top.toFixed(4))  && parseFloat(rectangleOne.bottom.toFixed(4))  === parseFloat(rectangleTwo.bottom.toFixed(4)) && parseFloat(rectangleOne.left.toFixed(4))  === parseFloat(rectangleTwo.left.toFixed(4))  && parseFloat(rectangleOne.right.toFixed(4))  === parseFloat(rectangleTwo.right.toFixed(4)) );
}