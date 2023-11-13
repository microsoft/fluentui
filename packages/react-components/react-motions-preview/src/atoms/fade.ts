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

export const fadeEnterUltraFast = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],
  options: {
    duration: durationUltraFast,
    easing: easingLinear,
  },
});

export const fadeEnterFaster = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],
  options: {
    duration: durationFaster,
    easing: easingLinear,
  },
});

export const fadeEnterFast = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],
  options: {
    duration: durationFast,
    easing: easingLinear,
  },
});

export const fadeEnterNormal = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],
  options: {
    duration: durationNormal,
    easing: easingLinear,
  },
});

// Basic Fade In Animation --Slow
export const fadeEnterSlow = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],
  options: {
    duration: durationSlow,
    easing: easingLinear,
  },
});

export const fadeEnterSlower = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],
  options: {
    duration: durationSlower,
    easing: easingLinear,
  },
});

export const fadeEnterUltraSlow = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],
  options: {
    duration: durationUltraSlow,
    easing: easingLinear,
  },
});

// Fade Ins
// --------------------------------------------------

export const fadeExitUltraFast = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],
  options: {
    duration: durationUltraFast,
    easing: easingLinear,
  },
});

export const fadeExitFaster = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],
  options: {
    duration: durationFaster,
    easing: easingLinear,
  },
});

export const fadeExitFast = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],
  options: {
    duration: durationFast,
    easing: easingLinear,
  },
});

export const fadeExitNormal = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],
  options: {
    duration: durationNormal,
    easing: easingLinear,
  },
});

export const fadeExitSlow = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],
  options: {
    duration: durationSlow,
    easing: easingLinear,
  },
});

export const fadeExitSlower = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],
  options: {
    duration: durationSlower,
    easing: easingLinear,
  },
});

export const fadeExitUltraSlow = ({ fromValue = 0 }: FadeParams): MotionAtom => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],
  options: {
    duration: durationUltraSlow,
    easing: easingLinear,
  },
});
