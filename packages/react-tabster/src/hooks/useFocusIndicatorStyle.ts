import { makeStyles } from '@fluentui/react-make-styles';
import { KEYBOARD_NAV_ATTRIBUTE } from '../symbols';

const useStyles = makeStyles({
  focus: theme => ({
    outline: 'none',
    [`:global([${KEYBOARD_NAV_ATTRIBUTE}="true"])`]: {
      ':focus': {
        outline: `solid 1px red`,
      },
    },
  }),
});

/**
 * Returns className for focus indicator if user is using keyboard navigation
 * otherwise returns an empty string
 */
export const useFocusIndicatorStyle = (): string => useStyles().focus;
