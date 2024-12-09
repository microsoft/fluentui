import { tokens } from '@fluentui/react-theme';
import type { GriffelStyle } from '@griffel/react';
import { DATA_POSITIONING_PLACEMENT } from './constants';

/**
 * Creates animation styles so that positioned elements slide in from the main axis
 * @param mainAxis - distance than the element sides for
 * @returns Griffel styles to spread to a slot
 */
export function createSlideStyles(mainAxis: number): GriffelStyle {
  const slideDistanceVarX = '--fui-positioning-slide-distance-x';
  const slideDistanceVarY = '--fui-positioning-slide-distance-y';

  return {
    // The slide amount is relative
    animationComposition: 'accumulate',
    animationDuration: tokens.durationSlower,
    animationTimingFunction: tokens.curveDecelerateMid,
    [slideDistanceVarX]: `0px`,
    [slideDistanceVarY]: `${mainAxis}px`,
    [`&[${DATA_POSITIONING_PLACEMENT}^=right]`]: {
      [slideDistanceVarX]: `-${mainAxis}px`,
      [slideDistanceVarY]: '0px',
    },

    [`&[${DATA_POSITIONING_PLACEMENT}^=bottom]`]: {
      [slideDistanceVarX]: '0px',
      [slideDistanceVarY]: `-${mainAxis}px`,
    },

    [`&[${DATA_POSITIONING_PLACEMENT}^=left]`]: {
      [slideDistanceVarX]: `${mainAxis}px`,
      [slideDistanceVarY]: '0px',
    },

    animationName: [
      {
        from: {
          transform: `translate(var(${slideDistanceVarX}), var(${slideDistanceVarY}))`,
        },
        to: {},
      },
    ],

    // Note: at-rules have more specificity in Griffel
    '@media(prefers-reduced-motion)': {
      [`&[${DATA_POSITIONING_PLACEMENT}]`]: {
        // Omit the slide animation
        animationName: {},
      },
    },

    // Tested in Firefox 79
    '@supports not (animation-composition: accumulate)': {
      [`&[${DATA_POSITIONING_PLACEMENT}]`]: {
        // Omit the slide animation
        animationName: {},
      },
    },
  };
}
