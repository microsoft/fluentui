import { Rectangle } from '../Utilities';
import { __positioningTestPackage, RectangleEdge, IElementPosition } from './positioning';
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

function positionCalloutTest(testValues: ITestValues, alignment: DirectionalHint, validate: ITestValidation): void {
  const { callout, target, bounds, beakWidth } = testValues;
  const gap: number = __positioningTestPackage._calculateActualBeakWidthInPixels(beakWidth) / 2;
  const result: IElementPosition = __positioningTestPackage._positionElementWithinBounds(
    callout,
    target,
    bounds,
    __positioningTestPackage._getPositionData(alignment),
    gap
  );

  const beak = __positioningTestPackage._positionBeak(beakWidth, { ...result, targetRectangle: target });

  expect(result.elementRectangle).toEqual(validate.callout);

  for (const key in beak) {
    if (beak[key]) {
      const beakValue = beak[key];
      const validateBeakValue = (validate.beak as any)[key];
      const beakGood = beakValue && validateBeakValue && beak[key] === beakValue;
      expect(beakGood).toBe(true);
    }
  }
}

function validateNoBeakTest(testValues: ITestValues, alignment: DirectionalHint, validate: ITestValidation): void {
  const { callout, target, bounds, beakWidth } = testValues;
  const result: IElementPosition = __positioningTestPackage._positionElementWithinBounds(
    callout,
    target,
    bounds,
    __positioningTestPackage._getPositionData(alignment),
    beakWidth
  );

  expect(result.elementRectangle).toEqual(validate.callout);
}

