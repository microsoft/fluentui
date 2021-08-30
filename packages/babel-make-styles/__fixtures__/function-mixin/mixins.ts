import { MakeStyles, MakeStylesStyleRule } from '@fluentui/make-styles';
import { Theme } from '@fluentui/react-theme';

export const createMixin = (rule: MakeStyles): MakeStylesStyleRule<Theme> => {
  return theme => ({
    color: theme.alias.color.neutral.brandBackground,
    ...rule,
  });
};
