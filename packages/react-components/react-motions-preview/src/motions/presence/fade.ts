import type { PresenceMotion } from '../../types';
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
} from '../atom/fade';
import type { FadeParams } from '../atom/fade';

export const ultraFast = (params: FadeParams = {}): PresenceMotion => ({
  enter: enterUltraFast(params),
  exit: exitUltraFast(params),
});

export const faster = (params: FadeParams = {}): PresenceMotion => ({
  enter: enterFaster(params),
  exit: exitFaster(params),
});

export const fast = (params: FadeParams = {}): PresenceMotion => ({
  enter: enterFaster(params),
  exit: exitFaster(params),
});

export const normal = (params: FadeParams = {}): PresenceMotion => ({
  enter: enterNormal(params),
  exit: exitNormal(params),
});

export const slow = (params: FadeParams = {}): PresenceMotion => ({
  enter: enterSlower(params),
  exit: exitSlower(params),
});

export const slower = (params: FadeParams = {}): PresenceMotion => ({
  enter: enterSlower(params),
  exit: exitSlower(params),
});

export const ultraSlow = (params: FadeParams = {}): PresenceMotion => ({
  enter: enterUltraSlow(params),
  exit: exitUltraSlow(params),
});
