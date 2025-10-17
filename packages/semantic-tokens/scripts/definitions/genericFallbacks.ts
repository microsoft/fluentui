import { tokens } from '@fluentui/tokens';

export type GenericFallbacks = {
  [key: string]: {
    fluent?: string;
    primitive?: string;
  };
};

export const genericFallbacks: GenericFallbacks = {
  focusStrokeInner: {
    fluent: tokens.colorStrokeFocus2,
  },
  focusStrokeOuter: {
    fluent: tokens.colorTransparentStroke,
  },
  focusStrokewidthInner: {
    fluent: tokens.strokeWidthThin,
  },
  focusStrokewidthOuter: {
    fluent: tokens.strokeWidthThick,
  },
  cornerCircular: {
    fluent: tokens.borderRadiusCircular,
  },
  cornerSquare: {
    fluent: tokens.borderRadiusNone,
  },
  focusStrokeOnbrandHover: {
    fluent: tokens.colorStrokeFocus2,
  },
  focusStrokeOnbrand: {
    fluent: tokens.colorNeutralForegroundOnBrand,
  },
};
