import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { MenuPopoverState } from './MenuPopover.types';

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
    border: `1px solid ${theme.alias.color.neutral.strokeAccessible}`,
  }),
});

/**
 * Apply styling to the Menu slots based on the state
 * {@docCategory Menu }
 */
export const useMenuPopoverStyles = (state: MenuPopoverState): MenuPopoverState => {
  const styles = useStyles();
  state.className = mergeClasses(styles.root, state.className);
  return state;
};
