import { tokens } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';
import { ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE } from '@fluentui/react-aria';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { ListboxSlots, ListboxState } from './Listbox.types';

export const listboxClassNames: SlotClassNames<ListboxSlots> = {
  root: 'fui-Listbox',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground1,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '160px',
    overflowY: 'auto',
    outline: `1px solid ${tokens.colorTransparentStroke}`,
    padding: tokens.spacingHorizontalXS,
    rowGap: tokens.spacingHorizontalXXS,
  },

  standaloneRoot: {
    [`&:not(:focus) [${ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE}]::after`]: {
      display: 'none',
    },
  },
});

/**
 * Apply styling to the Listbox slots based on the state
 */
export const useListboxStyles_unstable = (state: ListboxState): ListboxState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    listboxClassNames.root,
    styles.root,
    state.standalone && styles.standaloneRoot,
    state.root.className,
  );

  return state;
};
