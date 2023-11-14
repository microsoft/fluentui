import {
  enterFaster,
  exitFaster,
  enterUltraFast,
  exitUltraFast,
  exitFast,
  enterFast,
  enterNormal,
  exitNormal,
  enterSlow,
  exitSlow,
  enterUltraSlow,
  exitUltraSlow,
} from '../atoms/scale';
import type { ScaleParams } from '../atoms/scale';
import type { MotionTransition } from '../types';

export const ultraFast = (params: ScaleParams = {}): MotionTransition => ({
  enter: enterUltraFast(params),
  exit: exitUltraFast(params),
});

export const faster = (params: ScaleParams = {}): MotionTransition => ({
  enter: enterFaster(params),
  exit: exitFaster(params),
});

export const fast = (params: ScaleParams = {}): MotionTransition => ({
  enter: enterFast(params),
  exit: exitFast(params),
});

export const normal = (params: ScaleParams = {}): MotionTransition => ({
  enter: enterNormal(params),
  exit: exitNormal(params),
});

export const slow = (params: ScaleParams = {}): MotionTransition => ({
  enter: enterSlow(params),
  exit: exitSlow(params),
});

export const slower = (params: ScaleParams = {}): MotionTransition => ({
  enter: enterSlow(params),
  exit: exitSlow(params),
});

export const ultraSlow = (params: ScaleParams = {}): MotionTransition => ({
  enter: enterUltraSlow(params),
  exit: exitUltraSlow(params),
});
