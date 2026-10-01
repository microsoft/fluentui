import type { AtomMotion, PresenceDirection } from '@fluentui/react-motion';
import type { CollapseOrientation } from './collapse-types';

// ----- SIZE -----

const sizePropertyNamesForOrientation = (orientation: CollapseOrientation) => {
  const sizeName = orientation === 'horizontal' ? 'maxWidth' : 'maxHeight';
  const overflowName = orientation === 'horizontal' ? 'overflowX' : 'overflowY';
  return { sizeName, overflowName };
};

interface SizeAtomParams {
  orientation: CollapseOrientation;
  duration: number;
  easing: string;
  from: string;
  to: string;
  delay?: number;
}

export const sizeEnterAtom = ({ orientation, duration, easing, from, to, delay = 0 }: SizeAtomParams): AtomMotion => {
  const { sizeName, overflowName } = sizePropertyNamesForOrientation(orientation);

  return {
    keyframes: [
      { [sizeName]: from, [overflowName]: 'hidden' },
      { [sizeName]: to, offset: 0.9999, [overflowName]: 'hidden' },
      { [sizeName]: 'unset', [overflowName]: 'unset' },
    ],
    duration,
    easing,
    delay,
    fill: 'both',
  };
};

export const sizeExitAtom = ({ orientation, duration, easing, from, to, delay = 0 }: SizeAtomParams): AtomMotion => {
  const { sizeName, overflowName } = sizePropertyNamesForOrientation(orientation);

  return {
    keyframes: [
      { [sizeName]: from, [overflowName]: 'hidden' },
      { [sizeName]: to, [overflowName]: 'hidden' },
    ],
    duration,
    easing,
    delay,
    fill: 'both',
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

  return {
    keyframes,
    duration,
    easing,
    delay,
    fill: 'both',
  };
};
