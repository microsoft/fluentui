import { GriffelStyle } from '@griffel/core';
import { tokens } from '@fluentui/react-theme';

export const createMixin = (rule: GriffelStyle): GriffelStyle => ({
  color: tokens.colorBrandBackground,
  ...rule,
});
