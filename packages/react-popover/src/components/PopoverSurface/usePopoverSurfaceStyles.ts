import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { createArrowHeightStyles, createArrowStyles } from '@fluentui/react-positioning';
import { tokens } from '@fluentui/react-theme';
import type { PopoverSize } from '../Popover/Popover.types';
import type { PopoverSurfaceSlots, PopoverSurfaceState } from './PopoverSurface.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @deprecated Use `popoverSurfaceClassNames.root` instead.
 */
export const popoverSurfaceClassName = 'fui-PopoverSurface';
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
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow16,
    ...shorthands.borderRadius('4px'),
    ...shorthands.border('1px', 'solid', tokens.colorTransparentStroke),
  },

  inverted: {
    // TODO: neutral background inverted missing from superset and theme
    backgroundColor: tokens.colorNeutralForeground1,
    color: tokens.colorNeutralForegroundInverted,
  },

  brand: {
    backgroundColor: tokens.colorBrandBackground,
    // TODO: clarify with designers what foreground color should be with brand background,
    color: tokens.colorNeutralForegroundInverted,
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
