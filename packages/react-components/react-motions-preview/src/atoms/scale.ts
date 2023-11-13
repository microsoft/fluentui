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

export const scaleEnterUltraFast = ({ fromValue = 0.88 }: ScaleParams): MotionAtom => ({
  keyframes: [
    { transform: `scale(${fromValue})`, opacity: 0 },
    { transform: 'scale(1)', opacity: 1 },
  ],
  options: {
    duration: durationUltraFast,
    easing: easingDecelerateMax,
  },
});

export const scaleEnterFaster = ({ fromValue = 0.88 }: ScaleParams): MotionAtom => ({
  keyframes: [
    { transform: `scale(${fromValue})`, opacity: 0 },
    { transform: 'scale(1)', opacity: 1 },
  ],
  options: {
    duration: durationFaster,
    easing: easingDecelerateMax,
  },
});

export const scaleEnterFast = ({ fromValue = 0.88 }: ScaleParams): MotionAtom => ({
  keyframes: [
    { transform: `scale(${fromValue})`, opacity: 0 },
    { transform: 'scale(1)', opacity: 1 },
  ],
  options: {
    duration: durationFast,
    easing: easingDecelerateMax,
  },
});

export const scaleEnterNormal = ({ fromValue = 0.88 }: ScaleParams): MotionAtom => ({
  keyframes: [
    { transform: `scale(${fromValue})`, opacity: 0 },
    { transform: 'scale(1)', opacity: 1 },
  ],
  options: {
    duration: durationNormal,
    easing: easingDecelerateMax,
  },
});

export const scaleEnterSlow = ({ fromValue = 0.88 }: ScaleParams): MotionAtom => ({
  keyframes: [
    { transform: `scale(${fromValue})`, opacity: 0 },
    { transform: 'scale(1)', opacity: 1 },
  ],
  options: {
    duration: durationSlow,
    easing: easingDecelerateMax,
  },
});

export const scaleEnterSlower = ({ fromValue = 0.88 }: ScaleParams): MotionAtom => ({
  keyframes: [
    { transform: `scale(${fromValue})`, opacity: 0 },
    { transform: 'scale(1)', opacity: 1 },
  ],
  options: {
    duration: durationSlower,
    easing: easingDecelerateMax,
  },
});

export const scaleEnterUltraSlow = ({ fromValue = 0.88 }: ScaleParams): MotionAtom => ({
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

export const scaleExitUltraFast = ({ fromValue = 0.9 }: ScaleParams): MotionAtom => ({
  keyframes: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: `scale(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationFast,
    easing: easingAccelerateMax,
  },
});

export const scaleExitFaster = ({ fromValue = 0.9 }: ScaleParams): MotionAtom => ({
  keyframes: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: `scale(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationFaster,
    easing: easingAccelerateMax,
  },
});

export const scaleExitFast = ({ fromValue = 0.88 }: ScaleParams): MotionAtom => ({
  keyframes: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: `scale(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationFast,
    easing: easingAccelerateMax,
  },
});

export const scaleExitNormal = ({ fromValue = 0.9 }: ScaleParams): MotionAtom => ({
  keyframes: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: `scale(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationNormal,
    easing: easingAccelerateMax,
  },
});

export const scaleExitSlow = ({ fromValue = 0.9 }: ScaleParams): MotionAtom => ({
  keyframes: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: `scale(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationSlow,
    easing: easingAccelerateMax,
  },
});

export const scaleExitSlower = ({ fromValue = 0.9 }: ScaleParams): MotionAtom => ({
  keyframes: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: `scale(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationSlower,
    easing: easingAccelerateMax,
  },
});

export const scaleExitUltraSlow = ({ fromValue = 0.88 }: ScaleParams): MotionAtom => ({
  keyframes: [
    { transform: 'scale(1)', opacity: 1 },
    { transform: `scale(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationUltraSlow,
    easing: easingAccelerateMax,
  },
});
