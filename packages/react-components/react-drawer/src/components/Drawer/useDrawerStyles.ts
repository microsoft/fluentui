import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DrawerSlots, DrawerState } from './Drawer.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const drawerClassNames: SlotClassNames<DrawerSlots> = {
  root: 'fui-Drawer',
  dialog: 'fui-Drawer__dialog',
  dialogSurface: 'fui-Drawer__dialogSurface',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    ...shorthands.padding('16px'),
    ...shorthands.borderRadius(0),
    ...shorthands.border(0),

    boxSizing: 'border-box',
    width: '320px',
    height: 'auto',
    top: 0,
    bottom: 0,

    opacity: 0,

    transitionDuration: '200ms',
    transitionTimingFunction: 'ease-out',
    transitionProperty: 'margin-left, margin-right, opacity',
  },

  leftDrawer: {
    left: 0,
    right: 'auto',
    marginLeft: '-320px',
  },

  rightDrawer: {
    right: 0,
    left: 'auto',
    marginRight: '-320px',
  },

  visible: {
    marginLeft: 0,
    marginRight: 0,
    opacity: 1,
  },

  persistent: {
    position: 'relative',
    alignItems: 'stretch',
    justifyContent: 'stretch',
  },

  persistentLeft: {
    ...shorthands.borderRight('1px', 'solid', tokens.colorNeutralBackground3),
  },

  persistentRight: {
    ...shorthands.borderLeft('1px', 'solid', tokens.colorNeutralBackground3),
  },

  temporary: {
    position: 'fixed',
  },
});

function getPersistentClasses(state: DrawerState, styles: ReturnType<typeof useStyles>) {
  const classes = [styles.persistent];

  if (state.position === 'left') {
    classes.push(styles.persistentLeft);
  }

  if (state.position === 'right') {
    classes.push(styles.persistentRight);
  }

  return mergeClasses(...classes);
}

/**
 * Apply styling to the Drawer slots based on the state
 */
export const useDrawerStyles_unstable = (state: DrawerState): DrawerState => {
  const styles = useStyles();

  const baseClasses = [
    drawerClassNames.root,
    styles.root,
    state.position === 'left' ? styles.leftDrawer : styles.rightDrawer,
  ];

  if (state.isVisible) {
    baseClasses.push(styles.visible);
  }

  if (state.type === 'persistent') {
    state.root.className = mergeClasses(...baseClasses, getPersistentClasses(state, styles), state.root.className);
  } else {
    state.dialogSurface.className = mergeClasses(...baseClasses, styles.temporary, state.root.className);
  }

  return state;
};
