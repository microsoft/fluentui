import type { Theme } from '@fluentui/react-theme';
import type { MakeStylesStyleRule } from '@fluentui/make-styles';
import { KEYBOARD_NAV_SELECTOR } from '../symbols';

const defaultStyleRule = (theme: Theme) => ({
  outline: `solid 1px ${theme.alias.color.neutral.neutralForeground1}`,
});

export const createFocusIndicatorStyleRule = (
  rule: MakeStylesStyleRule<Theme> = defaultStyleRule,
): MakeStylesStyleRule<Theme> => theme => ({
  ':focus-visible': {
    outline: 'none',
  },
  [KEYBOARD_NAV_SELECTOR]: typeof rule === 'function' ? rule(theme) : rule,
});
