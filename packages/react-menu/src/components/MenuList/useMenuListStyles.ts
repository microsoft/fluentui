import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import type { MenuListState } from './MenuList.types';

const useStyles = makeStyles({
  root: theme => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.global.strokeWidth.thick, // same gap as focus indicator thickness
  }),
});

/**
 * Apply styling to the Menu slots based on the state
 */
export const useMenuListStyles = (state: MenuListState): MenuListState => {
  const styles = useStyles();
  state.root.className = mergeClasses(styles.root, state.root.className);
  return state;
};
