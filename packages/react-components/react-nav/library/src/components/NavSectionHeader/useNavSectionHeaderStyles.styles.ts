import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavSectionHeaderSlots, NavSectionHeaderState } from './NavSectionHeader.types';
import { typographyStyles } from '@fluentui/react-theme';

export const navSectionHeaderClassNames: SlotClassNames<NavSectionHeaderSlots> = {
  root: 'fui-NavSectionHeader',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    marginInlineStart: `10px`,
    marginBlock: '8px',
    ...typographyStyles.caption1Strong,
  },
});

/**
 * Apply styling to the NavSectionHeader slots based on the state
 */
export const useNavSectionHeaderStyles_unstable = (state: NavSectionHeaderState): NavSectionHeaderState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(navSectionHeaderClassNames.root, styles.root, state.root.className);

  return state;
};
