import { pulse, wave } from './keyframes';
import { ICSSInJSStyle } from '@fluentui/styles';

export const getAnimations = (backgroundColor: string): Record<string, ICSSInJSStyle> => ({
  pulse: {
    '> span': {
      animationName: pulse,
      animationDuration: '1.5s',
      animationIterationCount: 'infinite',
    },
  },
  wave: {
    position: 'relative',
    overflow: 'hidden',
    '::after': {
      animationName: wave,
      animationDuration: '2s',
      clipPat: 'contents',
      animationDelay: '0.5s',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
      background: `linear-gradient(280deg, transparent, ${backgroundColor}, transparent)`,
      content: '""',
      position: 'absolute',
      transform: 'translateX(-100%)',
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    },
  },

  // '> span': {
  //   animationName: wave,
  //   animationDuration: '1.85s',
  //   animationIterationCount: 'infinite',
  //   background: `linear-gradient(90deg, ${colorScheme.default.background4} 25%, ${colorScheme.default.background} 37%, ${colorScheme.default.background4} 63% )`,
  //   backgroundSize: '400% 100%',
  // },
});
