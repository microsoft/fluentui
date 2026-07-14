import type { MotionComponent, MotionComponentProps, PresenceComponentProps } from '@fluentui/react-motion';
import type { JSXElement } from '@fluentui/react-utilities';
import type { AnimateOpacity, BasePresenceParams } from '../../types';

export type Slide2Params = BasePresenceParams &
  AnimateOpacity & {
    /** X translation from which the element enters. Defaults to `'0px'`. */
    fromX?: string;

    /** Y translation from which the element enters. Defaults to `'0px'`. */
    fromY?: string;

    /** X translation of the resting state. Defaults to `'0px'`. */
    restX?: string;

    /** Y translation of the resting state. Defaults to `'0px'`. */
    restY?: string;

    /** X translation towards which the element exits. Defaults to `fromX`. */
    toX?: string;

    /** Y translation towards which the element exits. Defaults to `fromY`. */
    toY?: string;
  };

export type Slide2InParams = AnimateOpacity & {
  /** Time in milliseconds for the motion. */
  duration?: number;

  /** Easing curve for the motion. */
  easing?: string;

  /** Time in milliseconds before the motion starts. */
  delay?: EffectTiming['delay'];

  /** X translation from which the element enters. Defaults to `'0px'`. */
  fromX?: string;

  /** Y translation from which the element enters. Defaults to `'0px'`. */
  fromY?: string;

  /** X translation of the resting state. Defaults to `'0px'`. */
  restX?: string;

  /** Y translation of the resting state. Defaults to `'0px'`. */
  restY?: string;
};

export type Slide2OutParams = AnimateOpacity & {
  /** Time in milliseconds for the motion. */
  duration?: number;

  /** Easing curve for the motion. */
  easing?: string;

  /** Time in milliseconds before the motion starts. */
  delay?: EffectTiming['delay'];

  /** X translation of the resting state. Defaults to `'0px'`. */
  restX?: string;

  /** Y translation of the resting state. Defaults to `'0px'`. */
  restY?: string;

  /** X translation towards which the element exits. Defaults to `'0px'`. */
  toX?: string;

  /** Y translation towards which the element exits. Defaults to `'0px'`. */
  toY?: string;
};

export type Slide2Component = {
  (props: PresenceComponentProps & Slide2Params): JSXElement | null;
  In: MotionComponent<Slide2InParams>;
  Out: MotionComponent<Slide2OutParams>;
};

export type Slide2InProps = MotionComponentProps & Slide2InParams;
export type Slide2OutProps = MotionComponentProps & Slide2OutParams;
