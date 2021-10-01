import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import type { MenuPopoverState } from './MenuPopover.types';

const useStyles = makeStyles({
  root: theme => ({
    borderRadius: theme.borderRadiusMedium,
    backgroundColor: theme.colorNeutralBackground1,
    minWidth: '128px',
    maxWidth: '300px',
    width: 'max-content',
    boxShadow: `${theme.shadow16}`,
    padding: '4px',
    border: `1px solid ${theme.colorTransparentStroke}`,
  }),
});

/**
 * Apply styling to the Menu slots based on the state
 */
export const useMenuPopoverStyles = (state: MenuPopoverState): MenuPopoverState => {
  const styles = useStyles();
  state.root.className = mergeClasses(styles.root, state.root.className);
  return state;
};
