import type { PresenceMotionFn } from '@fluentui/react-motion';
import { motionTokens, createPresenceComponent, createPresenceComponentVariant } from '@fluentui/react-motion';
import { fadeIn, fadeOut } from '../../atoms/fade-atom';
import { slide } from '../../atoms/slide-atom';
import type { SlideParams } from './slide-types';

/**
 * Define a presence motion for slide in/out
 *
 * @param duration - Time (ms) for the enter transition (slide-in). Defaults to the `durationNormal` value (200 ms).
 * @param easing - Easing curve for the enter transition (slide-in). Defaults to the `curveDecelerateMid` value.
 * @param delay - Time (ms) to delay the enter transition. Defaults to 0.
 * @param exitDuration - Time (ms) for the exit transition (slide-out). Defaults to the `duration` param for symmetry.
 * @param exitEasing - Easing curve for the exit transition (slide-out). Defaults to the `curveAccelerateMid` value.
 * @param exitDelay - Time (ms) to delay the exit transition. Defaults to the `delay` param for symmetry.
 * @param fromX - X translate before entering. Defaults to `'0px'`.
 * @param fromY - Y translate before entering. Defaults to `'0px'`.
 * @param inX - X translate for the in pose. Defaults to `'0px'`.
 * @param inY - Y translate for the in pose. Defaults to `'0px'`.
 * @param toX - X translate after exiting. Defaults to `fromX` when no destination is authored.
 * @param toY - Y translate after exiting. Defaults to `fromY` when no destination is authored.
 * @param animateOpacity - Whether to animate the opacity. Defaults to `true`.
 */
const slidePresenceFn: PresenceMotionFn<SlideParams> = ({
  duration = motionTokens.durationNormal,
  easing = motionTokens.curveDecelerateMid,
  delay = 0,
  exitDuration = duration,
  exitEasing = motionTokens.curveAccelerateMid,
  exitDelay = delay,
  fromX = '0px',
  fromY = '0px',
  inX = '0px',
  inY = '0px',
  toX = fromX,
  toY = fromY,
  animateOpacity = true,
}: SlideParams) => {
  const fromPose = { x: fromX, y: fromY };
  const inPose = { x: inX, y: inY };
  const toPose = { x: toX, y: toY };
  const enterAtoms = [slide({ from: fromPose, to: inPose, duration, easing, delay })];
  const exitAtoms = [
    slide({
      from: inPose,
      to: toPose,
      duration: exitDuration,
      easing: exitEasing,
      delay: exitDelay,
    }),
  ];

  // Only add fade atoms if animateOpacity is true.
  if (animateOpacity) {
    enterAtoms.push(fadeIn({ duration, easing, delay }));
    exitAtoms.push(fadeOut({ duration: exitDuration, easing: exitEasing, delay: exitDelay }));
  }

  return {
    enter: enterAtoms,
    exit: exitAtoms,
  };
};

/** A React component that applies slide in/out transitions to its children. */
export const Slide = createPresenceComponent(slidePresenceFn, {
  poses: [
    { from: 'fromX', in: 'inX', to: 'toX', neutral: '0px' },
    { from: 'fromY', in: 'inY', to: 'toY', neutral: '0px' },
  ],
});

export const SlideSnappy = createPresenceComponentVariant(Slide, {
  easing: motionTokens.curveDecelerateMax,
  exitEasing: motionTokens.curveAccelerateMax,
});

export const SlideRelaxed = createPresenceComponentVariant(Slide, {
  duration: motionTokens.durationGentle,
});
