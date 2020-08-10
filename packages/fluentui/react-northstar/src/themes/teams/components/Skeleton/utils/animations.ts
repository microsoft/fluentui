import { pulse, wave } from './keyframes';
import { ICSSInJSStyle } from '@fluentui/styles';
import { skeletonLineClassName } from '../../../../../components/Skeleton/SkeletonLine';
import { skeletonShapeClassName } from '../../../../../components/Skeleton/SkeletonShape';

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
});
