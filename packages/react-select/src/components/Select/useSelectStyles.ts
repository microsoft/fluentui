import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { SelectState } from './Select.types';

const useStyles = makeStyles({
  wrapper: theme => ({
    boxSizing: 'border-box',
    '*, *:before, *:after': {
      boxSizing: 'border-box',
    },
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

  state.root.className = mergeClasses(selectStyles.wrapper, state.root.className);

  state.select.className = mergeClasses(
    selectStyles.select,
    disabled && selectStyles.selectDisabled,
    state.select.className,
  );

  return state;
};
