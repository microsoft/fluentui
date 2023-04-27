import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DrawerSlots, DrawerState } from './Drawer.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const drawerClassNames: SlotClassNames<DrawerSlots> = {
  root: 'fui-Drawer',
};

/**
 * CSS variable names used internally for uniform styling in Drawer.
 */
export const drawerCSSVars = {
  size: '--fui-Drawer--size',
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
    width: `var(${drawerCSSVars.size})`,
    maxWidth: 'calc(100vw - 48px)',
    height: 'auto',
    top: 0,
    bottom: 0,
    backgroundColor: tokens.colorNeutralBackground1,
  },

  leftDrawer: {
    left: 0,
    right: 'auto',
  },

  rightDrawer: {
    right: 0,
    left: 'auto',
  },

  overlay: {
    position: 'fixed',
  },

  inline: {
    position: 'relative',
    alignItems: 'stretch',
    justifyContent: 'stretch',
  },

  inlineSeparatorLeft: {
    ...shorthands.borderRight('1px', 'solid', tokens.colorNeutralBackground3),
  },

  inlineSeparatorRight: {
    ...shorthands.borderLeft('1px', 'solid', tokens.colorNeutralBackground3),
  },

  sizeSmall: {
    [drawerCSSVars.size]: '320px',
  },
  sizeMedium: {
    [drawerCSSVars.size]: '592px',
  },
  sizeLarge: {
    [drawerCSSVars.size]: '940px',
  },
  sizeFull: {
    [drawerCSSVars.size]: '100vw',
    maxWidth: '100vw',
  },
});

function getInlineClasses(state: DrawerState, styles: ReturnType<typeof useStyles>) {
  const classes = [styles.inline];

  if (state.separator) {
    if (state.position === 'left') {
      classes.push(styles.inlineSeparatorLeft);
    }

    if (state.position === 'right') {
      classes.push(styles.inlineSeparatorRight);
    }
  }

  return mergeClasses(...classes);
}

const sizeMap = {
  small: 'sizeSmall',
  medium: 'sizeMedium',
  large: 'sizeLarge',
  full: 'sizeFull',
} as const;

/**
 * Apply styling to the Drawer slots based on the state
 */
export const useDrawerStyles_unstable = (state: DrawerState): DrawerState => {
  const styles = useStyles();

  const baseClasses = [
    drawerClassNames.root,
    styles.root,
    state.position === 'left' ? styles.leftDrawer : styles.rightDrawer,
    typeof state.size !== 'number' && styles[sizeMap[state.size]],
  ];

  if (state.type === 'overlay') {
    state.root.className = mergeClasses(...baseClasses, styles.overlay, state.root.className);
  }

  if (state.type === 'inline') {
    state.root.className = mergeClasses(...baseClasses, getInlineClasses(state, styles), state.root.className);
  }

  return state;
};
