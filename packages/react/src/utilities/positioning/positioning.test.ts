import { Rectangle } from '../../Utilities';
import { getBoundsFromTargetWindow, RectangleEdge } from './index';
import { __positioningTestPackage } from './positioning';
import { DirectionalHint } from '../../common/DirectionalHint';
import type { Point } from '../../Utilities';
import type { IElementPosition } from './index';

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
    gap,
  );

  const beak = __positioningTestPackage._positionBeak(beakWidth, { ...result, targetRectangle: target });

  expect(result.elementRectangle).toEqual(validate.callout);

  for (const key in beak) {
    if ((beak as any)[key]) {
      const beakValue = (beak as any)[key];
      const validateBeakValue = (validate.beak as any)[key];
      const beakGood = beakValue && validateBeakValue && (beak as any)[key] === beakValue;
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
    beakWidth,
  );

  expect(result.elementRectangle).toEqual(validate.callout);
}

describe('Callout Positioning', () => {
  it('Correctly positions the callout without beak', () => {
    const noBeakTestCase: ITestValues = {
      callout: new Rectangle(0, 300, 0, 300),
      target: new Rectangle(400, 800, 400, 800),
      bounds: new Rectangle(0, 1600, 0, 1600),
      beakWidth: 0,
    };

    const validateNoBeakBottomLeft: ITestValidation = {
      callout: new Rectangle(400, 700, 800, 1100),
      beak: null,
    };

    const validateNoBeakLeft: ITestValidation = {
      callout: new Rectangle(100, 400, 400, 700),
      beak: null,
    };

    const validateNoBeakTop: ITestValidation = {
      callout: new Rectangle(400, 700, 100, 400),
      beak: null,
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
      beakWidth: 16,
    };

    const validateBottomLeft: ITestValidation = {
      callout: new Rectangle(
        400,
        700,
        800 + __positioningTestPackage._calculateActualBeakWidthInPixels(8),
        1100 + __positioningTestPackage._calculateActualBeakWidthInPixels(8),
      ),
      beak: new Rectangle(192, 208, -8, 8),
    };

    const validateBottomCenter: ITestValidation = {
      callout: new Rectangle(
        450,
        750,
        800 + __positioningTestPackage._calculateActualBeakWidthInPixels(8),
        1100 + __positioningTestPackage._calculateActualBeakWidthInPixels(8),
      ),
      beak: new Rectangle(142, 158, -8, 8),
    };

    const validateBottomRight: ITestValidation = {
      callout: new Rectangle(
        500,
        800,
        800 + __positioningTestPackage._calculateActualBeakWidthInPixels(8),
        1100 + __positioningTestPackage._calculateActualBeakWidthInPixels(8),
      ),
      beak: new Rectangle(92, 108, -8, 8),
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
      beakWidth: 0,
    };

    // when no alignment options fit within bounds, bottom left should flip to top left
    // since there is more room at the top
    const validateBottomLeft: ITestValidation = {
      callout: new Rectangle(100, 300, 8, 208),
      beak: null,
    };

    // when no alignment options fit within bounds, top right stays top right
    // since that side has the most room
    const validateTopRight: ITestValidation = {
      callout: new Rectangle(8, 208, 8, 208),
      beak: null,
    };

    validateNoBeakTest(basicTestCase, DirectionalHint.bottomLeftEdge, validateBottomLeft);

    validateNoBeakTest(basicTestCase, DirectionalHint.topRightEdge, validateTopRight);
  });

  it('Correctly positions the callout when out of bounds and directionalHintFixed is true', () => {
    const basicTestCase: ITestValues = {
      callout: new Rectangle(0, 200, 0, 200),
      target: new Rectangle(150, 160, 150, 160),
      bounds: new Rectangle(8, 300, 8, 300),
      beakWidth: 0,
    };

    // should align at the bottom, even if it doesn't fit
    // the alignment edge (left) can adjust, but not the bottom position
    const validateBottomLeft: ITestValidation = {
      callout: new Rectangle(100, 300, 160, 300),
      beak: null,
    };

    // manually call _positionElementWithinBounds to pass in directionalHintFixed value
    const result: IElementPosition = __positioningTestPackage._positionElementWithinBounds(
      basicTestCase.callout,
      basicTestCase.target,
      basicTestCase.bounds,
      __positioningTestPackage._getPositionData(DirectionalHint.bottomLeftEdge),
      basicTestCase.beakWidth,
      false, // shouldScroll value
      undefined, // minimumScrollResizeHeight value
      true, // directionalHintFixed value
    );

    expect(result.elementRectangle).toEqual(validateBottomLeft.callout);
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
          height: 0,
        };
      },
    };
    // create a dummy beak
    const beakPos = new Rectangle(8, -8, 8, -8);
    const pos: IElementPosition = {
      elementRectangle: new Rectangle(400, 500, 400, 500),
      targetEdge: RectangleEdge.top,
      alignmentEdge: RectangleEdge.left,
    };
    const bounds = new Rectangle(0, 501, 0, 501);
    const flushBounds = new Rectangle(0, 500, 0, 500);
    const target = new Rectangle(0, 100, 0, 100);

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

    // With bounds flush against the edge of the elementRectangle, change the edge such that the elementRectangle
    // will grow correctly but will not visually change
    // In this case, that's bottom (opposite of target) and right (flush against the bounds)
    finalizedPosition = __positioningTestPackage._finalizePositionData(pos, host as any, flushBounds, false, true);
    expect(finalizedPosition.elementPosition.left).toBeUndefined();
    expect(finalizedPosition.elementPosition.bottom).toBeDefined();
    expect(finalizedPosition.elementPosition.right).toBeDefined();

    // With bounds introduced, the alignment should apply to the beak as well, aligning it to
    // the edge closest to bounds
    // In this case, that's the bottom (opposite of target) and right (closer to edge of bounds)
    const finalizedBeakPosition = __positioningTestPackage._finalizeBeakPosition(
      { ...pos, targetRectangle: target },
      beakPos,
      bounds,
    );
    expect(finalizedBeakPosition.elementPosition.right).toBeDefined();
    expect(finalizedBeakPosition.elementPosition.bottom).toBeDefined();
    expect(finalizedBeakPosition.elementPosition.left).toBeUndefined();
  });

  it('Correctly determines the correct edges to return when against bounds', () => {
    // Create a dummy host, this isn't the part that we care about for this test
    const host = {
      getBoundingClientRect: () => {
        return {
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          width: 0,
          height: 0,
        };
      },
    };
    // create a dummy beak
    const pos: IElementPosition = {
      elementRectangle: new Rectangle(400, 500, 400, 500),
      targetEdge: RectangleEdge.top,
      alignmentEdge: RectangleEdge.left,
    };
    const bounds = new Rectangle(0, 500, 0, 500);

    // When we allow finalizing the return edge, we should specify the bottom such that the host grows away from
    // the edge of the bounds
    // In this case, that's the bottom (opposite of target) and right (closer to edge of bounds)
    let finalizedPosition = __positioningTestPackage._finalizePositionData(pos, host as any, bounds, false, false);
    expect(finalizedPosition.elementPosition.right).toBeDefined();
    expect(finalizedPosition.elementPosition.bottom).toBeDefined();
    expect(finalizedPosition.elementPosition.top).toBeUndefined();

    // When we don't allow finalizing the return edge, but the host is flush against the edge of the bounds,
    // we should have the same result as before
    // In this case, that's the bottom (opposite of target) and right (closer to edge of bounds)
    finalizedPosition = __positioningTestPackage._finalizePositionData(pos, host as any, bounds, false, true);
    expect(finalizedPosition.elementPosition.right).toBeDefined();
    expect(finalizedPosition.elementPosition.bottom).toBeDefined();
    expect(finalizedPosition.elementPosition.top).toBeUndefined();
  });
});

