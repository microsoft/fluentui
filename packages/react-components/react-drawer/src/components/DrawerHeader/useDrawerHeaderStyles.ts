import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DrawerHeaderSlots, DrawerHeaderState } from './DrawerHeader.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const drawerHeaderClassNames: SlotClassNames<DrawerHeaderSlots & { content: string }> = {
  root: 'fui-DrawerHeader',
  navigation: 'fui-DrawerHeader__navigation',
  header: 'fui-DrawerHeader__header',
  content: 'fui-DrawerHeader__content',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    ...shorthands.padding(tokens.spacingVerticalXXL, tokens.spacingHorizontalXXL, tokens.spacingVerticalS),
    ...shorthands.gap(tokens.spacingHorizontalS),

    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
  },

  navigation: {
    ...shorthands.margin(`calc(${tokens.spacingHorizontalXS} * -1)`, `calc(${tokens.spacingHorizontalL} * -1)`),
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

/**
 * Apply styling to the DrawerHeader slots based on the state
 */
export const useDrawerHeaderStyles_unstable = (state: DrawerHeaderState): DrawerHeaderState => {
  const styles = useStyles();

  state.root.className = mergeClasses(drawerHeaderClassNames.root, styles.root, state.root.className);

  if (state.navigation) {
    state.navigation.className = mergeClasses(
      drawerHeaderClassNames.navigation,
      styles.navigation,
      state.navigation.className,
    );
  }

  if (state.content) {
    state.content.className = mergeClasses(drawerHeaderClassNames.content, state.content.className);
  }

  if (state.header) {
    state.header.className = mergeClasses(drawerHeaderClassNames.header, styles.header, state.header.className);
  }

  return state;
};
