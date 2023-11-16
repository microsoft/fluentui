import {
  downEnterFast,
  downEnterFaster,
  downEnterNormal,
  downEnterSlow,
  downEnterSlower,
  downEnterUltraFast,
  downEnterUltraSlow,
  downExitFast,
  downExitFaster,
  downExitNormal,
  downExitSlow,
  downExitSlower,
  downExitUltraFast,
  downExitUltraSlow,
  leftEnterFast,
  leftEnterFaster,
  leftEnterNormal,
  leftEnterSlow,
  leftEnterSlower,
  leftEnterUltraFast,
  leftExitFast,
  leftExitFaster,
  leftExitNormal,
  leftExitSlower,
  leftExitSlow,
  leftExitUltraFast,
  upEnterFast,
  upEnterFaster,
  upEnterNormal,
  upEnterSlow,
  upEnterSlower,
  upEnterUltraFast,
  upEnterUltraSlow,
  upExitFast,
  upExitFaster,
  upExitNormal,
  upExitSlow,
  upExitSlower,
  upExitUltraFast,
  upExitUltraSlow,
  leftEnterUltraSlow,
  leftExitUltraSlow,
  rightExitUltraFast,
  rightEnterUltraFast,
  rightEnterFaster,
  rightExitFaster,
  rightEnterUltraSlow,
  rightExitUltraSlow,
  rightEnterSlower,
  rightExitSlower,
  rightExitSlow,
  rightEnterSlow,
  rightEnterNormal,
  rightExitNormal,
  rightEnterFast,
  rightExitFast,
} from '../atoms/slide';
import type { SlideParams } from '../atoms/slide';
import type { MotionTransition } from '../types';

export const downUltraFast = (params: SlideParams = {}): MotionTransition => ({
  enter: downEnterUltraFast(params),
  exit: downExitUltraFast(params),
});

export const downFaster = (params: SlideParams = {}): MotionTransition => ({
  enter: downEnterFaster(params),
  exit: downExitFaster(params),
});

export const downFast = (params: SlideParams = {}): MotionTransition => ({
  enter: downEnterFast(params),
  exit: downExitFast(params),
});

export const downNormal = (params: SlideParams = {}): MotionTransition => ({
  enter: downEnterNormal(params),
  exit: downExitNormal(params),
});

export const downSlow = (params: SlideParams = {}): MotionTransition => ({
  enter: downEnterSlow(params),
  exit: downExitSlow(params),
});

export const downSlower = (params: SlideParams = {}): MotionTransition => ({
  enter: downEnterSlower(params),
  exit: downExitSlower(params),
});

export const downUltraSlow = (params: SlideParams = {}): MotionTransition => ({
  enter: downEnterUltraSlow(params),
  exit: downExitUltraSlow(params),
});

export const upUltraFast = (params: SlideParams = {}): MotionTransition => ({
  enter: upEnterUltraFast(params),
  exit: upExitUltraFast(params),
});

export const upFaster = (params: SlideParams = {}): MotionTransition => ({
  enter: upEnterFaster(params),
  exit: upExitFaster(params),
});

export const upFast = (params: SlideParams = {}): MotionTransition => ({
  enter: upEnterFast(params),
  exit: upExitFast(params),
});

export const upNormal = (params: SlideParams = {}): MotionTransition => ({
  enter: upEnterNormal(params),
  exit: upExitNormal(params),
});

export const upSlow = (params: SlideParams = {}): MotionTransition => ({
  enter: upEnterSlow(params),
  exit: upExitSlow(params),
});

export const upSlower = (params: SlideParams = {}): MotionTransition => ({
  enter: upEnterSlower(params),
  exit: upExitSlower(params),
});

export const upUltraSlow = (params: SlideParams = {}): MotionTransition => ({
  enter: upEnterUltraSlow(params),
  exit: upExitUltraSlow(params),
});

export const leftUltraFast = (params: SlideParams = {}): MotionTransition => ({
  enter: leftEnterUltraFast(params),
  exit: leftExitUltraFast(params),
});

export const leftFaster = (params: SlideParams = {}): MotionTransition => ({
  enter: leftEnterFaster(params),
  exit: leftExitFaster(params),
});

export const leftFast = (params: SlideParams = {}): MotionTransition => ({
  enter: leftEnterFast(params),
  exit: leftExitFast(params),
});

export const leftNormal = (params: SlideParams = {}): MotionTransition => ({
  enter: leftEnterNormal(params),
  exit: leftExitNormal(params),
});

export const leftSlow = (params: SlideParams = {}): MotionTransition => ({
  enter: leftEnterSlow(params),
  exit: leftExitSlow(params),
});

export const leftSlower = (params: SlideParams = {}): MotionTransition => ({
  enter: leftEnterSlower(params),
  exit: leftExitSlower(params),
});

export const leftUltraSlow = (params: SlideParams = {}): MotionTransition => ({
  enter: leftEnterUltraSlow(params),
  exit: leftExitUltraSlow(params),
});

export const rightUltraFast = (params: SlideParams = {}): MotionTransition => ({
  enter: rightEnterUltraFast(params),
  exit: rightExitUltraFast(params),
});

export const rightFaster = (params: SlideParams = {}): MotionTransition => ({
  enter: rightEnterFaster(params),
  exit: rightExitFaster(params),
});

export const rightFast = (params: SlideParams = {}): MotionTransition => ({
  enter: rightEnterFast(params),
  exit: rightExitFast(params),
});

export const rightNormal = (params: SlideParams = {}): MotionTransition => ({
  enter: rightEnterNormal(params),
  exit: rightExitNormal(params),
});

export const rightSlow = (params: SlideParams = {}): MotionTransition => ({
  enter: rightEnterSlow(params),
  exit: rightExitSlow(params),
});

export const rightSlower = (params: SlideParams = {}): MotionTransition => ({
  enter: rightEnterSlower(params),
  exit: rightExitSlower(params),
});

export const rightUltraSlow = (params: SlideParams = {}): MotionTransition => ({
  enter: rightEnterUltraSlow(params),
  exit: rightExitUltraSlow(params),
});
