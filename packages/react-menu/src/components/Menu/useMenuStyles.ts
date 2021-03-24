import { ax, makeStyles } from '@fluentui/react-make-styles';
import { MenuState } from './Menu.types';

const useStyles = makeStyles({
  root: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    minWidth: '128px',
    minHeight: '48px',
    maxWidth: '300px',
    width: 'fit-content',
    boxShadow: `${theme.alias.shadow.shadow16}`,
    paddingTop: '4px',
    paddingBottom: '4px',
  }),
});

/**
 * Apply styling to the Menu slots based on the state
 * {@docCategory Menu }
 */
export const useMenuStyles = (state: MenuState): MenuState => {
  const styles = useStyles();
  state.menuPopup.className = ax(styles.root, state.menuPopup.className);
  return state;
};
