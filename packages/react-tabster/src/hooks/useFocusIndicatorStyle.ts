import { makeStyles } from '@fluentui/react-make-styles';
import { useIsNavigatingWithKeyboard } from './useIsNavigatingWithKeyboard';

const useStyles = makeStyles({
  outline: theme => ({
    ':focus': {
      outline: `solid 1px ${theme.alias.color.neutral.neutralForeground1}`,
    },
  }),
});

/**
 * Returns className for focus indicator if user is using keyboard navigation
 * otherwise returns an empty string
 */
export function useFocusIndicatorStyle(): string {
  const isNavigatingWithKeyboard = useIsNavigatingWithKeyboard();
  const styles = useStyles();
  return isNavigatingWithKeyboard ? styles.outline : '';
}
