import { motionTokens, createPresenceComponent, PresenceMotionFn } from '@fluentui/react-motion';
import { fadeAtom } from '../../atoms/fade-atom';
import { blurAtom } from '../../atoms/blur-atom';
import { BlurParams } from './blur-types';

/** Define a presence motion for blur in/out */
const blurPresenceFn: PresenceMotionFn<BlurParams> = ({
  fromRadius: fromRadius = '20px',
  duration = motionTokens.durationSlow,
  easing = motionTokens.curveDecelerateMin,
  exitDuration = duration,
  exitEasing = motionTokens.curveAccelerateMin,
  animateOpacity = true,
}) => {
  const enterAtoms = [blurAtom({ direction: 'enter', duration, easing, fromRadius: fromRadius })];
  const exitAtoms = [
    blurAtom({
      direction: 'exit',
      duration: exitDuration,
      easing: exitEasing,
      fromRadius,
    }),
  ];

  // Only add fade atoms if animateOpacity is true.
  if (animateOpacity) {
    enterAtoms.push(fadeAtom({ direction: 'enter', duration, easing }));
    exitAtoms.push(fadeAtom({ direction: 'exit', duration: exitDuration, easing: exitEasing }));
  }

  return {
    enter: enterAtoms,
    exit: exitAtoms,
  };
};

/** A React component that applies blur in/out transitions to its children. */
export const Blur = createPresenceComponent(blurPresenceFn);
