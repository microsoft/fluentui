import {
  durationFast,
  durationFaster,
  durationNormal,
  durationSlow,
  durationSlower,
  durationUltraFast,
  durationUltraSlow,
  easingAccelerateMax,
  easingDecelerateMax,
} from './tokens';
import type { AtomMotion } from '../../types';

export type ScaleParams = {
  fromValue?: number;
};

// Scale Ins
// --------------------------------------------------

export const enterUltraFast = ({ fromValue = 0.88 }: ScaleParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `scale(${fromValue})`, opacity: 0 },
    { transform: 'scale(1)', opacity: 1 },
  ],

  duration: durationUltraFast,
  easing: easingDecelerateMax,
});

export const enterFaster = ({ fromValue = 0.88 }: ScaleParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `scale(${fromValue})`, opacity: 0 },
    { transform: 'scale(1)', opacity: 1 },
  ],

  duration: durationFaster,
  easing: easingDecelerateMax,
});

export const enterFast = ({ fromValue = 0.88 }: ScaleParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `scale(${fromValue})`, opacity: 0 },
    { transform: 'scale(1)', opacity: 1 },
  ],

  duration: durationFast,
  easing: easingDecelerateMax,
});

export const enterNormal = ({ fromValue = 0.88 }: ScaleParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `scale(${fromValue})`, opacity: 0 },
    { transform: 'scale(1)', opacity: 1 },
  ],

  duration: durationNormal,
  easing: easingDecelerateMax,
});

export const enterSlow = ({ fromValue = 0.88 }: ScaleParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `scale(${fromValue})`, opacity: 0 },
    { transform: 'scale(1)', opacity: 1 },
  ],

  duration: durationSlow,
  easing: easingDecelerateMax,
});

export const enterSlower = ({ fromValue = 0.88 }: ScaleParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `scale(${fromValue})`, opacity: 0 },
    { transform: 'scale(1)', opacity: 1 },
  ],

  duration: durationSlower,
  easing: easingDecelerateMax,
});

export const enterUltraSlow = ({ fromValue = 0.88 }: ScaleParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `scale(${fromValue})`, opacity: 0 },
    { transform: 'scale(1)', opacity: 1 },
  ],

  duration: durationUltraSlow,
  easing: easingDecelerateMax,
});

// Scale Outs
// --------------------------------------------------

export const exitUltraFast = ({ fromValue = 0.9 }: ScaleParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: `scale(${fromValue})`, opacity: 0 },
  ],

  duration: durationFast,
  easing: easingAccelerateMax,
});

export const exitFaster = ({ fromValue = 0.9 }: ScaleParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: `scale(${fromValue})`, opacity: 0 },
  ],

  duration: durationFaster,
  easing: easingAccelerateMax,
});

export const exitFast = ({ fromValue = 0.88 }: ScaleParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: `scale(${fromValue})`, opacity: 0 },
  ],

  duration: durationFast,
  easing: easingAccelerateMax,
});

export const exitNormal = ({ fromValue = 0.9 }: ScaleParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: `scale(${fromValue})`, opacity: 0 },
  ],

  duration: durationNormal,
  easing: easingAccelerateMax,
});

export const exitSlow = ({ fromValue = 0.9 }: ScaleParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: `scale(${fromValue})`, opacity: 0 },
  ],

  duration: durationSlow,
  easing: easingAccelerateMax,
});

export const exitSlower = ({ fromValue = 0.9 }: ScaleParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: `scale(${fromValue})`, opacity: 0 },
  ],

  duration: durationSlower,
  easing: easingAccelerateMax,
});

export const exitUltraSlow = ({ fromValue = 0.88 }: ScaleParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: `scale(${fromValue})`, opacity: 0 },
  ],

  duration: durationUltraSlow,
  easing: easingAccelerateMax,
});
