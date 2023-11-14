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
import type { MotionAtom } from '../types';

type ScaleParams = {
  fromValue?: number;
};

// Scale Ins
// --------------------------------------------------

export const enterUltraFast = ({ fromValue = 0.88 }: ScaleParams = {}): MotionAtom => ({
  keyframes: [
    { transform: `scale(${fromValue})`, opacity: 0 },
    { transform: 'scale(1)', opacity: 1 },
  ],
  options: {
    duration: durationUltraFast,
    easing: easingDecelerateMax,
  },
});

export const enterFaster = ({ fromValue = 0.88 }: ScaleParams = {}): MotionAtom => ({
  keyframes: [
    { transform: `scale(${fromValue})`, opacity: 0 },
    { transform: 'scale(1)', opacity: 1 },
  ],
  options: {
    duration: durationFaster,
    easing: easingDecelerateMax,
  },
});

export const enterFast = ({ fromValue = 0.88 }: ScaleParams = {}): MotionAtom => ({
  keyframes: [
    { transform: `scale(${fromValue})`, opacity: 0 },
    { transform: 'scale(1)', opacity: 1 },
  ],
  options: {
    duration: durationFast,
    easing: easingDecelerateMax,
  },
});

export const enterNormal = ({ fromValue = 0.88 }: ScaleParams = {}): MotionAtom => ({
  keyframes: [
    { transform: `scale(${fromValue})`, opacity: 0 },
    { transform: 'scale(1)', opacity: 1 },
  ],
  options: {
    duration: durationNormal,
    easing: easingDecelerateMax,
  },
});

export const enterSlow = ({ fromValue = 0.88 }: ScaleParams = {}): MotionAtom => ({
  keyframes: [
    { transform: `scale(${fromValue})`, opacity: 0 },
    { transform: 'scale(1)', opacity: 1 },
  ],
  options: {
    duration: durationSlow,
    easing: easingDecelerateMax,
  },
});

export const enterSlower = ({ fromValue = 0.88 }: ScaleParams = {}): MotionAtom => ({
  keyframes: [
    { transform: `scale(${fromValue})`, opacity: 0 },
    { transform: 'scale(1)', opacity: 1 },
  ],
  options: {
    duration: durationSlower,
    easing: easingDecelerateMax,
  },
});

export const enterUltraSlow = ({ fromValue = 0.88 }: ScaleParams = {}): MotionAtom => ({
  keyframes: [
    { transform: `scale(${fromValue})`, opacity: 0 },
    { transform: 'scale(1)', opacity: 1 },
  ],
  options: {
    duration: durationUltraSlow,
    easing: easingDecelerateMax,
  },
});

// Scale Outs
// --------------------------------------------------

export const exitUltraFast = ({ fromValue = 0.9 }: ScaleParams = {}): MotionAtom => ({
  keyframes: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: `scale(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationFast,
    easing: easingAccelerateMax,
  },
});

export const exitFaster = ({ fromValue = 0.9 }: ScaleParams = {}): MotionAtom => ({
  keyframes: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: `scale(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationFaster,
    easing: easingAccelerateMax,
  },
});

export const exitFast = ({ fromValue = 0.88 }: ScaleParams = {}): MotionAtom => ({
  keyframes: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: `scale(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationFast,
    easing: easingAccelerateMax,
  },
});

export const exitNormal = ({ fromValue = 0.9 }: ScaleParams = {}): MotionAtom => ({
  keyframes: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: `scale(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationNormal,
    easing: easingAccelerateMax,
  },
});

export const exitSlow = ({ fromValue = 0.9 }: ScaleParams = {}): MotionAtom => ({
  keyframes: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: `scale(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationSlow,
    easing: easingAccelerateMax,
  },
});

export const exitSlower = ({ fromValue = 0.9 }: ScaleParams = {}): MotionAtom => ({
  keyframes: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: `scale(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationSlower,
    easing: easingAccelerateMax,
  },
});

export const exitUltraSlow = ({ fromValue = 0.88 }: ScaleParams = {}): MotionAtom => ({
  keyframes: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: `scale(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationUltraSlow,
    easing: easingAccelerateMax,
  },
});
