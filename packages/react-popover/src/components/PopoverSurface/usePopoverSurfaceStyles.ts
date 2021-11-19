import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createArrowStyles } from '@fluentui/react-positioning';
import type { PopoverSize } from '../Popover/Popover.types';
import type { PopoverSurfaceState } from './PopoverSurface.types';

export const popoverSurfaceClassName = 'fui-PopoverSurface';

export const arrowHeights: Record<PopoverSize, number> = {
  small: 6,
  medium: 8,
  large: 8,
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: theme => ({
    backgroundColor: theme.colorNeutralBackground1,
    boxShadow: theme.shadow16,
    borderRadius: '4px',
    border: `1px solid ${theme.colorTransparentStroke}`,
  }),

  inverted: theme => ({
    // TODO: neutral background inverted missing from superset and theme
    backgroundColor: theme.colorNeutralForeground1,
    color: theme.colorNeutralForegroundInverted,
  }),

  brand: theme => ({
    backgroundColor: theme.colorBrandBackground,
    // TODO: clarify with designers what foreground color should be with brand background,
    color: theme.colorNeutralForegroundInverted,
  }),

  smallPadding: () => ({
    padding: '12px',
  }),

  mediumPadding: () => ({
    padding: '16px',
  }),

  largePadding: () => ({
    padding: '20px',
  }),

  smallArrow: () => ({
    width: `${Math.SQRT2 * arrowHeights.small}px`,
    height: `${Math.SQRT2 * arrowHeights.small}px`,
  }),

  mediumLargeArrow: () => ({
    width: `${Math.SQRT2 * arrowHeights.medium}px`,
    height: `${Math.SQRT2 * arrowHeights.medium}px`,
  }),

  arrow: createArrowStyles(),
});

/**
 * Apply styling to the PopoverSurface slots based on the state
 */
export const usePopoverSurfaceStyles = (state: PopoverSurfaceState): PopoverSurfaceState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    popoverSurfaceClassName,
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
