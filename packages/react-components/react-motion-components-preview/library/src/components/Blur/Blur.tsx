import { AtomMotion, createPresenceComponent, motionTokens, PresenceMotionFn } from '@fluentui/react-motion';
import { fadeAtom } from '../../atoms/fade-atom';

type BlurRuntimeParams = {
  /** The radius of pixels to blend into the blur. A length string, defaulting to '20px'. */
  radius?: string;
  /** The duration of the animation in milliseconds. */
  enterDuration?: number;
  exitDuration?: number;
  enterEasing?: string;
  exitEasing?: string;
  /** Whether to animate the opacity. Defaults to `true`. */
  animateOpacity?: boolean;
};

const blurPresenceFn: PresenceMotionFn<BlurRuntimeParams> = ({
  // element,
  radius = '20px',
  enterDuration = 500,
  exitDuration = enterDuration,
  enterEasing = motionTokens.curveDecelerateMin,
  exitEasing = motionTokens.curveAccelerateMin,
  animateOpacity = true,
}: BlurRuntimeParams) => {
  const enterAtoms: AtomMotion[] = [
    {
      keyframes: [{ filter: `blur(${radius})` }, { filter: 'blur(0px)' }],
      duration: enterDuration,
      easing: enterEasing,
    },
  ];
  if (animateOpacity) {
    enterAtoms.push(fadeAtom({ direction: 'enter', duration: enterDuration, easing: enterEasing }));
  }

  const exitAtoms: AtomMotion[] = [
    {
      keyframes: [{ filter: 'blur(0px)' }, { filter: `blur(${radius})` }],
      duration: exitDuration,
      easing: exitEasing,
    },
  ];
  if (animateOpacity) {
    exitAtoms.push(fadeAtom({ direction: 'exit', duration: exitDuration, easing: exitEasing }));
  }

  return {
    enter: enterAtoms,
    exit: exitAtoms,
  };
};

// Create a motion component to blur content in and out
export const Blur = createPresenceComponent(blurPresenceFn);
