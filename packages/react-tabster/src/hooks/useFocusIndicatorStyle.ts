import type { Theme } from '@fluentui/react-theme';
import type { MakeStylesStyleRule } from '@fluentui/make-styles';
import { KEYBOARD_NAV_SELECTOR } from '../symbols';

const defaultStyleRule = (theme: Theme) => ({
  outline: `solid 1px ${theme.colorNeutralForeground1}`,
});

export interface CreateFocusIndicatorStyleRuleOptions {
  selector?: 'focus' | 'focus-within';
}

const defaultOptions: CreateFocusIndicatorStyleRuleOptions = {
  selector: 'focus',
};

export const createFocusIndicatorStyleRule = (
  rule: MakeStylesStyleRule<Theme> = defaultStyleRule,
  options: CreateFocusIndicatorStyleRuleOptions = defaultOptions,
): MakeStylesStyleRule<Theme> => theme => ({
  ':focus-visible': {
    outline: 'none',
  },
  [`${KEYBOARD_NAV_SELECTOR} :${options.selector || defaultOptions.selector}`]:
    typeof rule === 'function' ? rule(theme) : rule,
});