describe('Callout Positioning', () => {
  it('Correctly positions the callout without beak', () => {
    const noBeakTestCase: ITestValues = {
      callout: new Rectangle(0, 300, 0, 300),
      target: new Rectangle(400, 800, 400, 800),
      bounds: new Rectangle(0, 1600, 0, 1600),
      beakWidth: 0
    };

    const validateNoBeakBottomLeft: ITestValidation = {
      callout: new Rectangle(400, 700, 800, 1100),
      beak: null
    };

    const validateNoBeakLeft: ITestValidation = {
      callout: new Rectangle(100, 400, 400, 700),
      beak: null
    };

    const validateNoBeakTop: ITestValidation = {
      callout: new Rectangle(400, 700, 100, 400),
      beak: null
    };

    validateNoBeakTest(noBeakTestCase, DirectionalHint.bottomLeftEdge, validateNoBeakBottomLeft);

    validateNoBeakTest(noBeakTestCase, DirectionalHint.leftTopEdge, validateNoBeakLeft);

    validateNoBeakTest(noBeakTestCase, DirectionalHint.topLeftEdge, validateNoBeakTop);
  });

  it('Correctly positions the callout with the beak', () => {
    const basicTestCase: ITestValues = {
      callout: new Rectangle(0, 300, 0, 300),
      target: new Rectangle(400, 800, 400, 800),
      bounds: new Rectangle(0, 1600, 0, 1600),
      beakWidth: 16
    };

    const validateBottomLeft: ITestValidation = {
      callout: new Rectangle(
        400,
        700,
        800 + __positioningTestPackage._calculateActualBeakWidthInPixels(8),
        1100 + __positioningTestPackage._calculateActualBeakWidthInPixels(8)
      ),
      beak: new Rectangle(192, 208, -8, 8)
    };

    const validateBottomCenter: ITestValidation = {
      callout: new Rectangle(
        450,
        750,
        800 + __positioningTestPackage._calculateActualBeakWidthInPixels(8),
        1100 + __positioningTestPackage._calculateActualBeakWidthInPixels(8)
      ),
      beak: new Rectangle(142, 158, -8, 8)
    };

    const validateBottomRight: ITestValidation = {
      callout: new Rectangle(
        500,
        800,
        800 + __positioningTestPackage._calculateActualBeakWidthInPixels(8),
        1100 + __positioningTestPackage._calculateActualBeakWidthInPixels(8)
      ),
      beak: new Rectangle(92, 108, -8, 8)
    };

    positionCalloutTest(basicTestCase, DirectionalHint.bottomLeftEdge, validateBottomLeft);

    positionCalloutTest(basicTestCase, DirectionalHint.bottomCenter, validateBottomCenter);

    positionCalloutTest(basicTestCase, DirectionalHint.bottomRightEdge, validateBottomRight);
  });

  it('Correctly positions the callout when none of the alignment options fit within bounds', () => {
    const basicTestCase: ITestValues = {
      callout: new Rectangle(0, 200, 0, 200),
      target: new Rectangle(150, 160, 150, 160),
      bounds: new Rectangle(8, 300, 8, 300),
      beakWidth: 0
    };

    const validateBottomLeft: ITestValidation = {
      callout: new Rectangle(8, 208, 100, 300),
      beak: null
    };

    const validateTopRight: ITestValidation = {
      callout: new Rectangle(8, 208, 8, 208),
      beak: null
    };

    validateNoBeakTest(basicTestCase, DirectionalHint.bottomLeftEdge, validateBottomLeft);

    validateNoBeakTest(basicTestCase, DirectionalHint.topRightEdge, validateTopRight);
  });

  it('Correctly determines max height', () => {
    const getMaxHeight = __positioningTestPackage._getMaxHeightFromTargetRectangle;

    let targetTop;
    let targetBot;
    const targetRight = (targetBot = 20);
    const targetLeft = (targetTop = 10);
    const targetRectangle = new Rectangle(targetLeft, targetRight, targetTop, targetBot);
    const bounds = new Rectangle(0, 1000, 0, 1000);

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
    const getMaxHeight = __positioningTestPackage._getMaxHeightFromTargetRectangle;
    let targetTop;
    let targetBot;
    const targetRight = (targetBot = 200);
    const targetLeft = (targetTop = 100);
    const targetRectangle = new Rectangle(targetLeft, targetRight, targetTop, targetBot);
    const bounds = new Rectangle(0, 1000, 0, 1000);
    const gapSpace = 10;

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

  it('Correctly determines the correct edges to return', () => {
    // Create a dummy host, this isn't the part that we care about for this test
    const host = {
      getBoundingClientRect: () => {
        return {
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          width: 0,
          height: 0
        };
      }
    };
    // create a dummy beak
    const beakPos = new Rectangle(8, -8, 8, -8);
    const pos: IElementPosition = {
      elementRectangle: new Rectangle(400, 500, 400, 500),
      targetEdge: RectangleEdge.top,
      alignmentEdge: RectangleEdge.left
    };
    const bounds = new Rectangle(0, 500, 0, 500);

    // Normal positioning should target the alignment edge and the opposite of the target edge.
    // In this case, that's left (alignment) and bottom (opposite of target)
    let finalizedPosition = __positioningTestPackage._finalizePositionData(pos, host as any);
    expect(finalizedPosition.elementPosition.left).toBeDefined();
    expect(finalizedPosition.elementPosition.bottom).toBeDefined();
    expect(finalizedPosition.elementPosition.top).toBeUndefined();

    // Cover positioning should target the alignment edge and the target edge.
    // In this case, that's left (alignment) and top (target)
    finalizedPosition = __positioningTestPackage._finalizePositionData(pos, host as any, undefined, true);
    expect(finalizedPosition.elementPosition.left).toBeDefined();
    expect(finalizedPosition.elementPosition.top).toBeDefined();
    expect(finalizedPosition.elementPosition.bottom).toBeUndefined();

    // With bounds introduced, if the elementRectangle is closer to one edge of bounds than another,
    // should align to edge closest to bounds
    // In this case, that's bottom (opposite of target) and right (closer to edge of bounds)
    finalizedPosition = __positioningTestPackage._finalizePositionData(pos, host as any, bounds);
    expect(finalizedPosition.elementPosition.right).toBeDefined();
    expect(finalizedPosition.elementPosition.bottom).toBeDefined();
    expect(finalizedPosition.elementPosition.left).toBeUndefined();

    // With bounds introduced, if the elementRectangle is closer to one edge of bounds than another,
    // but it has already been positioned previously, then don't change the edge
    // In this case, that's bottom (opposite of target) and left
    finalizedPosition = __positioningTestPackage._finalizePositionData(pos, host as any, bounds, false, true);
    expect(finalizedPosition.elementPosition.left).toBeDefined();
    expect(finalizedPosition.elementPosition.bottom).toBeDefined();
    expect(finalizedPosition.elementPosition.right).toBeUndefined();

    // With bounds introduced, the alignment should apply to the beak as well, aligning it to
    // the edge closest to bounds
    // In this case, that's the bottom (opposite of target) and right (closer to edge of bounds)
    const finalizedBeakPosition = __positioningTestPackage._finalizeBeakPosition(pos, beakPos, bounds);
    expect(finalizedBeakPosition.elementPosition.right).toBeDefined();
    expect(finalizedBeakPosition.elementPosition.bottom).toBeDefined();
    expect(finalizedBeakPosition.elementPosition.left).toBeUndefined();
  });
});
