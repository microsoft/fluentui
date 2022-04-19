import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { ListboxSlots, ListboxState } from './Listbox.types';

/**
 * @deprecated Use `listboxClassNames.root` instead.
 */
export const listboxClassName = 'fui-Listbox';
export const listboxClassNames: SlotClassNames<ListboxSlots> = {
  root: 'fui-Listbox',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  // TODO: add themed styles
  root: {
    boxShadow: '0px 0px 2px 0px #0000001F, 0px 8px 16px 0px #00000024',
    ...shorthands.borderRadius('4px'),
    backgroundColor: '#fff',
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
