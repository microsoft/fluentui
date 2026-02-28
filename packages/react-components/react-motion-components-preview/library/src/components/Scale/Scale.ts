import {
  motionTokens,
  createPresenceComponent,
  PresenceMotionFn,
  createPresenceComponentVariant,
} from '@fluentui/react-motion';
import { fadeAtom } from '../../atoms/fade-atom';
import { scaleAtom } from '../../atoms/scale-atom';
import { ScaleParams } from './scale-types';

/**
 * Define a presence motion for scale in/out
 *
 * @param duration - Time (ms) for the enter transition (scale-in). Defaults to the `durationGentle` value (250 ms).
 * @param easing - Easing curve for the enter transition (scale-in). Defaults to the `curveDecelerateMax` value.
 * @param delay - Time (ms) to delay the enter transition. Defaults to 0.
 * @param exitDuration - Time (ms) for the exit transition (scale-out). Defaults to the `durationNormal` value (200 ms).
 * @param exitEasing - Easing curve for the exit transition (scale-out). Defaults to the `curveAccelerateMax` value.
 * @param exitDelay - Time (ms) to delay the exit transition. Defaults to the `delay` param for symmetry.
 * @param outScale - Scale for the out state (exited). Defaults to `0.9`.
 * @param inScale - Scale for the in state (entered). Defaults to `1`.
 * @param animateOpacity - Whether to animate the opacity. Defaults to `true`.
 */
const scalePresenceFn: PresenceMotionFn<ScaleParams> = ({
  duration = motionTokens.durationGentle,
  easing = motionTokens.curveDecelerateMax,
  delay = 0,
  exitDuration = motionTokens.durationNormal,
  exitEasing = motionTokens.curveAccelerateMax,
  exitDelay = delay,
  outScale = 0.9,
  inScale = 1,
  animateOpacity = true,
}) => {
  const enterAtoms = [scaleAtom({ direction: 'enter', duration, easing, delay, outScale, inScale })];
  const exitAtoms = [
    scaleAtom({
      direction: 'exit',
      duration: exitDuration,
      easing: exitEasing,
      delay: exitDelay,
      outScale,
      inScale,
    }),
  ];

  // Only add fade atoms if animateOpacity is true.
  if (animateOpacity) {
    enterAtoms.push(fadeAtom({ direction: 'enter', duration, easing, delay }));
    exitAtoms.push(fadeAtom({ direction: 'exit', duration: exitDuration, easing: exitEasing, delay: exitDelay }));
  }

  return {
    enter: enterAtoms,
    exit: exitAtoms,
  };
};

/** A React component that applies scale in/out transitions to its children. */
export const Scale = createPresenceComponent(scalePresenceFn);

export const ScaleSnappy = createPresenceComponentVariant(Scale, {
  duration: motionTokens.durationNormal,
  exitDuration: motionTokens.durationFast,
});

export const ScaleRelaxed = createPresenceComponentVariant(Scale, {
  duration: motionTokens.durationSlow,
  exitDuration: motionTokens.durationGentle,
});

/*
New variant specced by Jeremy Frye
Enter spec: https://app.motionspec.io/dev/Lw7ntnDrJVpZtKEGmuPT
Exit spec: https://app.motionspec.io/dev/ASC8HF9cAidojBEQz38w

ENTER timeline

       0ms  50   100  150  200  250  300ms
       ├────┼────┼────┼────┼────┼────┤
Scale  ██████████████████████████████  (0 → 300ms, curveDecelerateMin)
Fade   ·····██████████···············  (50 → 150ms, curveLinear)
            ↑         ↑
           50ms      150ms

EXIT timeline

       0ms  50   100  150  200  250  300ms
       ├────┼────┼────┼────┼────┼────┤
Scale  ██████████████████████████████  (0 → 300ms, curveDecelerateMin)
Fade   ····················██████████  (200 → 300ms, curveLinear)
                           ↑         ↑
                          200ms     300ms
*/

const scaleJeremyAtoms = {
  enter: [
    scaleAtom({
      direction: 'enter',
      outScale: 0.9,
      duration: motionTokens.durationSlow, // 300 ms scale up
      easing: motionTokens.curveDecelerateMin,
    }),
    fadeAtom({
      direction: 'enter',
      delay: motionTokens.durationUltraFast, // 50 ms delay
      duration: motionTokens.durationFaster, // 100 ms fade in
      easing: motionTokens.curveLinear,
    }),
  ],

  exit: [
    scaleAtom({
      direction: 'exit',
      outScale: 0.9,
      duration: motionTokens.durationSlow, // 300 ms scale down
      easing: motionTokens.curveDecelerateMin,
    }),
    fadeAtom({
      direction: 'exit',
      delay: motionTokens.durationNormal, // 200 ms delay
      duration: motionTokens.durationFaster, // 100 ms fade out
      easing: motionTokens.curveLinear,
    }),
  ],
};

export const ScaleJeremy = createPresenceComponent(scaleJeremyAtoms);
