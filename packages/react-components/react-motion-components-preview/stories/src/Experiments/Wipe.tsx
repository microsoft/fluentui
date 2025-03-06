import {
  PresenceMotionFn,
  motionTokens,
  AtomMotion,
  createPresenceComponent,
} from '../../../../react-components/src/index';
import { fadeAtom } from '../../../library/src/atoms/fade-atom';
import { diagonalWipeKeyframes } from './ExperimentsWipe.stories';

// TODO: define wipe by angle?
// TODO: allow wipe-out to go forward rather than backward
const wipeKeyframes = () => {
  return { diagonal: diagonalWipeKeyframes() };
};

type WipeRuntimeParams = {
  enterDuration?: number;
  exitDuration?: number;
  enterEasing?: string;
  exitEasing?: string;
  animateOpacity?: boolean;
};

// Create a Wipe presence motion component that moves the element in a wipe path,
// from a starting radius to a target radius, and from a starting angle to a target angle.
const wipePresenceFn: PresenceMotionFn<WipeRuntimeParams> = ({
  enterDuration = 500,
  exitDuration = enterDuration,
  // enterEasing = motionTokens.curveDecelerateMin,
  enterEasing = motionTokens.curveDecelerateMin,
  exitEasing = motionTokens.curveAccelerateMin,
  animateOpacity = true,
}: WipeRuntimeParams) => {
  const keyframes = wipeKeyframes().diagonal;

  // create the enter and exit atoms
  const enterAtoms: AtomMotion[] = [
    {
      keyframes,
      duration: enterDuration,
      easing: enterEasing,
      // fill: 'forwards',
    },
  ];
  if (animateOpacity) {
    enterAtoms.push(fadeAtom({ direction: 'enter', duration: enterDuration, easing: enterEasing }));
  }
  const exitAtoms: AtomMotion[] = [
    {
      // keyframes: [...keyframes].reverse(),
      keyframes: diagonalWipeKeyframes({ reverse: true }),
      duration: exitDuration,
      easing: exitEasing,
      // fill: 'forwards',
    },
  ];
  // TODO: fix element disappearing when exiting
  if (animateOpacity) {
    exitAtoms.push(fadeAtom({ direction: 'exit', duration: exitDuration, easing: exitEasing }));
  }

  return {
    enter: enterAtoms,
    exit: exitAtoms,
  };
};

export const Wipe = createPresenceComponent(wipePresenceFn);
