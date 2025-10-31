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
};
