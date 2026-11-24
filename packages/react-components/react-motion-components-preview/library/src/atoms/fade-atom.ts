import type { AtomMotion } from '@fluentui/react-motion';
import { motionTokens } from '@fluentui/react-motion';
import type { MotionTiming } from '../types';

/** An opacity value used as a fade pose. */
export type FadePose = number;

/**
 * Explicit opacity endpoints for a fade motion. Both `from` and `to` are required;
 * use `fadeIn` or `fadeOut` when arriving at or departing from neutral opacity `1`.
 *
 * @example
 * ```ts
 * const fadeBetween: FadeOptions = { from: 0.2, to: 0.7, duration: 200 };
 * // @ts-expect-error Both from and to endpoints are required.
 * const missingTo: FadeOptions = { from: 0.2, duration: 200 };
 * ```
 */
export type FadeOptions = MotionTiming & {
  from: FadePose;
  to: FadePose;
};

/** Options for entering from an outer opacity (default `0`) to neutral opacity `1`. */
export type FadeInOptions = MotionTiming & { from?: FadePose; to?: never };

/** Options for exiting from neutral opacity `1` to an outer opacity (default `0`). */
export type FadeOutOptions = MotionTiming & { from?: never; to?: FadePose };

/** Creates an absolute opacity motion between explicit `from` and `to` poses. */
export const fade = ({
  from,
  to,
  duration,
  easing = motionTokens.curveLinear,
  delay = 0,
}: FadeOptions): AtomMotion => ({
  keyframes: [{ opacity: from }, { opacity: to }],
  duration,
  easing,
  delay,
  fill: 'both',
});

/** Creates an absolute opacity motion arriving at `1` from `from` (default `0`). */
export const fadeIn = ({ from = 0, duration, easing, delay }: FadeInOptions): AtomMotion =>
  fade({ from, to: 1, duration, easing, delay });

/** Creates an absolute opacity motion departing from `1` to `to` (default `0`). */
export const fadeOut = ({ to = 0, duration, easing, delay }: FadeOutOptions): AtomMotion =>
  fade({ from: 1, to, duration, easing, delay });
