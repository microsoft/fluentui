import { tokens } from '@fluentui/react-theme';

export const navItemTokens = {
  defaultDrawerWidth: 260,
  indicatorOffset: 16,
  indicatorWidth: 4,
  indicatorHeight: 20,
  backgroundColor: tokens.colorNeutralBackground4,
  backgroundColorHover: tokens.colorNeutralBackground4Hover,
  backgroundColorPressed: tokens.colorNeutralBackground4Pressed,
  animationTokens: {
    animationDuration: tokens.durationFaster,
    animationFillMode: 'both',
    animationTimingFunction: tokens.curveLinear,
  },
  transitionTokens: {
    transitionDuration: tokens.durationFaster,
    transitionTimingFunction: tokens.curveLinear,
    transitionProperty: 'background',
  },
};
