import {
  enterFaster,
  enterNormal,
  enterSlower,
  enterUltraFast,
  enterUltraSlow,
  exitFaster,
  exitNormal,
  exitSlower,
  exitUltraFast,
  exitUltraSlow,
} from '../atoms/fade';
import type { FadeParams } from '../atoms/fade';
import type { MotionTransition } from '../types';

export const ultraFast = (params: FadeParams = {}): MotionTransition => ({
  enter: enterUltraFast(params),
  exit: exitUltraFast(params),
});

export const faster = (params: FadeParams = {}): MotionTransition => ({
  enter: enterFaster(params),
  exit: exitFaster(params),
});

export const fast = (params: FadeParams = {}): MotionTransition => ({
  enter: enterFaster(params),
  exit: exitFaster(params),
});

export const normal = (params: FadeParams = {}): MotionTransition => ({
  enter: enterNormal(params),
  exit: exitNormal(params),
});

export const slow = (params: FadeParams = {}): MotionTransition => ({
  enter: enterSlower(params),
  exit: exitSlower(params),
});

export const slower = (params: FadeParams = {}): MotionTransition => ({
  enter: enterSlower(params),
  exit: exitSlower(params),
});

export const ultraSlow = (params: FadeParams = {}): MotionTransition => ({
  enter: enterUltraSlow(params),
  exit: exitUltraSlow(params),
});
