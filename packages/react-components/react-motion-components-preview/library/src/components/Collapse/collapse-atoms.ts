import { AtomMotion, PresenceDirection } from '@fluentui/react-motion';
import { CollapseOrientation } from './collapse-types';

// ----- SIZE -----

const sizeValuesForOrientation = (orientation: CollapseOrientation, element: Element) => {
  const sizeName = orientation === 'horizontal' ? 'maxWidth' : 'maxHeight';
  const overflowName = orientation === 'horizontal' ? 'overflowX' : 'overflowY';
  const measuredSize = orientation === 'horizontal' ? element.scrollWidth : element.scrollHeight;
  const toSize = `${measuredSize}px`;
  return { sizeName, overflowName, toSize };
};

interface SizeEnterAtomParams {
  orientation: CollapseOrientation;
  duration: number;
  easing: string;
  element: HTMLElement;
  fromSize?: string;
}

export const sizeEnterAtom = ({
  orientation,
  duration,
  easing,
  element,
  fromSize = '0',
}: SizeEnterAtomParams): AtomMotion => {
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

interface SizeExitAtomParams extends SizeEnterAtomParams {
  delay?: number;
}

export const sizeExitAtom = ({
  orientation,
  duration,
  easing,
  element,
  delay = 0,
  fromSize = '0',
}: SizeExitAtomParams): AtomMotion => {
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
  // horizontal whitespace collapse
  if (orientation === 'horizontal') {
    return {
      paddingStart: 'paddingInlineStart',
      paddingEnd: 'paddingInlineEnd',
      marginStart: 'marginInlineStart',
      marginEnd: 'marginInlineEnd',
    };
  }
  // vertical whitespace collapse
  return {
    paddingStart: 'paddingBlockStart',
    paddingEnd: 'paddingBlockEnd',
    marginStart: 'marginBlockStart',
    marginEnd: 'marginBlockEnd',
  };
};

interface WhitespaceAtomParams {
  direction: PresenceDirection;
  orientation: CollapseOrientation;
  duration: number;
  easing: string;
  delay?: number;
}

/**
 * A collapse animates an element's height to zero,
 but the zero height does not eliminate padding or margin in the box model.
 So here we generate keyframes to animate those whitespace properties to zero.
 */
export const whitespaceAtom = ({
  direction,
  orientation,
  duration,
  easing,
  delay = 0,
}: WhitespaceAtomParams): AtomMotion => {
  const { paddingStart, paddingEnd, marginStart, marginEnd } = whitespaceValuesForOrientation(orientation);
  // The keyframe with zero whitespace is at the start for enter and at the end for exit.
  const offset = direction === 'enter' ? 0 : 1;
  const keyframes = [{ [paddingStart]: '0', [paddingEnd]: '0', [marginStart]: '0', [marginEnd]: '0', offset }];

  const atom: AtomMotion = {
    keyframes,
    duration,
    easing,
    delay,
  };
  if (direction === 'exit') {
    atom.fill = 'forwards';
  }
  return atom;
};
