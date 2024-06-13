import { tokens } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';
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
    backgroundColor: `var(--ctrl-token-Listbox-985, var(--semantic-token-Listbox-986, ${tokens.colorNeutralBackground1}))`,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '160px',
    overflowY: 'auto',
    outline: `1px solid ${tokens.colorTransparentStroke}`,
    padding: `var(--ctrl-token-Listbox-987, var(--semantic-token-Listbox-988, ${tokens.spacingHorizontalXS}))`,
    rowGap: `var(--ctrl-token-Listbox-989, var(--semantic-token-Listbox-990, ${tokens.spacingHorizontalXXS}))`,
  },
});

/**
 * Apply styling to the Listbox slots based on the state
 */
export const useListboxStyles_unstable = (state: ListboxState): ListboxState => {
  const styles = useStyles();
  state.root.className = mergeClasses(listboxClassNames.root, styles.root, state.root.className);

  return state;
};
