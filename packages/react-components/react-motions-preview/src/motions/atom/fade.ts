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

import type { AtomMotion } from '../../types';

export type FadeParams = {
  fromValue?: number;
};

// Fade Ins
// --------------------------------------------------

export const enterUltraFast = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],

  duration: durationUltraFast,
  easing: easingLinear,
});

export const enterFaster = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],

  duration: durationFaster,
  easing: easingLinear,
});

export const enterFast = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],

  duration: durationFast,
  easing: easingLinear,
});

export const enterNormal = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],

  duration: durationNormal,
  easing: easingLinear,
});

export const enterSlow = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],

  duration: durationSlow,
  easing: easingLinear,
});

export const enterSlower = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],

  duration: durationSlower,
  easing: easingLinear,
});

export const enterUltraSlow = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: fromValue }, { opacity: 1 }],

  duration: durationUltraSlow,
  easing: easingLinear,
});

// Fade Outs
// --------------------------------------------------

export const exitUltraFast = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],

  duration: durationUltraFast,
  easing: easingLinear,
});

export const exitFaster = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],

  duration: durationFaster,
  easing: easingLinear,
});

export const exitFast = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],

  duration: durationFast,
  easing: easingLinear,
});

export const exitNormal = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],

  duration: durationNormal,
  easing: easingLinear,
});

export const exitSlow = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],

  duration: durationSlow,
  easing: easingLinear,
});

export const exitSlower = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],

  duration: durationSlower,
  easing: easingLinear,
});

export const exitUltraSlow = ({ fromValue = 0 }: FadeParams = {}): AtomMotion => ({
  keyframes: [{ opacity: 1 }, { opacity: fromValue }],

  duration: durationUltraSlow,
  easing: easingLinear,
});
