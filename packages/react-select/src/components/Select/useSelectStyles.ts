import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { SelectState } from './Select.types';

export const selectClassName = 'fui-Select';

const useStyles = makeStyles({
  wrapper: theme => ({
    // TODO: add styles
  }),
  select: theme => ({
    // TODO: add styles
  }),
  selectDisabled: theme => ({
    // TODO: add styles
  }),
});

/**
 * Apply styling to the Select slots based on the state
 */
export const useSelectStyles = (state: SelectState): SelectState => {
  const disabled = state.select.disabled;
  const selectStyles = useStyles();

  state.root.className = mergeClasses(selectClassName, selectStyles.wrapper, state.root.className);

  state.select.className = mergeClasses(
    selectStyles.select,
    disabled && selectStyles.selectDisabled,
    state.select.className,
  );

  return state;
};
