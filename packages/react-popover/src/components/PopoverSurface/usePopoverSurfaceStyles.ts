import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { PopoverSize } from '../Popover/Popover.types';
import { PopoverSurfaceState } from './PopoverSurface.types';

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
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    boxShadow: theme.alias.shadow.shadow16,
    borderRadius: '4px',
  }),

  inverted: theme => ({
    // TODO: neutral background inverted missing from superset and theme
    backgroundColor: theme.global.palette.grey[16],
    color: theme.alias.color.neutral.neutralForegroundInverted,
  }),

  brand: theme => ({
    backgroundColor: theme.alias.color.neutral.brandBackground,
    // TODO: clarify with designers what foreground color should be with brand background,
    color: theme.alias.color.neutral.neutralForegroundInverted,
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

  // TODO dedupe these styles with tooltip
  arrow: theme => ({
    position: 'absolute',
    background: 'inherit',
    visibility: 'hidden',
    zIndex: -1,

    ':before': {
      content: '""',
      borderRadius: '4px',
      position: 'absolute',
      width: 'inherit',
      height: 'inherit',
      background: 'inherit',
      visibility: 'visible',
      borderBottomRightRadius: theme.global.borderRadius.small,
      transform: 'rotate(var(--angle)) translate(0, 50%) rotate(45deg)',
    },

    // Popper sets data-popper-placement on the root element, which is used to align the arrow
    ':global([data-popper-placement^="top"])': { bottom: 0, '--angle': '0' },
    ':global([data-popper-placement^="right"])': { left: 0, '--angle': '90deg' },
    ':global([data-popper-placement^="bottom"])': { top: 0, '--angle': '180deg' },
    ':global([data-popper-placement^="left"])': { right: 0, '--angle': '270deg' },
  }),
});

/**
 * Apply styling to the PopoverSurface slots based on the state
 */
export const usePopoverSurfaceStyles = (state: PopoverSurfaceState): PopoverSurfaceState => {
  const styles = useStyles();
  state.className = mergeClasses(
    styles.root,
    state.className,
    state.size === 'small' && styles.smallPadding,
    state.size === 'medium' && styles.mediumPadding,
    state.size === 'large' && styles.largePadding,
    state.inverted && styles.inverted,
    state.brand && styles.brand,
  );

  state.arrowClassName = mergeClasses(
    styles.arrow,
    state.size === 'small' ? styles.smallArrow : styles.mediumLargeArrow,
  );

  return state;
};
