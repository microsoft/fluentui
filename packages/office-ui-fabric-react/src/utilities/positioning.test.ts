import { Rectangle } from '../Utilities';
import { positioningFunctions, RectangleEdge } from './positioning';
import { DirectionalHint } from '../common/DirectionalHint';
interface ITestValidation {
  callout: Rectangle;
  beak: Rectangle | null;
}

interface ITestValues {
  callout: Rectangle;
  target: Rectangle;
  bounds: Rectangle;
  beakWidth: number;
}

let { assert } = chai;

function stringifyResults(expected: any, actual: any) {
  return 'expected was: ' + JSON.stringify(expected) + ' actual was: ' + JSON.stringify(actual);
}

function positionCalloutTest(testValues: ITestValues, alignment: DirectionalHint, validate: ITestValidation) {
  let { callout, target, bounds, beakWidth } = testValues;
  let gap: number = positioningFunctions._calculateActualBeakWidthInPixels(beakWidth) / 2;
  let result: positioningFunctions.ICallout = positioningFunctions._positionCalloutWithinBounds(callout, target, bounds, positioningFunctions._getPositionData(alignment, target, bounds), gap);

  let beak: Rectangle = positioningFunctions._positionBeak(beakWidth, result, target, 0);

  assert(result.calloutRectangle.equals(validate.callout), 'Callout not alligned with target ' + stringifyResults(validate.callout, result.calloutRectangle));

  assert(beak.equals(validate.beak as Rectangle), 'Beak is improperly positioned. ' + stringifyResults(validate.beak, beak));
}

function validateNoBeakTest(testValues: ITestValues, alignment: DirectionalHint, validate: ITestValidation) {
  let { callout, target, bounds, beakWidth } = testValues;
  let result: positioningFunctions.ICallout = positioningFunctions._positionCalloutWithinBounds(callout, target, bounds, positioningFunctions._getPositionData(alignment, target, bounds), beakWidth);

  assert(result.calloutRectangle.equals(validate.callout), 'No Beak: Callout not alligned with target ' + stringifyResults(validate.callout, result.calloutRectangle));
}

