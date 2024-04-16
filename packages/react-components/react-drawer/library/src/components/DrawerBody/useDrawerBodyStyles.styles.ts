import { makeResetStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';

import type { DrawerBodySlots, DrawerBodyState } from './DrawerBody.types';

export const drawerBodyClassNames: SlotClassNames<DrawerBodySlots> = {
  root: 'fui-DrawerBody',
};

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  margin: '-1px 0',
  padding: `1px ${tokens.spacingHorizontalXXL}`,
  overflow: 'auto',
  flex: 1,

  alignSelf: 'stretch',

  // A "good hack" to display top and bottom borders based on the scroll position
  backgroundImage: `linear-gradient(to top, ${tokens.colorNeutralBackground1}, ${tokens.colorNeutralBackground1}),
    linear-gradient(to top, ${tokens.colorNeutralBackground1}, ${tokens.colorNeutralBackground1}),
    linear-gradient(to top, ${tokens.colorNeutralStroke1}, ${tokens.colorNeutralBackground1}),
    linear-gradient(to bottom, ${tokens.colorNeutralStroke1}, ${tokens.colorNeutralBackground1})`,
  'background-position': 'bottom center, top center, bottom center, top center',
  backgroundRepeat: 'no-repeat',
  backgroundColor: tokens.colorNeutralBackground1,
  backgroundSize: '100% 2px, 100% 2px, 100% 1px, 100% 1px',
  backgroundAttachment: 'local, local, scroll, scroll',

  ':last-child': {
    paddingBottom: `calc(${tokens.spacingHorizontalXXL} + 1px)`,
  },

  ':first-child': {
    paddingTop: `calc(${tokens.spacingHorizontalXXL} + 1px)`,
  },
});

/**
 * Apply styling to the DrawerBody slots based on the state
 */
export const useDrawerBodyStyles_unstable = (state: DrawerBodyState): DrawerBodyState => {
  const styles = useStyles();

  state.root.className = mergeClasses(drawerBodyClassNames.root, styles, state.root.className);

  return state;
};
