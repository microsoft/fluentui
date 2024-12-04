import { AtomMotion } from '@fluentui/react-motion/src/types';
import type { CollapseOrientation } from './collapse-types';

// ----- SIZE -----

const sizeValuesForOrientation = (orientation: CollapseOrientation, element: Element) => {
  const sizeName = orientation === 'horizontal' ? 'maxWidth' : 'maxHeight';
  const overflowName = orientation === 'horizontal' ? 'overflowX' : 'overflowY';
  const measuredSize = orientation === 'horizontal' ? element.scrollWidth : element.scrollHeight;
  const toSize = `${measuredSize}px`;
  return { sizeName, overflowName, toSize };
};

export const sizeEnterAtom = ({
  orientation,
  duration,
  easing,
  element,
  fromSize = '0',
}: {
  orientation: CollapseOrientation;
  duration: number;
  easing: string;
  element: HTMLElement;
  fromSize?: string;
}): AtomMotion => {
  const { sizeName, overflowName, toSize } = sizeValuesForOrientation(orientation, element);

  return {
    keyframes: [
      { [sizeName]: fromSize, [overflowName]: 'hidden' },
      { [sizeName]: toSize, offset: 0.9999, [overflowName]: 'hidden' },
      { [sizeName]: 'unset', [overflowName]: 'unset' },
    ],
    duration,
    easing,
  };
};

export const sizeExitAtom = ({
  orientation,
  duration,
  easing,
  element,
  delay = 0,
  fromSize = '0',
}: {
  orientation: CollapseOrientation;
  duration: number;
  easing: string;
  element: HTMLElement;
  delay?: number;
  fromSize?: string;
}): AtomMotion => {
  const { sizeName, overflowName, toSize } = sizeValuesForOrientation(orientation, element);

  return {
    keyframes: [
      { [sizeName]: toSize, [overflowName]: 'hidden' },
      { [sizeName]: fromSize, [overflowName]: 'hidden' },
    ],
    duration,
    easing,
    fill: 'both',
    delay,
  };
};

// ----- WHITESPACE -----

// Whitespace animation includes padding and margin.
const whitespaceValuesForOrientation = (orientation: CollapseOrientation) => {
  const paddingStart = orientation === 'horizontal' ? 'paddingLeft' : 'paddingTop';
  const paddingEnd = orientation === 'horizontal' ? 'paddingRight' : 'paddingBottom';

  const marginStart = orientation === 'horizontal' ? 'marginLeft' : 'marginTop';
  const marginEnd = orientation === 'horizontal' ? 'marginRight' : 'marginBottom';
  return { paddingStart, paddingEnd, marginStart, marginEnd };
};

// Because a height of zero does not eliminate padding or margin,
// we will create keyframes to animate them to zero.
export const whitespaceEnterAtom = ({
  orientation,
  duration,
  easing,
}: {
  orientation: CollapseOrientation;
  duration: number;
  easing: string;
}): AtomMotion => {
  const { paddingStart, paddingEnd, marginStart, marginEnd } = whitespaceValuesForOrientation(orientation);
  return {
    // Animate from whitespace of zero to the current whitespace, by omitting the ending keyframe.
    keyframes: [{ [paddingStart]: '0', [paddingEnd]: '0', [marginStart]: '0', [marginEnd]: '0', offset: 0 }],
    duration,
    easing,
  };
};

export const whitespaceExitAtom = ({
  orientation,
  duration,
  easing,
  delay = 0,
}: {
  orientation: CollapseOrientation;
  duration: number;
  easing: string;
  delay?: number;
}): AtomMotion => {
  const { paddingStart, paddingEnd, marginStart, marginEnd } = whitespaceValuesForOrientation(orientation);
  return {
    // Animate from the current whitespace to whitespace of zero, by using offset 1 and omitting the starting keyframe.
    keyframes: [{ [paddingStart]: '0', [paddingEnd]: '0', [marginStart]: '0', [marginEnd]: '0', offset: 1 }],
    duration,
    easing,
    fill: 'forwards',
    delay,
  };
};

// ----- OPACITY -----

export const opacityEnterAtom = ({
  duration,
  easing,
  delay = 0,
  fromOpacity = 0,
  toOpacity = 1,
}: {
  duration: number;
  easing: string;
  delay?: number;
  fromOpacity?: number;
  toOpacity?: number;
}): AtomMotion => ({
  keyframes: [{ opacity: fromOpacity }, { opacity: toOpacity }],
  duration,
  easing,
  delay,
  fill: 'both',
});

export const opacityExitAtom = ({
  duration,
  easing,
  fromOpacity = 0,
  toOpacity = 1,
}: {
  duration: number;
  easing: string;
  fromOpacity?: number;
  toOpacity?: number;
}): AtomMotion => ({
  keyframes: [{ opacity: toOpacity }, { opacity: fromOpacity }],
  duration,
  easing,
});
