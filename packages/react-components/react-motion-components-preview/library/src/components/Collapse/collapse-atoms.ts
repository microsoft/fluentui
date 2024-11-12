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

// Whitespace animation currently includes padding, but could be extended to handle margin.
const whitespaceValuesForOrientation = (orientation: CollapseOrientation) => {
  const paddingStart = orientation === 'horizontal' ? 'paddingLeft' : 'paddingTop';
  const paddingEnd = orientation === 'horizontal' ? 'paddingRight' : 'paddingBottom';
  return { paddingStart, paddingEnd };
};

// Because a height of zero does not eliminate padding,
// we will create keyframes to animate it to zero.
// TODO: consider collapsing margin, perhaps as an option.
export const whitespaceEnterAtom = ({
  orientation,
  duration,
  easing,
}: {
  orientation: CollapseOrientation;
  duration: number;
  easing: string;
}): AtomMotion => {
  const { paddingStart, paddingEnd } = whitespaceValuesForOrientation(orientation);
  return {
    keyframes: [{ [paddingStart]: '0', [paddingEnd]: '0', offset: 0 }],
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
  const { paddingStart, paddingEnd } = whitespaceValuesForOrientation(orientation);
  return {
    keyframes: [{ [paddingStart]: '0', [paddingEnd]: '0', offset: 1 }],
    duration,
    easing,
    fill: 'forwards',
    delay,
  };
};
