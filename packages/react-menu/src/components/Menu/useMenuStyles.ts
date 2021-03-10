import { makeStyles, ax } from '@fluentui/react-make-styles';
import { MenuState } from './Menu.types';

/**
 * Styles for the popup slot
 */
const useMenuPopupStyles = makeStyles<MenuState>([
  [
    null,
    theme => ({
      backgroundColor: theme.alias.color.neutral.neutralBackground1,
      minWidth: '128px',
      minHeight: '48px',
      maxWidth: '300px',
      width: 'fit-content',
      boxShadow: `${theme.alias.shadow.shadow16}`,
      paddingTop: '4px',
      paddingBottom: '4px',
    }),
  ],
]);

/**
 * Apply styling to the Menu slots based on the state
 * {@docCategory Menu }
 */
export const useMenuStyles = (state: MenuState): MenuState => {
  state.menuPopup.className = ax(useMenuPopupStyles(state), state.menuPopup.className);
  return state;
};
