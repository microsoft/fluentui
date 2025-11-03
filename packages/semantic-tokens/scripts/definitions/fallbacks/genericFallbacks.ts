import { tokens } from '@fluentui/tokens';

export type GenericFallbacks = {
  [key: string]: {
    fluent?: string;
    primitive?: string;
  };
};

export const genericFallbacks: GenericFallbacks = {
  cornerCircular: {
    fluent: tokens.borderRadiusCircular,
  },
  cornerSquare: {
    fluent: tokens.borderRadiusNone,
  },
  lightnessHover: {
    fluent: '-5',
  },
  lightnessPressed: {
    fluent: '-10',
  },
  surfaceNeutralDefault: {
    primitive: 'colorNeutral8',
  },
  surfaceNeutralSubtle: {
    primitive: 'colorNeutral7',
  },
  backgroundNeutralLoud: {
    primitive: 'colorNeutral2',
  },
  backgroundNeutralSoft: {
    primitive: 'colorNeutral5',
  },
  backgroundNeutralSubtle: {
    primitive: 'colorNeutral6',
  },
  backgroundBrandLoud: {
    primitive: 'colorBrand2',
  },
  backgroundBrandSoft: {
    primitive: 'colorBrand5',
  },
  backgroundBrandSubtle: {
    primitive: 'colorBrand6',
  },
  backgroundDangerLoud: {
    primitive: 'colorDanger2',
  },
  backgroundDangerSoft: {
    primitive: 'colorDanger5',
  },
  backgroundDangerSubtle: {
    primitive: 'colorDanger6',
  },
  backgroundWarningLoud: {
    primitive: 'colorWarning2',
  },
  backgroundWarningSoft: {
    primitive: 'colorWarning5',
  },
  backgroundWarningSubtle: {
    primitive: 'colorWarning6',
  },
  backgroundSuccessLoud: {
    primitive: 'colorSuccess2',
  },
  backgroundSuccessSoft: {
    primitive: 'colorSuccess5',
  },
  backgroundSuccessSubtle: {
    primitive: 'colorSuccess6',
  },
  backgroundNeutralHeavy: {
    primitive: 'colorNeutral0',
  },
  backgroundNeutralTransparent: {
    fluent: tokens.colorTransparentBackground,
    primitive: 'colorNeutralAlpha',
  },
  backgroundDisabled: {
    primitive: 'colorNeutral5',
  },
  strokeNeutralLoud: {
    primitive: 'colorNeutral0',
  },
  strokeNeutralSubtle: {
    primitive: 'colorNeutral4',
  },
  strokeNeutralOnloud: {
    primitive: 'colorNeutral8',
  },
  strokeBrandLoud: {
    primitive: 'colorBrand2',
  },
  strokeBrandSubtle: {
    primitive: 'colorBrand4',
  },
  strokeBrandOnloud: {
    primitive: 'colorNeutral8',
  },
  strokeDangerLoud: {
    primitive: 'colorDanger2',
  },
  strokeDangerSubtle: {
    primitive: 'colorDanger4',
  },
  strokeDangerOnloud: {
    primitive: 'colorDanger8',
  },
  strokeWarningLoud: {
    primitive: 'colorWarning2',
  },
  strokeWarningSubtle: {
    primitive: 'colorWarning4',
  },
  strokeWarningOnloud: {
    primitive: 'colorNeutral8',
  },
  strokeSuccessLoud: {
    primitive: 'colorSuccess2',
  },
  strokeSuccessSubtle: {
    primitive: 'colorSuccess4',
  },
  strokeSuccessOnloud: {
    primitive: 'colorNeutral8',
  },
  strokeNeutralSoft: {
    primitive: 'colorNeutral3',
  },
  strokeNeutralTransparent: {
    primitive: 'colorNeutralAlpha',
  },
  strokeDisabled: {
    primitive: 'colorNeutral4',
  },
  foregroundBrandPrimary: {
    primitive: 'colorBrand1',
  },
  foregroundBrandOnloud: {
    primitive: 'colorNeutral8',
  },
  foregroundDangerPrimary: {
    primitive: 'colorDanger1',
  },
  foregroundDangerOnloud: {
    primitive: 'colorNeutral8',
  },
  foregroundWarningPrimary: {
    primitive: 'colorWarning1',
  },
  foregroundWarningOnloud: {
    primitive: 'colorNeutral8',
  },
  foregroundSuccessPrimary: {
    primitive: 'colorSuccess1',
  },
  foregroundSuccessOnloud: {
    primitive: 'colorNeutral8',
  },
  foregroundNeutralPrimary: {
    primitive: 'colorNeutral0',
  },
  foregroundNeutralSecondary: {
    primitive: 'colorNeutral1',
  },
  foregroundNeutralOnneutral: {
    primitive: 'colorNeutral0',
  },
  foregroundDisabled: {
    primitive: 'colorNeutral3',
  },
};
