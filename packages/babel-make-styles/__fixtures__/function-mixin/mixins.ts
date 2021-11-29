import { MakeStylesStyle, MakeStylesStyleRule } from '@fluentui/make-styles';
import { Theme } from '@fluentui/react-theme';

export const createMixin = (rule: MakeStylesStyle): MakeStylesStyleRule<Theme> => {
  return theme => ({
    color: theme.colorBrandBackground,
    ...rule,
  });
};
