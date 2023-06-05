import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { createArrowHeightStyles, createArrowStyles, createSlideStyles } from '@fluentui/react-positioning';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { PopoverSize } from '../Popover/Popover.types';
import type { PopoverSurfaceSlots, PopoverSurfaceState } from './PopoverSurface.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const popoverSurfaceClassNames: SlotClassNames<PopoverSurfaceSlots> = {
  root: 'fui-PopoverSurface',
};

export const arrowHeights: Record<PopoverSize, number> = {
  small: 6,
  medium: 8,
  large: 8,
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow16,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.border('1px', 'solid', tokens.colorTransparentStroke),
    ...typographyStyles.body1,
  },

  slideAndFadeIn: createSlideStyles(10),

  enter: {
    animationComposition: 'accumulate',
    animationDuration: '367ms',
    animationTimingFunction: 'cubic-bezier(.1,.9,.2,1)',

    '&[data-popper-placement^="top"]': {
      animationName: {
        from: {
          transform: `translate(0px, 10px)`,
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      },
    },
    '&[data-popper-placement^="right"]': {
      animationName: {
        from: {
          transform: `translate(-10px, 0px)`,
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      },
    },
    '&[data-popper-placement^="bottom"]': {
      animationName: {
        from: {
          transform: `translate(0, -10px)`,
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      },
    },
    '&[data-popper-placement^="left"]': {
      animationName: {
        from: {
          transform: `translate(10px, 0px)`,
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      },
    },
  },

  inverted: {
    backgroundColor: tokens.colorNeutralBackgroundStatic,
    color: tokens.colorNeutralForegroundStaticInverted,
  },

  brand: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },

  smallPadding: {
    ...shorthands.padding('12px'),
  },

  mediumPadding: {
    ...shorthands.padding('16px'),
  },

  largePadding: {
    ...shorthands.padding('20px'),
  },

  smallArrow: createArrowHeightStyles(arrowHeights.small),
  mediumLargeArrow: createArrowHeightStyles(arrowHeights.medium),
  arrow: createArrowStyles({ arrowHeight: undefined }),
});

/**
 * Apply styling to the PopoverSurface slots based on the state
 */
export const usePopoverSurfaceStyles_unstable = (state: PopoverSurfaceState): PopoverSurfaceState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    popoverSurfaceClassNames.root,
    styles.root,
    styles.slideAndFadeIn,
    state.size === 'small' && styles.smallPadding,
    state.size === 'medium' && styles.mediumPadding,
    state.size === 'large' && styles.largePadding,
    state.appearance === 'inverted' && styles.inverted,
    state.appearance === 'brand' && styles.brand,
    state.root.className,
  );

  state.arrowClassName = mergeClasses(
    styles.arrow,
    state.size === 'small' ? styles.smallArrow : styles.mediumLargeArrow,
  );

  return state;
};
