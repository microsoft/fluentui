import { tokens } from '@fluentui/react-theme';
import type { GriffelStyle } from '@griffel/react';
import { DATA_POSITIONING_PLACEMENT } from './constants';

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
    // Note: at-rules have more specificity in Griffel
    '@media(prefers-reduced-motion)': {
      [`&[${DATA_POSITIONING_PLACEMENT}]`]: {
        animationDuration: '.001s',
        animationName: fadeIn,
      },
    },

    // Tested in Firefox 79
    '@supports not (animation-composition: accumulate)': {
      [`&[${DATA_POSITIONING_PLACEMENT}]`]: {
        animationName: fadeIn,
      },
    },

    [`&[${DATA_POSITIONING_PLACEMENT}^=top]`]: {
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

    [`&[${DATA_POSITIONING_PLACEMENT}^=right]`]: {
      animationName: [
        fadeIn,
        {
          from: {
            transform: `translate(-${mainAxis}px, 0px)`,
          },
        },
      ],
    },

    [`&[${DATA_POSITIONING_PLACEMENT}^=bottom]`]: {
      animationName: [
        fadeIn,
        {
          from: {
            transform: `translate(0, -${mainAxis}px)`,
          },
        },
      ],
    },

    [`&[${DATA_POSITIONING_PLACEMENT}^=left]`]: {
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
