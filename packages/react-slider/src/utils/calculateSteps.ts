import * as React from 'react';
import { clamp } from './clamp';

/**
 * Calculates the `step` position based off of a `Mouse` or `Touch` event relative to the size of the rail.
 */
export const calculateSteps = (
  ev: React.PointerEvent<HTMLDivElement>,
  railRef: React.RefObject<HTMLDivElement>,
  min: number,
  max: number,
  step: number,
  vertical: boolean,
  dir: 'ltr' | 'rtl',
): number => {
  const currentBounds = railRef?.current?.getBoundingClientRect();
  const sliderSize = (vertical ? currentBounds!.height : currentBounds!.width) || 0;
  let position;

  if (vertical) {
    position = currentBounds!.bottom;
  } else if (dir === 'rtl') {
    position = currentBounds!.right;
  } else {
    position = currentBounds!.left;
  }

  const totalSteps = (max - min) / step;
  const stepLength = sliderSize / totalSteps;
  const thumbPosition = vertical ? ev.clientY : ev.clientX;
  const distance = dir === 'rtl' || vertical ? position - thumbPosition : thumbPosition - position;

  return clamp(min + step * (distance / stepLength), min, max);
};
