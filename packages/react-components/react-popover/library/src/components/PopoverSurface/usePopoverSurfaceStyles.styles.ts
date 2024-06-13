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
    color: `var(--ctrl-token-PopoverSurface-1473, var(--semantic-token-PopoverSurface-1474, ${tokens.colorNeutralForeground1}))`,
    backgroundColor: `var(--ctrl-token-PopoverSurface-1475, var(--semantic-token-PopoverSurface-1476, ${tokens.colorNeutralBackground1}))`,
    boxShadow: `var(--ctrl-token-PopoverSurface-1477, var(--semantic-token-PopoverSurface-1478, ${tokens.shadow16}))`,
    borderRadius: `var(--ctrl-token-PopoverSurface-1479, var(--semantic-token-PopoverSurface-1480, ${tokens.borderRadiusMedium}))`,
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
    backgroundColor: `var(--ctrl-token-PopoverSurface-1481, var(--semantic-token-PopoverSurface-1482, ${tokens.colorNeutralBackgroundStatic}))`,
    color: `var(--ctrl-token-PopoverSurface-1483, var(--semantic-token-PopoverSurface-1484, ${tokens.colorNeutralForegroundStaticInverted}))`,
  },

  brand: {
    backgroundColor: `var(--ctrl-token-PopoverSurface-1485, var(--semantic-token-PopoverSurface-1486, ${tokens.colorBrandBackground}))`,
    color: `var(--ctrl-token-PopoverSurface-1487, var(--semantic-token-PopoverSurface-1488, ${tokens.colorNeutralForegroundOnBrand}))`,
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
