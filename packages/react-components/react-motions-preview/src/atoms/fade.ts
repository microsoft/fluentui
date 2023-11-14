import {
  durationUltraFast,
  durationFaster,
  durationFast,
  durationNormal,
  durationSlow,
  durationSlower,
  durationUltraSlow,
  easingLinear,
} from './tokens';

import type { MotionAtom } from '../types';

type FadeParams = {
  fromValue?: number;
};

// Fade Ins
// --------------------------------------------------

export const enterUltraFast = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],
  options: {
    duration: durationUltraFast,
    easing: easingLinear,
  },
});

export const enterFaster = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],
  options: {
    duration: durationFaster,
    easing: easingLinear,
  },
});

export const enterFast = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],
  options: {
    duration: durationFast,
    easing: easingLinear,
  },
});

export const enterNormal = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],
  options: {
    duration: durationNormal,
    easing: easingLinear,
  },
});

export const enterSlow = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],
  options: {
    duration: durationSlow,
    easing: easingLinear,
  },
});

export const enterSlower = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],
  options: {
    duration: durationSlower,
    easing: easingLinear,
  },
});

export const enterUltraSlow = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],
  options: {
    duration: durationUltraSlow,
    easing: easingLinear,
  },
});

// Fade Ins
// --------------------------------------------------

export const exitUltraFast = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],
  options: {
    duration: durationUltraFast,
    easing: easingLinear,
  },
});

export const exitFaster = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],
  options: {
    duration: durationFaster,
    easing: easingLinear,
  },
});

export const exitFast = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],
  options: {
    duration: durationFast,
    easing: easingLinear,
  },
});

export const exitNormal = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],
  options: {
    duration: durationNormal,
    easing: easingLinear,
  },
});

export const exitSlow = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],
  options: {
    duration: durationSlow,
    easing: easingLinear,
  },
});

export const exitSlower = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],
  options: {
    duration: durationSlower,
    easing: easingLinear,
  },
});

export const exitUltraSlow = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],
  options: {
    duration: durationUltraSlow,
    easing: easingLinear,
  },
});
