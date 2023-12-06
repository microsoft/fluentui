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

export type SlideParams = {
  fromValue?: string;
};

// Slide Down Ins
// --------------------------------------------------

export const downEnterUltraFast = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateY(-${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationUltraFast,
    easing: easingDecelerateMax,
  },
});

export const downEnterFaster = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateY(-${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationFaster,
    easing: easingDecelerateMax,
  },
});

export const downEnterFast = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateY(-${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationFast,
    easing: easingDecelerateMax,
  },
});

export const downEnterNormal = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateY(-${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationNormal,
    easing: easingDecelerateMax,
  },
});

export const downEnterSlow = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateY(-${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationSlow,
    easing: easingDecelerateMax,
  },
});

export const downEnterSlower = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateY(-${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationSlower,
    easing: easingDecelerateMax,
  },
});

export const downEnterUltraSlow = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
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

export const upEnterUltraFast = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateY(${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationUltraFast,
    easing: easingDecelerateMax,
  },
});

export const upEnterFaster = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateY(${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationFaster,
    easing: easingDecelerateMax,
  },
});

export const upEnterFast = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateY(${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationFast,
    easing: easingDecelerateMax,
  },
});

export const upEnterNormal = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateY(${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationNormal,
    easing: easingDecelerateMax,
  },
});

export const upEnterSlow = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateY(${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationSlow,
    easing: easingDecelerateMax,
  },
});

export const upEnterSlower = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateY(${fromValue})`, opacity: 0 },
    { transform: 'translateY(0px)', opacity: 1 },
  ],
  options: {
    duration: durationSlower,
    easing: easingDecelerateMax,
  },
});

export const upEnterUltraSlow = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
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

export const leftEnterUltraFast = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateX(${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationUltraFast,
    easing: easingDecelerateMax,
  },
});

export const leftEnterFaster = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateX(${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationFaster,
    easing: easingDecelerateMax,
  },
});

export const leftEnterFast = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateX(${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationFast,
    easing: easingDecelerateMax,
  },
});

export const leftEnterNormal = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateX(${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationNormal,
    easing: easingDecelerateMax,
  },
});

export const leftEnterSlow = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateX(${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationSlow,
    easing: easingDecelerateMax,
  },
});

export const leftEnterSlower = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateX(${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationSlower,
    easing: easingDecelerateMax,
  },
});

export const leftEnterUltraSlow = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
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

export const rightEnterUltraFast = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateX(-${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationUltraFast,
    easing: easingDecelerateMax,
  },
});

export const rightEnterFaster = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateX(-${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationFaster,
    easing: easingDecelerateMax,
  },
});

export const rightEnterFast = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateX(-${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationFast,
    easing: easingDecelerateMax,
  },
});

export const rightEnterNormal = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateX(-${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationNormal,
    easing: easingDecelerateMax,
  },
});

export const rightEnterSlow = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateX(-${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationSlow,
    easing: easingDecelerateMax,
  },
});

export const rightEnterSlower = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: `translateX(-${fromValue})`, opacity: 0 },
    { transform: 'translateX(0px)', opacity: 1 },
  ],
  options: {
    duration: durationSlower,
    easing: easingDecelerateMax,
  },
});

export const rightEnterUltraSlow = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
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

export const downExitUltraFast = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationUltraFast,
    easing: easingAccelerateMax,
  },
});

export const downExitFaster = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationFaster,
    easing: easingAccelerateMax,
  },
});

export const downExitFast = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationFaster,
    easing: easingAccelerateMax,
  },
});

export const downExitNormal = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationNormal,
    easing: easingAccelerateMax,
  },
});

export const downExitSlow = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationSlow,
    easing: easingAccelerateMax,
  },
});

export const downExitSlower = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationSlower,
    easing: easingAccelerateMax,
  },
});

export const downExitUltraSlow = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
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

export const upExitUltraFast = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationUltraFast,
    easing: easingAccelerateMax,
  },
});

export const upExitFaster = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationFaster,
    easing: easingAccelerateMax,
  },
});

export const upExitFast = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationFaster,
    easing: easingAccelerateMax,
  },
});

export const upExitNormal = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationNormal,
    easing: easingAccelerateMax,
  },
});

export const upExitSlow = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationSlow,
    easing: easingAccelerateMax,
  },
});

export const upExitSlower = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: `translateY(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationSlower,
    easing: easingAccelerateMax,
  },
});

export const upExitUltraSlow = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
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

export const rightExitUltraFast = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
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
export const rightExitFaster = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationFaster,
    easing: easingAccelerateMax,
  },
});

export const rightExitFast = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationFaster,
    easing: easingAccelerateMax,
  },
});

export const rightExitNormal = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationNormal,
    easing: easingAccelerateMax,
  },
});

export const rightExitSlow = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationSlow,
    easing: easingAccelerateMax,
  },
});

export const rightExitSlower = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationSlower,
    easing: easingAccelerateMax,
  },
});

export const rightExitUltraSlow = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
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

export const leftExitUltraFast = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationUltraFast,
    easing: easingAccelerateMax,
  },
});

export const leftExitFaster = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationFaster,
    easing: easingAccelerateMax,
  },
});

export const leftExitFast = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationFaster,
    easing: easingAccelerateMax,
  },
});

export const leftExitNormal = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationNormal,
    easing: easingAccelerateMax,
  },
});

export const leftExitSlow = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationSlow,
    easing: easingAccelerateMax,
  },
});

export const leftExitSlower = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationSlower,
    easing: easingAccelerateMax,
  },
});

export const leftExitUltraSlow = ({ fromValue = '20px' }: SlideParams = {}): AtomMotion => ({
  keyframes: [
    { transform: 'translateX(0px)', opacity: 1 },
    { transform: `translateX(-${fromValue})`, opacity: 0 },
  ],
  options: {
    duration: durationUltraSlow,
    easing: easingAccelerateMax,
  },
});
