import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
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
});

/**
 * Apply styling to the Dropdown slots based on the state
 * {@docCategory Dropdown }
 */
export const useDropdownStyles = (state: DropdownState): DropdownState => {
  const styles = useStyles();
  state.dropdownPopup.className = mergeClasses(styles.root, state.dropdownPopup.className);
  return state;
};