describe('getBoundingRectangle', () => {
  /**
   * Window with typings for experimental features regarding Dual Screen devices.
   */
  interface IWindowWithSegments extends Window {
    getWindowSegments?: () => DOMRect[];
  }

  const __INNER_HEIGHT = 1080;
  const __INNER_WIDTH = 1920;

  it('Gets correct bounds in single screen scenarios where getWindowSegments call is not present', () => {
    const target: Point = { left: 0, top: 0 };
    const targetWindow: Partial<IWindowWithSegments> = {
      innerHeight: __INNER_HEIGHT,
      innerWidth: __INNER_WIDTH,
    };

    const validateBounds = {
      top: 0,
      left: 0,
      right: __INNER_WIDTH,
      bottom: __INNER_HEIGHT,
      width: __INNER_WIDTH,
      height: __INNER_HEIGHT,
    };

    expect(getBoundsFromTargetWindow(target, targetWindow as IWindowWithSegments)).toStrictEqual(validateBounds);
  });

  it('Gets correct bounds in single screen scenarios where getWindowSegments call is present', () => {
    const target: Point = { left: 0, top: 0 };
    const targetWindow: Partial<IWindowWithSegments> = {
      innerHeight: __INNER_HEIGHT,
      innerWidth: __INNER_WIDTH,
      getWindowSegments: () => {
        return [
          {
            x: 0,
            y: 0,
            top: 0,
            left: 0,
            right: __INNER_WIDTH,
            bottom: __INNER_HEIGHT,
            width: __INNER_WIDTH,
            height: __INNER_HEIGHT,
          },
        ] as DOMRect[];
      },
    };

    const validateBounds = {
      top: 0,
      left: 0,
      right: __INNER_WIDTH,
      bottom: __INNER_HEIGHT,
      width: __INNER_WIDTH,
      height: __INNER_HEIGHT,
    };

    expect(getBoundsFromTargetWindow(target, targetWindow as IWindowWithSegments)).toStrictEqual(validateBounds);
  });

  describe('Horizontal fold dual screen scenarios', () => {
    const leftRightDualScreenTargetWindow: IWindowWithSegments = {
      innerHeight: __INNER_HEIGHT,
      innerWidth: __INNER_WIDTH,
      getWindowSegments: () => {
        return [
          {
            x: 0,
            y: 0,
            left: 0,
            top: 0,
            right: __INNER_WIDTH / 3,
            bottom: __INNER_HEIGHT,
            width: __INNER_WIDTH / 3,
            height: __INNER_HEIGHT,
          },
          {
            x: __INNER_WIDTH / 3,
            y: 0,
            left: __INNER_WIDTH / 3,
            top: 0,
            right: __INNER_WIDTH,
            bottom: __INNER_HEIGHT,
            width: (__INNER_WIDTH * 2) / 3,
            height: __INNER_HEIGHT,
          },
        ] as DOMRect[];
      },
    } as IWindowWithSegments;
    const validateBoundsLeftScreen = {
      top: 0,
      left: 0,
      right: __INNER_WIDTH / 3,
      bottom: __INNER_HEIGHT,
      width: __INNER_WIDTH / 3,
      height: __INNER_HEIGHT,
    };
    const validateBoundsRightScreen = {
      top: 0,
      left: __INNER_WIDTH / 3,
      right: __INNER_WIDTH,
      bottom: __INNER_HEIGHT,
      width: (__INNER_WIDTH * 2) / 3,
      height: __INNER_HEIGHT,
    };

    it('Gets the 0 values as bounds in horizontal fold dual screen scenarios when null is passed as the target', () => {
      const target = null;

      const validateBounds = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
      };

      expect(getBoundsFromTargetWindow(target, leftRightDualScreenTargetWindow)).toStrictEqual(validateBounds);
    });

    it('Gets correct bounds in horizontal fold dual screen scenarios when Elements are passed as targets', () => {
      const targetWithinLeftScreen = {
        getBoundingClientRect: () =>
          ({
            x: 100,
            y: 100,
            left: 100,
            top: 100,
            right: 300,
            bottom: 300,
            width: 200,
            height: 200,
          } as DOMRect),
      } as Element;
      expect(getBoundsFromTargetWindow(targetWithinLeftScreen, leftRightDualScreenTargetWindow)).toStrictEqual(
        validateBoundsLeftScreen,
      );

      const targetWithinRightScreen = {
        getBoundingClientRect: () =>
          ({
            x: 1000,
            y: 100,
            left: 1000,
            top: 100,
            right: 1300,
            bottom: 300,
            width: 300,
            height: 200,
          } as DOMRect),
      } as Element;
      expect(getBoundsFromTargetWindow(targetWithinRightScreen, leftRightDualScreenTargetWindow)).toStrictEqual(
        validateBoundsRightScreen,
      );

      const targetCrossingScreensWithCenterOnLeftScreen = {
        getBoundingClientRect: () =>
          ({
            x: 500,
            y: 100,
            left: 500,
            top: 100,
            right: 700,
            bottom: 300,
            width: 200,
            height: 200,
          } as DOMRect),
      } as Element;
      expect(
        getBoundsFromTargetWindow(targetCrossingScreensWithCenterOnLeftScreen, leftRightDualScreenTargetWindow),
      ).toStrictEqual(validateBoundsLeftScreen);

      const targetCrossingScreensWithCenterOnRightScreen = {
        getBoundingClientRect: () =>
          ({
            x: 600,
            y: 100,
            left: 600,
            top: 100,
            right: 800,
            bottom: 300,
            width: 200,
            height: 200,
          } as DOMRect),
      } as Element;
      expect(
        getBoundsFromTargetWindow(targetCrossingScreensWithCenterOnRightScreen, leftRightDualScreenTargetWindow),
      ).toStrictEqual(validateBoundsRightScreen);
    });

    it('Gets correct bounds in horizontal fold dual screen scenarios when MouseEvents are passed as targets', () => {
      const targetWithinLeftScreen = {
        x: 150,
        y: 150,
      } as MouseEvent;
      expect(getBoundsFromTargetWindow(targetWithinLeftScreen, leftRightDualScreenTargetWindow)).toStrictEqual(
        validateBoundsLeftScreen,
      );

      const targetWithinRightScreen = {
        x: 1000,
        y: 1000,
      } as MouseEvent;
      expect(getBoundsFromTargetWindow(targetWithinRightScreen, leftRightDualScreenTargetWindow)).toStrictEqual(
        validateBoundsRightScreen,
      );
    });

    it('Gets correct bounds in horizontal fold dual screen scenarios when Points are passed as targets', () => {
      const targetWithinLeftScreen: Point = {
        left: 150,
        top: 150,
      };
      expect(getBoundsFromTargetWindow(targetWithinLeftScreen, leftRightDualScreenTargetWindow)).toStrictEqual(
        validateBoundsLeftScreen,
      );

      const targetWithinRightScreen: Point = {
        left: 1000,
        top: 1000,
      };
      expect(getBoundsFromTargetWindow(targetWithinRightScreen, leftRightDualScreenTargetWindow)).toStrictEqual(
        validateBoundsRightScreen,
      );
    });
  });

  describe('Vertical fold dual screen scenarios', () => {
    const topBottomDualScreenTargetWindow: IWindowWithSegments = {
      innerHeight: __INNER_HEIGHT,
      innerWidth: __INNER_WIDTH,
      getWindowSegments: () => {
        return [
          {
            x: 0,
            y: 0,
            left: 0,
            top: 0,
            right: __INNER_WIDTH,
            bottom: __INNER_HEIGHT / 3,
            width: __INNER_WIDTH,
            height: __INNER_HEIGHT / 3,
          },
          {
            x: 0,
            y: __INNER_HEIGHT / 3,
            left: 0,
            top: __INNER_HEIGHT / 3,
            right: __INNER_WIDTH,
            bottom: __INNER_HEIGHT,
            width: __INNER_WIDTH,
            height: (__INNER_HEIGHT * 2) / 3,
          },
        ] as DOMRect[];
      },
    } as IWindowWithSegments;
    const validateBoundsTopScreen = {
      left: 0,
      top: 0,
      right: __INNER_WIDTH,
      bottom: __INNER_HEIGHT / 3,
      width: __INNER_WIDTH,
      height: __INNER_HEIGHT / 3,
    };
    const validateBoundsBottomScreen = {
      left: 0,
      top: __INNER_HEIGHT / 3,
      right: __INNER_WIDTH,
      bottom: __INNER_HEIGHT,
      width: __INNER_WIDTH,
      height: (__INNER_HEIGHT * 2) / 3,
    };

    it('Gets the 0 values as bounds in vertical fold dual screen scenarios when null is passed as the target', () => {
      const target = null;

      const validateBounds = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
      };

      expect(getBoundsFromTargetWindow(target, topBottomDualScreenTargetWindow)).toStrictEqual(validateBounds);
    });

    it('Gets correct bounds in vertical fold dual screen scenarios when Elements are passed as targets', () => {
      const targetWithinTopScreen = {
        getBoundingClientRect: () =>
          ({
            x: 100,
            y: 100,
            left: 100,
            top: 100,
            right: 300,
            bottom: 300,
            width: 200,
            height: 200,
          } as DOMRect),
      } as Element;
      expect(getBoundsFromTargetWindow(targetWithinTopScreen, topBottomDualScreenTargetWindow)).toStrictEqual(
        validateBoundsTopScreen,
      );

      const targetWithinBottomScreen = {
        getBoundingClientRect: () =>
          ({
            x: 100,
            y: 800,
            left: 100,
            top: 800,
            right: 300,
            bottom: 1000,
            width: 200,
            height: 200,
          } as DOMRect),
      } as Element;
      expect(getBoundsFromTargetWindow(targetWithinBottomScreen, topBottomDualScreenTargetWindow)).toStrictEqual(
        validateBoundsBottomScreen,
      );

      const targetCrossingScreensWithCenterOnTopScreen = {
        getBoundingClientRect: () =>
          ({
            x: 500,
            y: 200,
            left: 500,
            top: 200,
            right: 700,
            bottom: 400,
            width: 200,
            height: 200,
          } as DOMRect),
      } as Element;
      expect(
        getBoundsFromTargetWindow(targetCrossingScreensWithCenterOnTopScreen, topBottomDualScreenTargetWindow),
      ).toStrictEqual(validateBoundsTopScreen);

      const targetCrossingScreensWithCenterOnBottomScreen = {
        getBoundingClientRect: () =>
          ({
            x: 600,
            y: 300,
            left: 600,
            top: 300,
            right: 800,
            bottom: 500,
            width: 200,
            height: 200,
          } as DOMRect),
      } as Element;
      expect(
        getBoundsFromTargetWindow(targetCrossingScreensWithCenterOnBottomScreen, topBottomDualScreenTargetWindow),
      ).toStrictEqual(validateBoundsBottomScreen);
    });

    it('Gets correct bounds in vertical fold dual screen scenarios when MouseEvents are passed as targets', () => {
      const targetWithinTopScreen = {
        x: 150,
        y: 150,
      } as MouseEvent;
      expect(getBoundsFromTargetWindow(targetWithinTopScreen, topBottomDualScreenTargetWindow)).toStrictEqual(
        validateBoundsTopScreen,
      );

      const targetWithinBottomScreen = {
        x: 1000,
        y: 1000,
      } as MouseEvent;
      expect(getBoundsFromTargetWindow(targetWithinBottomScreen, topBottomDualScreenTargetWindow)).toStrictEqual(
        validateBoundsBottomScreen,
      );
    });

    it('Gets correct bounds in vertical fold dual screen scenarios when Points are passed as targets', () => {
      const targetWithinTopScreen: Point = {
        left: 150,
        top: 150,
      };
      expect(getBoundsFromTargetWindow(targetWithinTopScreen, topBottomDualScreenTargetWindow)).toStrictEqual(
        validateBoundsTopScreen,
      );

      const targetWithinBottomScreen: Point = {
        left: 1000,
        top: 1000,
      };
      expect(getBoundsFromTargetWindow(targetWithinBottomScreen, topBottomDualScreenTargetWindow)).toStrictEqual(
        validateBoundsBottomScreen,
      );
    });
  });
});
