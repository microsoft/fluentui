import { tokens } from '@fluentui/react-theme';
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

// TODO(sharing) use theme values once available
const horizontalSpacing = {
  xxs: '2px',
  xs: '4px',
  sNudge: '6px',
  s: '8px',
  mNudge: '10px',
  m: '12px',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    boxShadow: `${tokens.shadow16}`,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: '160px',
    ...shorthands.padding(horizontalSpacing.xs),
    rowGap: horizontalSpacing.xxs,
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
