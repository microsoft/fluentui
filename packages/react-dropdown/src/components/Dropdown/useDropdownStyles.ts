import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { DropdownState } from './Dropdown.types';

const useStyles = makeStyles({
  root: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    minWidth: '128px',
    minHeight: '48px',
    maxWidth: '300px',
    width: 'max-content',
    boxShadow: `${theme.alias.shadow.shadow16}`,
    paddingTop: '4px',
    paddingBottom: '4px',
  }),
  disabled: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralBackgroundDisabled,
    color: theme.alias.color.neutral.neutralForegroundDisabled,
  }),
});

/**
 * Apply styling to the Dropdown slots based on the state
 * {@docCategory Dropdown }
 */
export const useDropdownStyles = (state: DropdownState): DropdownState => {
  const styles = useStyles();
  state.className = mergeClasses(
    styles.root,
    state.disabled && styles.disabled,
    // state.activeItem && styles.active,
    state.className,
  );
  return state;
};
