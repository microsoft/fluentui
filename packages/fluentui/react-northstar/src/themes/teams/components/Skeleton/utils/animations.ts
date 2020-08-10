import { pulse, wave } from './keyframes';
import { ICSSInJSStyle } from '@fluentui/styles';
import { skeletonLineClassName } from '../../../../../components/Skeleton/SkeletonLine';
import { skeletonShapeClassName } from '../../../../../components/Skeleton/SkeletonShape';

const waveStyles = (primaryColor: string, secondoryColor: string) => ({
  position: 'static',
  overflow: 'hidden',
  animationDuration: '2s',
  animationName: wave,
  animationIterationCount: 'infinite',
  backgroundColor: '#FFFFFF',
  backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondoryColor} 15%, ${primaryColor})`,
  backgroundSize: '1200px 100%',
});

const pulseStyles = {
  animationName: pulse,
  animationDuration: '1.5s',
  animationIterationCount: 'infinite',
};

export const getAnimations = (primaryColor: string, secondoryColor: string): Record<string, ICSSInJSStyle> => ({
  pulse: {
    [`& .${skeletonLineClassName}`]: pulseStyles,
    [`& .${skeletonShapeClassName}`]: pulseStyles,
  },
  wave: {
    [`& .${skeletonLineClassName}`]: waveStyles(primaryColor, secondoryColor),
    [`& .${skeletonShapeClassName}`]: waveStyles(primaryColor, secondoryColor),
  },
});
