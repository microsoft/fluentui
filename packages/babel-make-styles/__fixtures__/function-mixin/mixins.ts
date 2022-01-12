import { MakeStylesStyle } from '@fluentui/make-styles';
import { tokens } from '@fluentui/react-theme';

export const createMixin = (rule: MakeStylesStyle): MakeStylesStyle => ({
  color: tokens.colorBrandBackground,
  ...rule,
});
