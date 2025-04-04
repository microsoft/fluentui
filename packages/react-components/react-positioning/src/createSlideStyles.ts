import { tokens } from '@fluentui/react-theme';
import type { GriffelStyle } from '@griffel/react';
import { DATA_POSITIONING_PLACEMENT } from './constants';

/**
 * Creates animation styles so that positioned elements slide in from the main axis
 * @param mainAxis - distance than the element sides for
 * @returns Griffel styles to spread to a slot
 */
export function createSlideStyles(mainAxis: number): GriffelStyle {
  // With 'accumulate' animation composition, these opacity keyframes are added onto the default opacity of 1.
  const fadeIn = {
    from: {
      opacity: -1, // becomes opacity: 0
    },
    to: {
      opacity: 0, // becomes opacity: 1
    },
  };

  const slideDistanceVarX = '--fui-positioning-slide-distance-x';
  const slideDistanceVarY = '--fui-positioning-slide-distance-y';

  return {
    // NOTE: there was a previous attempt to give fadeIn a separate composition mode:
    //   animationComposition: 'replace, accumulate',
    // but somehow this was linked to a performance regression observed in Teams (bug #4255933)
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
      fadeIn,
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
        animationDuration: '1ms',
        animationName: fadeIn,
      },
    },

    // Tested in Firefox 79
    '@supports not (animation-composition: accumulate)': {
      [`&[${DATA_POSITIONING_PLACEMENT}]`]: {
        animationName: fadeIn,
      },
    },
  };
}
