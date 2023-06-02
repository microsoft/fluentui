import { makeStyles, mergeClasses } from '@griffel/react';
import type { DrawerOverlaySlots, DrawerOverlayState } from './DrawerOverlay.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { getDrawerBaseClassNames, useDrawerBaseStyles } from '../../util/useDrawerBaseStyles.styles';

export const drawerOverlayClassNames: SlotClassNames<DrawerOverlaySlots> = {
  root: 'fui-DrawerOverlay',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    transitionProperty: 'transform',
    willChange: 'transform',
  },

  /* Positioning */
  left: {
    transform: 'translate3D(calc(var(--fui-Drawer--size) * -1), 0, 0)',
  },
  right: {
    transform: 'translate3D(calc(var(--fui-Drawer--size) * 1), 0, 0)',
  },

  /* Mounted */
  mounted: {
    transform: 'translate3D(0, 0, 0)',
  },
});

/**
 * Apply styling to the DrawerOverlay slots based on the state
 */
export const useDrawerOverlayStyles_unstable = (state: DrawerOverlayState): DrawerOverlayState => {
  const baseStyles = useDrawerBaseStyles();
  const styles = useStyles();

  state.root.className = mergeClasses(
    drawerOverlayClassNames.root,
    baseStyles.root,
    styles.root,
    getDrawerBaseClassNames(state, baseStyles),
    state.position && styles[state.position],
    state.mounted && styles.mounted,
    state.root.className,
  );

  return state;
};
