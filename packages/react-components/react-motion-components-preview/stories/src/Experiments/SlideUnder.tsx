import * as React from 'react';
import { motionTokens, AtomMotion, createPresenceComponent } from '../../../../react-components/src/index';
import { fadeAtom } from '../../../library/src/atoms/fade-atom';
import { slideAtom } from '../../../library/src/atoms/slide-atom';
import { PresenceMotionFnCreator } from '../../../library/src/types';

export type SlideOrientation = 'horizontal' | 'vertical';
// eslint-disable-next-line @typescript-eslint/naming-convention

export type SlideUnderVariantParams = {
  /** Time (ms) for the enter transition. Defaults to the `durationNormal` value (200 ms). */
  enterDuration?: number;

  /** Easing curve for the enter transition. Defaults to the `easeEaseMax` value.  */
  enterEasing?: string;

  /** Time (ms) for the exit transition. Defaults to the `enterDuration` param for symmetry. */
  exitDuration?: number;

  /** Easing curve for the exit transition. Defaults to the `enterEasing` param for symmetry.  */
  exitEasing?: string;
};
// eslint-disable-next-line @typescript-eslint/naming-convention

export type SlideUnderRuntimeParams = {
  /** Whether to animate the opacity. Defaults to `true`. */
  animateOpacity?: boolean;

  /**
   * The orientation of the slide animation: 'horizontal' or 'vertical'
   * @default 'vertical'
   */
  orientation?: SlideOrientation;

  /**
   * The distance of the slide, relative to the content's natural position.
   * Can be positive or negative, in pixels or other length units.
   * @default '10px'
   */
  distance?: string;
};

export const createSlideUnderPresence: PresenceMotionFnCreator<SlideUnderVariantParams, SlideUnderRuntimeParams> =
  ({
    enterDuration = motionTokens.durationNormal,
    enterEasing = motionTokens.curveDecelerateMid,
    exitDuration = enterDuration, // defaults to the enter duration for symmetry
    exitEasing = motionTokens.curveAccelerateMid,
  } = {}) =>
  ({ animateOpacity = !true, orientation = 'vertical', distance = '100%' }) => {
    // ----- ENTER -----
    const enterAtoms: AtomMotion[] = [
      slideAtom({
        direction: 'enter',
        orientation,
        distance,
        duration: enterDuration,
        easing: enterEasing,
      }),
      // { keyframes: [{ clipPath }, { clipPath }], duration: enterDuration, easing: enterEasing },
    ];
    if (animateOpacity) {
      enterAtoms.push(
        fadeAtom({
          direction: 'enter',
          duration: enterDuration,
          easing: enterEasing,
        }),
      );
    }

    // ----- EXIT -----
    const exitAtoms: AtomMotion[] = [
      slideAtom({
        direction: 'exit',
        orientation,
        distance,
        duration: exitDuration,
        easing: exitEasing,
      }),
      // { keyframes: [{ clipPath }, { clipPath }], duration: exitDuration, easing: exitEasing },
    ];
    if (animateOpacity) {
      exitAtoms.push(
        fadeAtom({
          direction: 'exit',
          duration: exitDuration,
          easing: exitEasing,
        }),
      );
    }

    return {
      enter: enterAtoms,
      exit: exitAtoms,
    };
  };
/** A React component that applies slide in/out transitions to its children. */
const SlideUnderInner = createPresenceComponent(createSlideUnderPresence());

// TODO: fix the lack of .In and .Out
export const SlideUnder = (props: React.ComponentProps<typeof SlideUnderInner>) => {
  return (
    // Wrapper to crop to the bounding box
    <div style={{ overflow: 'hidden' }}>
      <SlideUnderInner {...props} />
    </div>
  );
};
