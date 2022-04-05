import { pulse, wave } from './keyframes';
import { ICSSInJSStyle } from '@fluentui/styles';
import { skeletonLineClassName } from '../../../../../components/Skeleton/SkeletonLine';
import { skeletonShapeClassName } from '../../../../../components/Skeleton/SkeletonShape';
import { skeletonButtonClassName } from '../../../../../components/Skeleton/SkeletonButton';
import { skeletonInputClassName } from '../../../../../components/Skeleton/SkeletonInput';
import { skeletonAvatarClassName } from '../../../../../components/Skeleton/SkeletonAvatar';
import { skeletonTextClassName } from '../../../../../components/Skeleton/SkeletonText';

const waveStyles = (primaryColor: string, secondoryColor: string) => ({
  position: 'static',
  overflow: 'hidden',
  animationDuration: '4.5s',
  animationName: wave,
  animationIterationCount: 'infinite',
  backgroundColor: '#FFFFFF',
  animationTimingFunction: 'linear',
  backgroundImage: `linear-gradient(to right, ${secondoryColor} 0%, ${primaryColor} 20%, ${secondoryColor} 40%)`,
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
    [`& .${skeletonButtonClassName}`]: pulseStyles,
    [`& .${skeletonAvatarClassName}`]: pulseStyles,
    [`& .${skeletonInputClassName}`]: pulseStyles,
    [`& .${skeletonTextClassName}`]: pulseStyles,
  },
  wave: {
    [`& .${skeletonLineClassName}`]: waveStyles(primaryColor, secondoryColor),
    [`& .${skeletonShapeClassName}`]: waveStyles(primaryColor, secondoryColor),
    [`& .${skeletonButtonClassName}`]: waveStyles(primaryColor, secondoryColor),
    [`& .${skeletonAvatarClassName}`]: waveStyles(primaryColor, secondoryColor),
    [`& .${skeletonInputClassName}`]: waveStyles(primaryColor, secondoryColor),
    [`& .${skeletonTextClassName}`]: waveStyles(primaryColor, secondoryColor),
  },
});
