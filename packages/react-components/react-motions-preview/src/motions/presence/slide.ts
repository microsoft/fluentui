import type { PresenceMotion } from '../../types';
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
} from '../atom/slide';
import type { SlideParams } from '../atom/slide';

export const downUltraFast = (params: SlideParams = {}): PresenceMotion => ({
  enter: downEnterUltraFast(params),
  exit: downExitUltraFast(params),
});

export const downFaster = (params: SlideParams = {}): PresenceMotion => ({
  enter: downEnterFaster(params),
  exit: downExitFaster(params),
});

export const downFast = (params: SlideParams = {}): PresenceMotion => ({
  enter: downEnterFast(params),
  exit: downExitFast(params),
});

export const downNormal = (params: SlideParams = {}): PresenceMotion => ({
  enter: downEnterNormal(params),
  exit: downExitNormal(params),
});

export const downSlow = (params: SlideParams = {}): PresenceMotion => ({
  enter: downEnterSlow(params),
  exit: downExitSlow(params),
});

export const downSlower = (params: SlideParams = {}): PresenceMotion => ({
  enter: downEnterSlower(params),
  exit: downExitSlower(params),
});

export const downUltraSlow = (params: SlideParams = {}): PresenceMotion => ({
  enter: downEnterUltraSlow(params),
  exit: downExitUltraSlow(params),
});

export const upUltraFast = (params: SlideParams = {}): PresenceMotion => ({
  enter: upEnterUltraFast(params),
  exit: upExitUltraFast(params),
});

export const upFaster = (params: SlideParams = {}): PresenceMotion => ({
  enter: upEnterFaster(params),
  exit: upExitFaster(params),
});

export const upFast = (params: SlideParams = {}): PresenceMotion => ({
  enter: upEnterFast(params),
  exit: upExitFast(params),
});

export const upNormal = (params: SlideParams = {}): PresenceMotion => ({
  enter: upEnterNormal(params),
  exit: upExitNormal(params),
});

export const upSlow = (params: SlideParams = {}): PresenceMotion => ({
  enter: upEnterSlow(params),
  exit: upExitSlow(params),
});

export const upSlower = (params: SlideParams = {}): PresenceMotion => ({
  enter: upEnterSlower(params),
  exit: upExitSlower(params),
});

export const upUltraSlow = (params: SlideParams = {}): PresenceMotion => ({
  enter: upEnterUltraSlow(params),
  exit: upExitUltraSlow(params),
});

export const leftUltraFast = (params: SlideParams = {}): PresenceMotion => ({
  enter: leftEnterUltraFast(params),
  exit: leftExitUltraFast(params),
});

export const leftFaster = (params: SlideParams = {}): PresenceMotion => ({
  enter: leftEnterFaster(params),
  exit: leftExitFaster(params),
});

export const leftFast = (params: SlideParams = {}): PresenceMotion => ({
  enter: leftEnterFast(params),
  exit: leftExitFast(params),
});

export const leftNormal = (params: SlideParams = {}): PresenceMotion => ({
  enter: leftEnterNormal(params),
  exit: leftExitNormal(params),
});

export const leftSlow = (params: SlideParams = {}): PresenceMotion => ({
  enter: leftEnterSlow(params),
  exit: leftExitSlow(params),
});

export const leftSlower = (params: SlideParams = {}): PresenceMotion => ({
  enter: leftEnterSlower(params),
  exit: leftExitSlower(params),
});

export const leftUltraSlow = (params: SlideParams = {}): PresenceMotion => ({
  enter: leftEnterUltraSlow(params),
  exit: leftExitUltraSlow(params),
});

export const rightUltraFast = (params: SlideParams = {}): PresenceMotion => ({
  enter: rightEnterUltraFast(params),
  exit: rightExitUltraFast(params),
});

export const rightFaster = (params: SlideParams = {}): PresenceMotion => ({
  enter: rightEnterFaster(params),
  exit: rightExitFaster(params),
});

export const rightFast = (params: SlideParams = {}): PresenceMotion => ({
  enter: rightEnterFast(params),
  exit: rightExitFast(params),
});

export const rightNormal = (params: SlideParams = {}): PresenceMotion => ({
  enter: rightEnterNormal(params),
  exit: rightExitNormal(params),
});

export const rightSlow = (params: SlideParams = {}): PresenceMotion => ({
  enter: rightEnterSlow(params),
  exit: rightExitSlow(params),
});

export const rightSlower = (params: SlideParams = {}): PresenceMotion => ({
  enter: rightEnterSlower(params),
  exit: rightExitSlower(params),
});

export const rightUltraSlow = (params: SlideParams = {}): PresenceMotion => ({
  enter: rightEnterUltraSlow(params),
  exit: rightExitUltraSlow(params),
});
