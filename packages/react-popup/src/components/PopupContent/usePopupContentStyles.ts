import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { PopupContentState } from './PopupContent.types';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    boxShadow: theme.alias.shadow.shadow16,
  }),
});

/**
 * Apply styling to the PopupContent slots based on the state
 */
export const usePopupContentStyles = (state: PopupContentState): PopupContentState => {
  const styles = useStyles();
  state.className = mergeClasses(styles.root, state.className);

  return state;
};
