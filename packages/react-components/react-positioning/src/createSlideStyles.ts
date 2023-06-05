import { tokens } from '@fluentui/react-theme';
import type { GriffelStyle } from '@griffel/react';

/**
 * Creates animation styles so that positioned elements slide in from the main axis
 * @param mainAxis - distance than the element sides for
 * @returns Griffel styles to spread to a slot
 */
export function createSlideStyles(mainAxis: number): GriffelStyle {
  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };

  return {
    animationComposition: 'accumulate',
    animationDuration: tokens.durationSlower,
    animationTimingFunction: tokens.curveDecelerateMid,
    '@media(prefers-reduced-motion)': {
      '&[data-popper-placement]': {
        animationDuration: '.001s',
        animationName: fadeIn,
      },
    },
    '@supports not (animation-composition: accumulate)': {
      '&[data-popper-placement]': {
        animationName: fadeIn,
      },
    },
    '&[data-popper-placement^="top"]': {
      animationName: [
        fadeIn,
        {
          from: {
            transform: `translate(0px, ${mainAxis}px)`,
          },
          to: {},
        },
      ],
    },
    '&[data-popper-placement^="right"]': {
      animationName: [
        fadeIn,
        {
          from: {
            transform: `translate(-${mainAxis}px, 0px)`,
          },
        },
      ],
    },
    '&[data-popper-placement^="bottom"]': {
      animationName: [
        fadeIn,
        {
          from: {
            transform: `translate(0, -${mainAxis}px)`,
          },
        },
      ],
    },
    '&[data-popper-placement^="left"]': {
      animationName: [
        fadeIn,
        {
          from: {
            transform: `translate(${mainAxis}px, 0px)`,
          },
        },
      ],
    },
    // FIXME: remove casting https://github.com/microsoft/griffel/issues/378
  } as GriffelStyle;
}
