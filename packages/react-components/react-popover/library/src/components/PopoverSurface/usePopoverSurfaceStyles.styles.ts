import { makeStyles, mergeClasses } from '@griffel/react';
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
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorTransparentStroke}`,
    ...typographyStyles.body1,
    ...createSlideStyles(10),
  },

  inline: {
    // When rendering inline, the PopoverSurface will be rendered under relatively positioned elements such as Input.
    // This is due to the surface being positioned as absolute, therefore zIndex: 1 ensures that won't happen.
    zIndex: 1,
  },

  inverted: {
    backgroundColor: tokens.colorNeutralBackgroundStatic,
    color: tokens.colorNeutralForegroundStaticInverted,
  },

  brand: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },

  smallPadding: { padding: '12px' },

  mediumPadding: { padding: '16px' },

  largePadding: { padding: '20px' },

  smallArrow: createArrowHeightStyles(arrowHeights.small),
  mediumLargeArrow: createArrowHeightStyles(arrowHeights.medium),
  arrow: createArrowStyles({ arrowHeight: undefined }),
});

/**
 * Apply styling to the PopoverSurface slots based on the state
 */
export const usePopoverSurfaceStyles_unstable = (state: PopoverSurfaceState): PopoverSurfaceState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(
    popoverSurfaceClassNames.root,
    styles.root,
    state.inline && styles.inline,
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
