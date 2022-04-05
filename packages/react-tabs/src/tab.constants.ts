// TODO: Constants prefixed with pending should be replaced with design tokens
// These values were taken from the design token superset figma

import { tokens } from '@fluentui/react-theme';

export const pendingContentSizeTokens = {
  // Only body sizes are defined here currently
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

export const pendingSpacingTokens = {
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

export const pendingAnimationDurationTokens = {
  ultraFast: '50ms',
  faster: '100ms',
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '400ms',
  ultraSlow: '500ms',
};

export const pendingAnimationEasingTokens = {
  accelerateMax: 'cubic-bezier(1,0,1,1)',
  accelerateMid: 'cubic-bezier(0.7,0,1,0.5)',
  accelerateMin: 'cubic-bezier(0.8,0,1,1)',
  declerateMax: 'cubic-bezier(0,0,0,1)',
  decelerateMid: 'cubic-bezier(0.1,0.9,0.2,1)',
  decelarateMin: 'cubic-bezier(0.33,0,0.1,1)',
  maxEasyEase: 'cubic-bezier(0.8,0,0.1,1)',
  easyEase: 'cubic-bezier(0.33,0,0.67,1)',
  linear: 'cubic-bezier(0,0,1,1)',
};

/**
 * Provides shared values between tab style hooks
 * useTabStyles
 * useTabAnimatedIndicator
 */
export const tabIndicatorPadding = {
  mediumHorizontal: pendingSpacingTokens.m,
  mediumVertical: pendingSpacingTokens.s,
  smallHorizontal: pendingSpacingTokens.sNudge,
  smallVertical: pendingSpacingTokens.xs,
};

export const tabIndicatorStrokeWidths = {
  mediumHorizontal: tokens.strokeWidthThicker,
  mediumVertical: tokens.strokeWidthThicker,
  smallHorizontal: tokens.strokeWidthThick,
  smallVertical: tokens.strokeWidthThicker,
};
