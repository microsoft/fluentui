import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { menuItemClassName } from '../MenuItem/useMenuItemStyles';
import type { MenuSplitGroupState } from './MenuSplitGroup.types';

export const menuSplitGroupClassName = 'fui-MenuSplitGroup';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: theme => ({
    display: 'flex',
    [`& > .${menuItemClassName}:nth-child(1)`]: {
      width: '100%',
    },
    [`& > .${menuItemClassName}:nth-child(2)`]: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      paddingLeft: 0,
      marginLeft: 'auto',
      ':before': {
        content: '""',
        width: theme.strokeWidthThin,
        height: '24px',
        backgroundColor: theme.colorNeutralStroke1,
      },
    },
  }),
});

/**
 * Apply styling to the MenuSplitGroup slots based on the state
 */
export const useMenuSplitGroupStyles = (state: MenuSplitGroupState): MenuSplitGroupState => {
  const styles = useStyles();
  state.root.className = mergeClasses(menuSplitGroupClassName, styles.root, state.root.className);
  return state;
};
