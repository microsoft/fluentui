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

type SlideParams = {
  fromValue?: string;
};

// Slide Down Ins
// --------------------------------------------------

export const slideDownEnterUltraFast = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateY(-${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationUltraFast,
    easing: easingDecelerateMax,
  },
});

export const slideDownEnterFaster = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateY(-${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationFaster,
    easing: easingDecelerateMax,
  },
});

export const slideDownEnterFast = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateY(-${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationFast,
    easing: easingDecelerateMax,
  },
});

export const slideDownEnterNormal = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateY(-${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationNormal,
    easing: easingDecelerateMax,
  },
});

export const slideDownEnterSlow = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateY(-${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationSlow,
    easing: easingDecelerateMax,
  },
});

export const slideDownEnterSlower = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateY(-${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationSlower,
    easing: easingDecelerateMax,
  },
});

export const slideDownEnterUltraSlow = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateY(-${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationUltraSlow,
    easing: easingDecelerateMax,
  },
});

// Slide Up Ins
// --------------------------------------------------

export const slideUpEnterUltraFast = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateY(${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationUltraFast,
    easing: easingDecelerateMax,
  },
});

export const slideUpEnterFaster = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateY(${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationFaster,
    easing: easingDecelerateMax,
  },
});

export const slideUpEnterFast = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateY(${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationFast,
    easing: easingDecelerateMax,
  },
});

export const slideUpEnterNormal = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateY(${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationNormal,
    easing: easingDecelerateMax,
  },
});

export const slideUpEnterSlow = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateY(${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationSlow,
    easing: easingDecelerateMax,
  },
});

export const slideUpEnterSlower = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateY(${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationSlower,
    easing: easingDecelerateMax,
  },
});

export const slideUpEnterUltraSlow = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateY(${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationSlow,
    easing: easingDecelerateMax,
  },
});

// Slide Left Ins
// --------------------------------------------------

export const slideLeftEnterUltraFast = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateX(${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationUltraFast,
    easing: easingDecelerateMax,
  },
});

export const slideLeftEnterFaster = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateX(${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationFaster,
    easing: easingDecelerateMax,
  },
});

export const slideLeftEnterFast = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateX(${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationFast,
    easing: easingDecelerateMax,
  },
});

export const slideLeftEnterNormal = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateX(${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationNormal,
    easing: easingDecelerateMax,
  },
});

export const slideLeftEnterSlow = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateX(${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationSlow,
    easing: easingDecelerateMax,
  },
});

export const slideLeftEnterSlower = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateX(${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationSlower,
    easing: easingDecelerateMax,
  },
});

export const slideLeftEnterUltraSlow = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateX(${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationUltraSlow,
    easing: easingDecelerateMax,
  },
});

// Slide Right Ins
// --------------------------------------------------

export const slideRightEnterUltraFast = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateX(-${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationUltraFast,
    easing: easingDecelerateMax,
  },
});

export const slideRightEnterFaster = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateX(-${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationFaster,
    easing: easingDecelerateMax,
  },
});

export const slideRightEnterFast = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateX(-${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationFast,
    easing: easingDecelerateMax,
  },
});

export const slideRightEnterNormal = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateX(-${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationNormal,
    easing: easingDecelerateMax,
  },
});

export const slideRightEnterSlow = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateX(-${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationSlow,
    easing: easingDecelerateMax,
  },
});

export const slideRightEnterSlower = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateX(-${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationSlower,
    easing: easingDecelerateMax,
  },
});

export const slideRightEnterUltraSlow = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: `translateX(-${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationUltraSlow,
    easing: easingDecelerateMax,
  },
});

// Slide Down Outs
// --------------------------------------------------

export const slideDownExitUltraFast = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationUltraFast,
    easing: easingAccelerateMax,
  },
});

export const slideDownExitFaster = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationFaster,
    easing: easingAccelerateMax,
  },
});

export const slideDownExitFast = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationFaster,
    easing: easingAccelerateMax,
  },
});

export const slideDownExitNormal = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationNormal,
    easing: easingAccelerateMax,
  },
});

export const slideDownExitSlow = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationSlow,
    easing: easingAccelerateMax,
  },
});

export const slideDownExitSlower = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationSlower,
    easing: easingAccelerateMax,
  },
});

export const slideDownExitUltraSlow = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationUltraSlow,
    easing: easingAccelerateMax,
  },
});

// Slide Up Outs
// --------------------------------------------------

export const slideUpExitUltraFast = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationUltraFast,
    easing: easingAccelerateMax,
  },
});

export const slideUpExitFaster = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationFaster,
    easing: easingAccelerateMax,
  },
});

export const slideUpExitFast = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationFaster,
    easing: easingAccelerateMax,
  },
});

export const slideUpExitNormal = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationNormal,
    easing: easingAccelerateMax,
  },
});

export const slideUpExitSlow = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationSlow,
    easing: easingAccelerateMax,
  },
});

export const slideUpExitSlower = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationSlower,
    easing: easingAccelerateMax,
  },
});

export const slideUpExitUltraSlow = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationUltraSlow,
    easing: easingAccelerateMax,
  },
});

// Slide Right Outs
// --------------------------------------------------

export const slideRightExitUltraFast = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationUltraFast,
    easing: easingAccelerateMax,
  },
});
//
export const slideRightExitFaster = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationFaster,
    easing: easingAccelerateMax,
  },
});

export const slideRightExitFast = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationFaster,
    easing: easingAccelerateMax,
  },
});

export const slideRightExitNormal = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationNormal,
    easing: easingAccelerateMax,
  },
});

export const slideRightExitSlow = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationSlow,
    easing: easingAccelerateMax,
  },
});

export const slideRightExitSlower = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationSlower,
    easing: easingAccelerateMax,
  },
});

export const slideRightExitUltraSlow = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationUltraSlow,
    easing: easingAccelerateMax,
  },
});

// Slide Left Outs
// --------------------------------------------------

export const slideLeftExitUltraFast = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationUltraFast,
    easing: easingAccelerateMax,
  },
});

export const slideLeftExitFaster = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationFaster,
    easing: easingAccelerateMax,
  },
});

export const slideLeftExitFast = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationFaster,
    easing: easingAccelerateMax,
  },
});

export const slideLeftExitNormal = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationNormal,
    easing: easingAccelerateMax,
  },
});

export const slideLeftExitSlow = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationSlow,
    easing: easingAccelerateMax,
  },
});

export const slideLeftExitSlower = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationSlower,
    easing: easingAccelerateMax,
  },
});

export const slideLeftExitUltraSlow = ({ fromValue = '20px' }: SlideParams): MotionAtom => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationUltraSlow,
    easing: easingAccelerateMax,
  },
});
