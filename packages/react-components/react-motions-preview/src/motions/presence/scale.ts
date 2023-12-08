import type { PresenceMotion } from '../../types';
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
} from '../atom/scale';
import type { ScaleParams } from '../atom/scale';

export const ultraFast = (params: ScaleParams = {}): PresenceMotion => ({
  enter: enterUltraFast(params),
  exit: exitUltraFast(params),
});

export const faster = (params: ScaleParams = {}): PresenceMotion => ({
  enter: enterFaster(params),
  exit: exitFaster(params),
});

export const fast = (params: ScaleParams = {}): PresenceMotion => ({
  enter: enterFast(params),
  exit: exitFast(params),
});

export const normal = (params: ScaleParams = {}): PresenceMotion => ({
  enter: enterNormal(params),
  exit: exitNormal(params),
});

export const slow = (params: ScaleParams = {}): PresenceMotion => ({
  enter: enterSlow(params),
  exit: exitSlow(params),
});

export const slower = (params: ScaleParams = {}): PresenceMotion => ({
  enter: enterSlow(params),
  exit: exitSlow(params),
});

export const ultraSlow = (params: ScaleParams = {}): PresenceMotion => ({
  enter: enterUltraSlow(params),
  exit: exitUltraSlow(params),
});
