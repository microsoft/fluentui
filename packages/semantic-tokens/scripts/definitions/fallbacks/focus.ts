import { tokens } from '@fluentui/tokens';
import { GroupFallback } from './fallbacks.types';

export const focusFallbacks: GroupFallback = {
  groupFocusOuterStroke: {
    fluent: tokens.colorTransparentStroke,
  },
  groupFocusInnerStroke: {
    fluent: tokens.colorStrokeFocus2,
  },
  groupFocusOnbrandStrokeHover: {
    fluent: tokens.colorStrokeFocus2,
  },
  groupFocusOnbrandStroke: {
    fluent: tokens.colorNeutralForegroundOnBrand,
  },
  groupFocusOuterStrokewidth: {
    fluent: tokens.strokeWidthThick,
  },
  groupFocusInnerStrokewidth: {
    fluent: tokens.strokeWidthThin,
  },
};
