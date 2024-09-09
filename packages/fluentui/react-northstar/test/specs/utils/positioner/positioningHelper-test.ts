import type { Placement as PopperJsPlacement } from '@popperjs/core';

import { Alignment, OffsetFunction, Position } from 'src/utils/positioner';
import { applyRtlToOffset, getPlacement } from 'src/utils/positioner/positioningHelper';

type PositionTestInput = {
  align: Alignment;
  position: Position;
  expectedPlacement: PopperJsPlacement;
  rtl?: boolean;
};

describe('positioningHelper', () => {
  const testPositioningHelper = ({ align, position, expectedPlacement, rtl = false }: PositionTestInput) =>
    it(`positioningHelper ${position} position argument is transformed to ${expectedPlacement} Popper's placement`, () => {
      const actualPlacement = getPlacement(align, position, rtl);
      expect(actualPlacement).toEqual(expectedPlacement);
    });

  const testPositioningHelperInRtl = ({ align, position, expectedPlacement }: PositionTestInput & { rtl?: never }) =>
    testPositioningHelper({ align, position, expectedPlacement, rtl: true });

  describe('handles positioningHelper position argument correctly in ltr', () => {
    testPositioningHelper({ position: 'above', align: 'start', expectedPlacement: 'top-start' });
    testPositioningHelper({ position: 'above', align: 'center', expectedPlacement: 'top' });
    testPositioningHelper({ position: 'above', align: 'end', expectedPlacement: 'top-end' });
    testPositioningHelper({ position: 'below', align: 'start', expectedPlacement: 'bottom-start' });
    testPositioningHelper({ position: 'below', align: 'center', expectedPlacement: 'bottom' });
    testPositioningHelper({ position: 'below', align: 'end', expectedPlacement: 'bottom-end' });
    testPositioningHelper({ position: 'before', align: 'top', expectedPlacement: 'left-start' });
    testPositioningHelper({ position: 'before', align: 'center', expectedPlacement: 'left' });
    testPositioningHelper({ position: 'before', align: 'bottom', expectedPlacement: 'left-end' });
    testPositioningHelper({ position: 'after', align: 'top', expectedPlacement: 'right-start' });
    testPositioningHelper({ position: 'after', align: 'center', expectedPlacement: 'right' });
    testPositioningHelper({ position: 'after', align: 'bottom', expectedPlacement: 'right-end' });
  });

  describe('handles positioningHelper position argument correctly in rtl', () => {
    testPositioningHelperInRtl({ position: 'above', align: 'start', expectedPlacement: 'top-end' });
    testPositioningHelperInRtl({ position: 'above', align: 'center', expectedPlacement: 'top' });
    testPositioningHelperInRtl({ position: 'above', align: 'end', expectedPlacement: 'top-start' });
    testPositioningHelperInRtl({
      position: 'below',
      align: 'start',
      expectedPlacement: 'bottom-end',
    });
    testPositioningHelperInRtl({ position: 'below', align: 'center', expectedPlacement: 'bottom' });
    testPositioningHelperInRtl({
      position: 'below',
      align: 'end',
      expectedPlacement: 'bottom-start',
    });
    testPositioningHelperInRtl({
      position: 'before',
      align: 'top',
      expectedPlacement: 'right-start',
    });
    testPositioningHelperInRtl({ position: 'before', align: 'center', expectedPlacement: 'right' });
    testPositioningHelperInRtl({
      position: 'before',
      align: 'bottom',
      expectedPlacement: 'right-end',
    });
    testPositioningHelperInRtl({ position: 'after', align: 'top', expectedPlacement: 'left-start' });
    testPositioningHelperInRtl({ position: 'after', align: 'center', expectedPlacement: 'left' });
    testPositioningHelperInRtl({
      position: 'after',
      align: 'bottom',
      expectedPlacement: 'left-end',
    });
  });

  describe('positioningHelper offset argument transformed correctly in RTL', () => {
    it('flips an axis value RTL for an array', () => {
      expect(applyRtlToOffset([10, 10])).toEqual([-10, 10]);
    });

    it('flips an axis value RTL for a function', () => {
      const offsetFn: OffsetFunction = () => [10, 10];
      const flippedFn = applyRtlToOffset(offsetFn) as OffsetFunction;

      expect(flippedFn({} as any)).toEqual([-10, 10]);
    });
  });
});
