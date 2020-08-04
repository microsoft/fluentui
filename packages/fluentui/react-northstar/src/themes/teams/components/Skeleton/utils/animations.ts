import { pulse, wave } from './keyframes';
import { ICSSInJSStyle } from '@fluentui/styles';
import { skeletonLineClassName } from 'src/components/Skeleton/SkeletonLine';
import { skeletonShapeClassName } from 'src/components/Skeleton/SkeletonShape';

const waveStyles = {
  position: 'static',
  overflow: 'hidden',
  animationDuration: '2s',
  animationName: wave,
  animationIterationCount: 'infinite',
  backgroundColor: '#FFFFFF',
  backgroundImage:
    'linear-gradient(to right, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.15) 15%, rgba(0, 0, 0, 0.08) 30%)',
  backgroundSize: '1200px 100%',
};

const pulseStyles = {
  animationName: pulse,
  animationDuration: '1.5s',
  animationIterationCount: 'infinite',
};

export const getAnimations = (backgroundColor: string): Record<string, ICSSInJSStyle> => ({
  pulse: {
    [`& .${skeletonLineClassName}`]: pulseStyles,
    [`& .${skeletonShapeClassName}`]: pulseStyles,
  },
  wave: {
    [`& .${skeletonLineClassName}`]: waveStyles,
    [`& .${skeletonShapeClassName}`]: waveStyles,
  },

  // '> span': {
  //   animationName: wave,
  //   animationDuration: '1.85s',
  //   animationIterationCount: 'infinite',
  //   background: `linear-gradient(90deg, ${colorScheme.default.background4} 25%, ${colorScheme.default.background} 37%, ${colorScheme.default.background4} 63% )`,
  //   backgroundSize: '400% 100%',
  // },
});
