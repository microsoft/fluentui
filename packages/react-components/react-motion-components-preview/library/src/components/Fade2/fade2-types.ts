import type { MotionComponent, MotionComponentProps, PresenceComponentProps } from '@fluentui/react-motion';
import type { JSXElement } from '@fluentui/react-utilities';
import type { BasePresenceParams } from '../../types';

type Fade2MotionParams = {
  /** Time in milliseconds for the motion. */
  duration?: number;

  /** Easing curve for the motion. */
  easing?: string;

  /** Time in milliseconds before the motion starts. */
  delay?: EffectTiming['delay'];
};

export type Fade2Params = BasePresenceParams & {
  /** Opacity from which the element enters. Defaults to 0. */
  fromOpacity?: number;

  /** Opacity of the resting state. Defaults to 1. */
  restOpacity?: number;

  /** Opacity towards which the element exits. Defaults to `fromOpacity`. */
  toOpacity?: number;
};

export type Fade2InParams = Fade2MotionParams & {
  /** Opacity from which the element enters. Defaults to 0. */
  fromOpacity?: number;

  /** Opacity of the resting state. Defaults to 1. */
  restOpacity?: number;
};

export type Fade2OutParams = Fade2MotionParams & {
  /** Opacity of the resting state. Defaults to 1. */
  restOpacity?: number;

  /** Opacity towards which the element exits. Defaults to 0. */
  toOpacity?: number;
};

export type Fade2Component = {
  (props: PresenceComponentProps & Fade2Params): JSXElement | null;
  In: MotionComponent<Fade2InParams>;
  Out: MotionComponent<Fade2OutParams>;
};

export type Fade2InProps = MotionComponentProps & Fade2InParams;
export type Fade2OutProps = MotionComponentProps & Fade2OutParams;
