import { Rectangle } from '../Utilities';
import { positioningFunctions } from './positioning';
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

function stringifyResults(expected: any, actual: any) {
  return 'expected was: ' + JSON.stringify(expected) + ' actual was: ' + JSON.stringify(actual);
}

function positionCalloutTest(testValues: ITestValues, alignment: DirectionalHint, validate: ITestValidation) {
  let { callout, target, bounds, beakWidth } = testValues;
  let gap: number = positioningFunctions._calculateActualBeakWidthInPixels(beakWidth) / 2;
  let result: positioningFunctions.ICallout = positioningFunctions._positionCalloutWithinBounds(callout, target, bounds, positioningFunctions._getPositionData(alignment), gap);

  let beak = positioningFunctions._positionBeak(beakWidth, result, target, 0);

  expect(result.calloutRectangle).toEqual(validate.callout);

  for (const key in beak) {
    if (beak[key]) {
      const beakValue = beak[key];
      const validateBeakValue = (validate.beak as any)[key];
      const beakGood = beakValue && validateBeakValue && beak[key] === beakValue;
      assert(beakGood, 'Beak is improperly Positioned ' + stringifyResults(validate.beak, beak));
    }
  }
}

function validateNoBeakTest(testValues: ITestValues, alignment: DirectionalHint, validate: ITestValidation) {
  let { callout, target, bounds, beakWidth } = testValues;
  let result: positioningFunctions.ICallout = positioningFunctions._positionCalloutWithinBounds(callout, target, bounds, positioningFunctions._getPositionData(alignment), beakWidth);

  expect(result.calloutRectangle).toEqual(validate.callout);
}

describe('Callout Positioning', () => {
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
    // Test for maxHeight from bottom of target to bottom of bounds
    expect(testMax).toBe(1000 - targetBot);

    testMax = getMaxHeight(targetRectangle, DirectionalHint.topCenter, 0, bounds);
    // Test for maxHeight from top of target to top of bounds
    expect(testMax).toBe(targetTop);

    testMax = getMaxHeight(targetRectangle, DirectionalHint.rightCenter, 0, bounds);
    // Test for maxHeight from top of target to bottom of bounds
    expect(testMax).toBe(1000 - targetTop);
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

    // Test for maxHeight from bottom of target to bottom of bounds
    expect(testMax).toBe(1000 - targetBot - gapSpace);

    testMax = getMaxHeight(targetRectangle, DirectionalHint.topCenter, gapSpace, bounds);
    // Test for maxHeight from top of target to top of bounds
    expect(testMax).toBe(targetTop - gapSpace);

    testMax = getMaxHeight(targetRectangle, DirectionalHint.rightCenter, gapSpace, bounds);
    // Test for maxHeight from top of target to bottom of bounds
    expect(testMax).toBe(1000 - targetTop - gapSpace);
  });

});