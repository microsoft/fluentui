import { makeStyles } from '@fluentui/react-make-styles';
import { KEYBOARD_NAV_FOCUS_SELECTOR } from '../symbols';
import { Theme } from '@fluentui/react-theme';
import type { MakeStylesStyleRule } from '@fluentui/make-styles';

export interface MakeFocusIndicatorStyleOptions {
  native?: boolean;
}

/**
 * Creates custom focus indicator style.
 */
export const makeFocusIndicatorStyle = (rule: MakeStylesStyleRule<Theme>, options?: MakeFocusIndicatorStyleOptions) => {
  const useStyle = makeStyles({
    style: theme => ({
      // Removes native outline style on focus-visible
      ':focus-visible': options?.native ? undefined : { outline: 'none' },
      [KEYBOARD_NAV_FOCUS_SELECTOR]: typeof rule === 'function' ? rule(theme) : rule,
    }),
  });

  return () => useStyle().style;
};

export const useFocusIndicatorStyle = makeFocusIndicatorStyle(
  theme => ({
    outline: `solid 1px ${theme.alias.color.neutral.neutralForeground1}`,
  }),
  { native: false },
);
