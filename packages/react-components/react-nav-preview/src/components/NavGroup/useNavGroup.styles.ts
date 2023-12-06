import type { NavGroupSlots, NavGroupState } from './NavGroup.types';

import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { typographyStyles } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';

export const navGroupClassNames: SlotClassNames<NavGroupSlots> = {
  root: 'fui-NavGroup',
  content: 'fui-NavGroup__content',
};

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  display: 'flex',
  ...typographyStyles.body1,
});

/**
 * Styles for the content slot (children)
 */
const useContentStyles = makeStyles({
  selected: {
    ...typographyStyles.body1Strong,
  },
});

/**
 * Apply styling to the Tab slots based on the state
 */
export const useNavGroupStyles_unstable = (state: NavGroupState): NavGroupState => {
  const rootStyles = useStyles();
  const contentStyles = useContentStyles();

  const { selected } = state;

  state.root.className = mergeClasses(
    navGroupClassNames.root,
    rootStyles,

    state.root.className,
  );

  state.content.className = mergeClasses(
    navGroupClassNames.content,
    selected && contentStyles.selected,
    state.content.className,
  );

  return state;
};
