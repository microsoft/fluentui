import 'what-input';
import { makeStyles } from '@fluentui/react-make-styles';
import { KEYBOARD_NAV_SELECTOR } from '../symbols';

const useStyles = makeStyles({
  focus: theme => ({
    outline: 'none',
    [`:global(${KEYBOARD_NAV_SELECTOR}) :focus`]: {
      outline: `solid 1px ${theme.alias.color.neutral.neutralForeground1}`,
    },
  }),
});

/**
 * Returns className for focus indicator if user is using keyboard navigation
 * otherwise returns an empty string
 */
export const useFocusIndicatorStyle = (): string => useStyles().focus;
