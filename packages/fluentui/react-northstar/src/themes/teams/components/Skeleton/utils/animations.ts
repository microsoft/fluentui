import { pulse, wave } from './keyframes';
import { ICSSInJSStyle } from '@fluentui/styles';
import { skeletonLineClassName } from '../../../../../components/Skeleton/SkeletonLine';
import { skeletonShapeClassName } from '../../../../../components/Skeleton/SkeletonShape';
import { skeletonButtonClassName } from '../../../../../components/Skeleton/SkeletonButton';
import { skeletonInputClassName } from '../../../../../components/Skeleton/SkeletonInput';
import { skeletonAvatarClassName } from '../../../../../components/Skeleton/SkeletonAvatar';

const waveStyles = (primaryColor: string) => ({
  content: '""',
  animationDuration: '1.6s',
  animationName: wave,
  animationIterationCount: 'infinite',
  backgroundColor: 'black',
  animationTimingFunction: 'linear',
  background: `linear-gradient(90deg,transparent, ${primaryColor},transparent)`,
  position: 'absolute',
  transform: 'translateX(-100%)',
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
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
  },
  wave: {
    [`& .${skeletonLineClassName}`]: {
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: secondoryColor,
      ':after': waveStyles(primaryColor),
    },
    [`& .${skeletonShapeClassName}`]: {
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: secondoryColor,
      ':after': waveStyles(primaryColor),
    },
    [`& .${skeletonButtonClassName}`]: {
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: secondoryColor,
      ':after': waveStyles(primaryColor),
    },
    [`& .${skeletonAvatarClassName}`]: {
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: secondoryColor,
      ':after': waveStyles(primaryColor),
    },
    [`& .${skeletonInputClassName}`]: {
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: secondoryColor,
      ':after': waveStyles(primaryColor),
    },
  },
});