describe('Callout Positioning', () => {

  it('Gets correct percent along line', () => {

    let result = positioningFunctions._calculatePointPercentAlongLine({ x: 0, y: 0 }, { x: 100, y: 0 }, 50);
    assert(result.x === 50 && result.y === 0, 'point is not 50% from edge ' + stringifyResults(50, result.x));

    result = positioningFunctions._calculatePointPercentAlongLine({ x: 0, y: 0 }, { x: 100, y: 0 }, 75);
    assert(result.x === 75 && result.y === 0, 'point is not 75% from edge ' + stringifyResults(75, result.x));

    result = positioningFunctions._calculatePointPercentAlongLine({ x: 0, y: 0 }, { x: 0, y: 100 }, 99);
    assert(result.x === 0 && result.y === 99, 'point is not 99% from edge ' + stringifyResults(99, result.x));

    result = positioningFunctions._calculatePointPercentAlongLine({ x: 0, y: 0 }, { x: 3, y: 0 }, 50);
    assert(result.x === 1.5 && result.y === 0, 'point is not 50% from edge ' + stringifyResults(1.5, result.x));

    result = positioningFunctions._calculatePointPercentAlongLine({ x: 0, y: 0 }, { x: 3, y: 0 }, 75);
    assert(result.x === 2.25 && result.y === 0, 'point is not 75% from edge ' + stringifyResults(2.25, result.x));

    result = positioningFunctions._calculatePointPercentAlongLine({ x: 0, y: 0 }, { x: 4, y: 0 }, 50);
    assert(result.x === 2 && result.y === 0, 'point is not 50% from edge ' + stringifyResults(2, result.x));

    result = positioningFunctions._calculatePointPercentAlongLine({ x: 0, y: 0 }, { x: 4, y: 0 }, 75);
    assert(result.x === 3 && result.y === 0, 'point is not 75% from edge ' + stringifyResults(3, result.x));

    result = positioningFunctions._calculatePointPercentAlongLine({ x: 0, y: 0 }, { x: 4, y: 0 }, 60);
    assert(result.x === 2.4 && result.y === 0, 'point is not 60% from edge ' + stringifyResults(2.4, result.x));

    result = positioningFunctions._calculatePointPercentAlongLine({ x: 0, y: 0 }, { x: 5, y: 0 }, 99);
    assert(result.x === 4.95 && result.y === 0, 'point is not 99% from edge ' + stringifyResults(4.95, result.x));
  });

  it('Correctly recalculates percents', () => {
    let targetRectangle = new Rectangle(200, 300, 200, 300);

    let result = positioningFunctions._recalculateMatchingPercents(new Rectangle(0, 100, 300, 400), RectangleEdge.top, targetRectangle, RectangleEdge.bottom, 50);
    assert(result === 100, stringifyResults(100, result));

    result = positioningFunctions._recalculateMatchingPercents(new Rectangle(200, 300, 300, 400), RectangleEdge.top, targetRectangle, RectangleEdge.bottom, 50);
    assert(result === 50, stringifyResults(50, result));

    result = positioningFunctions._recalculateMatchingPercents(new Rectangle(200, 250, 300, 400), RectangleEdge.top, targetRectangle, RectangleEdge.bottom, 25);
    assert(result === 50, stringifyResults(50, result));

    result = positioningFunctions._recalculateMatchingPercents(new Rectangle(600, 900, 300, 400), RectangleEdge.top, targetRectangle, RectangleEdge.bottom, 50);
    assert(result === 0, stringifyResults(0, result));
  });

  it('Correctly positions the callout without beak', () => {

    let noBeakTestCase: ITestValues = {
      callout: new Rectangle(0, 300, 0, 300),
      target: new Rectangle(400, 800, 400, 800),
      bounds: new Rectangle(0, 1600, 0, 1600),
      beakWidth: 0,
    };

    let validateNoBeakBottomLeft: ITestValidation = {
      callout: new Rectangle(400, 700, 800, 1100),
      beak: null
    };

    let validateNoBeakLeft: ITestValidation = {
      callout: new Rectangle(100, 400, 400, 700),
      beak: null
    };

    let validateNoBeakTop: ITestValidation = {
      callout: new Rectangle(400, 700, 100, 400),
      beak: null
    };

    validateNoBeakTest(noBeakTestCase, DirectionalHint.bottomLeftEdge, validateNoBeakBottomLeft);

    validateNoBeakTest(noBeakTestCase, DirectionalHint.leftTopEdge, validateNoBeakLeft);

    validateNoBeakTest(noBeakTestCase, DirectionalHint.topLeftEdge, validateNoBeakTop);
  });

  it('Correctly positions the callout with the beak', () => {

    let basicTestCase: ITestValues = {
      callout: new Rectangle(0, 300, 0, 300),
      target: new Rectangle(400, 800, 400, 800),
      bounds: new Rectangle(0, 1600, 0, 1600),
      beakWidth: 16,
    };

    let validateBottomLeft: ITestValidation = {
      callout: new Rectangle(400, 700, 800 + positioningFunctions._calculateActualBeakWidthInPixels(8), 1100 + positioningFunctions._calculateActualBeakWidthInPixels(8)),
      beak: new Rectangle(192, 208, -8, 8)
    };

    let validateBottomCenter: ITestValidation = {
      callout: new Rectangle(450, 750, 800 + positioningFunctions._calculateActualBeakWidthInPixels(8), 1100 + positioningFunctions._calculateActualBeakWidthInPixels(8)),
      beak: new Rectangle(142, 158, -8, 8)
    };

    let validateBottomRight: ITestValidation = {
      callout: new Rectangle(500, 800, 800 + positioningFunctions._calculateActualBeakWidthInPixels(8), 1100 + positioningFunctions._calculateActualBeakWidthInPixels(8)),
      beak: new Rectangle(92, 108, -8, 8)
    };

    positionCalloutTest(basicTestCase, DirectionalHint.bottomLeftEdge, validateBottomLeft);

    positionCalloutTest(basicTestCase, DirectionalHint.bottomCenter, validateBottomCenter);

    positionCalloutTest(basicTestCase, DirectionalHint.bottomRightEdge, validateBottomRight);
  });

  it('Correctly determines max height', () => {
    let getMaxHeight = positioningFunctions._getMaxHeightFromTargetRectangle;
    let targetTop;
    let targetBot;
    let targetRight = targetBot = 20;
    let targetLeft = targetTop = 10;
    let targetRectangle = new Rectangle(targetLeft, targetRight, targetTop, targetBot);
    let bounds = new Rectangle(0, 1000, 0, 1000);

    let testMax = getMaxHeight(targetRectangle, DirectionalHint.bottomCenter, 0, bounds);
    assert(testMax === 1000 - targetBot,
      `Test for maxHeight from bottom of target to bottom of bounds: maxHeight was ${testMax} and it should have been ${1000 - targetBot}`);

    testMax = getMaxHeight(targetRectangle, DirectionalHint.topCenter, 0, bounds);
    assert(testMax === targetTop,
      `Test for maxHeight from top of target to top of bounds: maxHeight was ${testMax} and it should have been ${targetTop}`);

    testMax = getMaxHeight(targetRectangle, DirectionalHint.rightCenter, 0, bounds);
    assert(testMax === 1000 - targetTop,
      `Test for maxHeight from top of target to bottom of bounds: maxHeight was ${testMax} and it should have been ${1000 - targetTop}`);
  });

  it('Correctly determines max height with a gapSpace included', () => {
    let getMaxHeight = positioningFunctions._getMaxHeightFromTargetRectangle;
    let targetTop;
    let targetBot;
    let targetRight = targetBot = 200;
    let targetLeft = targetTop = 100;
    let targetRectangle = new Rectangle(targetLeft, targetRight, targetTop, targetBot);
    let bounds = new Rectangle(0, 1000, 0, 1000);
    let gapSpace = 10;

    let testMax = getMaxHeight(targetRectangle, DirectionalHint.bottomCenter, gapSpace, bounds);

    assert(testMax === 1000 - targetBot - gapSpace,
      `Test for maxHeight from bottom of target to bottom of bounds: maxHeight was ${testMax} and it should have been ${1000 - targetBot - gapSpace}`);

    testMax = getMaxHeight(targetRectangle, DirectionalHint.topCenter, gapSpace, bounds);
    assert(testMax === targetTop - gapSpace,
      `Test for maxHeight from top of target to top of bounds: maxHeight was ${testMax} and it should have been ${targetTop - gapSpace}`);

    testMax = getMaxHeight(targetRectangle, DirectionalHint.rightCenter, gapSpace, bounds);
    assert(testMax === 1000 - targetTop - gapSpace,
      `Test for maxHeight from top of target to bottom of bounds: maxHeight was ${testMax} and it should have been ${1000 - targetTop - gapSpace}`);
  });

});