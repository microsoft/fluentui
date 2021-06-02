import { Theme } from '@fluentui/react-theme';
import { makeStyles } from '@fluentui/react-make-styles';
import { MakeStylesStyleRule } from '@fluentui/make-styles';
import { KEYBOARD_NAV_SELECTOR } from '../symbols';

export const makeFocusIndicatorStyle = (rule: MakeStylesStyleRule<Theme>) => {
  const useStyles = makeStyles({
    focus: theme => ({
      ':focus-visible': {
        outline: 'none',
      },
      [KEYBOARD_NAV_SELECTOR]: typeof rule === 'function' ? rule(theme) : rule,
    }),
  });
  return () => useStyles().focus;
};

/**
 * Returns className for focus indicator if user is using keyboard navigation
 * otherwise returns an empty string
 */
export const useFocusIndicatorStyle = makeFocusIndicatorStyle(theme => ({
  outline: `solid 1px ${theme.alias.color.neutral.neutralForeground1}`,
}));
