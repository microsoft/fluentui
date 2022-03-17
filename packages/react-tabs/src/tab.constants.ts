// TODO: These constants should be replaced with design tokens
// The values were taken from the design token superset figma

import { tokens } from '@fluentui/react-theme';

export const tabContentSizes = {
  body1: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase300,
  },
  body1Strong: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase300,
  },
};

export const tabSpacingTokens = {
  none: '0',
  xxs: '2px',
  xs: '4px',
  sNudge: '6px',
  s: '8px',
  mNudge: '10px',
  m: '12px',
  l: '16px',
  xl: '20px',
  xxl: '24px',
  xxxl: '32px',
};

export const tabAnimationDurationTokens = {
  slow: '300ms',
};

export const tabAnimationEasingTokens = {
  easyEase: 'cubic-bezier(0.33,0,0.67,1)',
};
