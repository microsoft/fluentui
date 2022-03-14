import { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { SelectSlots, SelectState } from './Select.types';

/**
 * @deprecated Use `selectClassNames.root` instead.
 */
export const selectClassName = 'fui-Select';
export const selectClassNames: SlotClassNames<SelectSlots> = {
  root: 'fui-Select',
  select: 'fui-Select__select',
  icon: 'fui-Select__icon',
};

const useStyles = makeStyles({
  wrapper: {
    // TODO: add styles
  },
  select: {
    // TODO: add styles
  },
  selectDisabled: {
    // TODO: add styles
  },
});

/**
 * Apply styling to the Select slots based on the state
 */
export const useSelectStyles_unstable = (state: SelectState): SelectState => {
  const disabled = state.select.disabled;
  const selectStyles = useStyles();

  state.root.className = mergeClasses(selectClassNames.root, selectStyles.wrapper, state.root.className);

  state.select.className = mergeClasses(
    selectClassNames.select,
    selectStyles.select,
    disabled && selectStyles.selectDisabled,
    state.select.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(selectClassNames.icon, state.icon.className);
  }

  return state;
};
