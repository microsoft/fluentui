import { linear } from './timingFunctions';
import { ultraFast, faster, fast, normal, slow, slower, ultraSlow } from './durations';

export const fadeInOutAnimations = {
  // Fade Ins
  // Basic Fade In Animation -- Ultra Fast
  fadeEnterUltraFast: {
    keyframe: ({ delta }) => ({
      '0%': { opacity: delta },
      '100%': { opacity: 1 },
    }),
    keyframeParams: { delta: 0 },
    duration: ultraFast,
    timingFunction: linear,
    fillMode: 'forwards',
  },
  // Basic Fade In Animation -- Faster
  fadeEnterFaster: {
    keyframe: ({ delta }) => ({
      '0%': { opacity: delta },
      '100%': { opacity: 1 },
    }),
    keyframeParams: { delta: 0 },
    duration: faster,
    timingFunction: linear,
    fillMode: 'forwards',
  },
  // Basic Fade In Animation -- Fast
  fadeEnterFast: {
    keyframe: ({ delta }) => ({
      '0%': { opacity: delta },
      '100%': { opacity: 1 },
    }),
    keyframeParams: { delta: 0 },
    duration: fast,
    timingFunction: linear,
    fillMode: 'forwards',
  },
  // Basic Fade In Animation --Normal
  fadeEnterNormal: {
    keyframe: ({ delta }) => ({
      '0%': { opacity: delta },
      '100%': { opacity: 1 },
    }),
    keyframeParams: { delta: 0 },
    duration: normal,
    timingFunction: linear,
    fillMode: 'forwards',
  },
  // Basic Fade In Animation --Slow
  fadeEnterSlow: {
    keyframe: ({ delta }) => ({
      '0%': { opacity: delta },
      '100%': { opacity: 1 },
    }),
    keyframeParams: { delta: 0 },
    duration: slow,
    timingFunction: linear,
    fillMode: 'forwards',
  },
  // Basic Fade In Animation --Slow
  fadeEnterSlower: {
    keyframe: ({ delta }) => ({
      '0%': { opacity: delta },
      '100%': { opacity: 1 },
    }),
    keyframeParams: { delta: 0 },
    duration: slower,
    timingFunction: linear,
    fillMode: 'forwards',
  },
  // Basic Fade In Animation --UltraSlow
  fadeEnterUltraSlow: {
    keyframe: ({ delta }) => ({
      '0%': { opacity: delta },
      '100%': { opacity: 1 },
    }),
    keyframeParams: { delta: 0 },
    duration: ultraSlow,
    timingFunction: linear,
    fillMode: 'forwards',
  },

  // Fade Outs
  // Basic Fade Out Animation --UltraFast
  fadeExitUltraFast: {
    keyframe: ({ delta }) => ({
      '0%': { opacity: 1 },
      '100%': { opacity: delta },
    }),
    keyframeParams: { delta: 0 },
    duration: ultraFast,
    timingFunction: linear,
    fillMode: 'forwards',
  },
  // Basic Fade Out Animation --Faster
  fadeExitFaster: {
    keyframe: ({ delta }) => ({
      '0%': { opacity: 1 },
      '100%': { opacity: delta },
    }),
    keyframeParams: { delta: 0 },
    duration: faster,
    timingFunction: linear,
    fillMode: 'forwards',
  },
  // Basic Fade Out Animation --Fast
  fadeExitFast: {
    keyframe: ({ delta }) => ({
      '0%': { opacity: 1 },
      '100%': { opacity: delta },
    }),
    keyframeParams: { delta: 0 },
    duration: fast,
    timingFunction: linear,
    fillMode: 'forwards',
  },
  // Basic Fade Out Animation --Normal
  fadeExitNormal: {
    keyframe: ({ delta }) => ({
      '0%': { opacity: 1 },
      '100%': { opacity: delta },
    }),
    keyframeParams: { delta: 0 },
    duration: normal,
    timingFunction: linear,
    fillMode: 'forwards',
  },
  // Basic Fade Out Animation --Slow
  fadeExitSlow: {
    keyframe: ({ delta }) => ({
      '0%': { opacity: 1 },
      '100%': { opacity: delta },
    }),
    keyframeParams: { delta: 0 },
    duration: slow,
    timingFunction: linear,
    fillMode: 'forwards',
  },
  // Basic Fade Out Animation --Slower
  fadeExitSlower: {
    keyframe: ({ delta }) => ({
      '0%': { opacity: 1 },
      '100%': { opacity: delta },
    }),
    keyframeParams: { delta: 0 },
    duration: slower,
    timingFunction: linear,
    fillMode: 'forwards',
  },
  // Basic Fade Out Animation --UltraSlow
  fadeExitUltraSlow: {
    keyframe: ({ delta }) => ({
      '0%': { opacity: 1 },
      '100%': { opacity: delta },
    }),
    keyframeParams: { delta: 0 },
    duration: ultraSlow,
    timingFunction: linear,
    fillMode: 'forwards',
  },
};
