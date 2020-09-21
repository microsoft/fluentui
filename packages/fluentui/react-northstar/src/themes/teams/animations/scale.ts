import { decelerateMax, accelerateMax } from './timingFunctions';
import { ultraFast, faster, fast, normal, slow, slower, ultraSlow } from './durations';

export const scaleAnimations = {
  // Scale in w/ fade- UltraFast
  scaleEnterUltraFast: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `scale(${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'scale(1)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: 0.88 },
    duration: ultraFast,
    timingFunction: decelerateMax,
    fillMode: 'forwards',
  },
  // Scale in w/ fade- Faster
  scaleEnterFaster: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `scale(${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'scale(1)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: 0.88 },
    duration: faster,
    timingFunction: decelerateMax,
    fillMode: 'forwards',
  },
  // Scale in w/ fade- Fast
  scaleEnterFast: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `scale(${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'scale(1)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: 0.88 },
    duration: fast,
    timingFunction: decelerateMax,
    fillMode: 'forwards',
  },
  // Scale in  w/ fade- Normal
  scaleEnterNormal: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `scale(${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'scale(1)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: 0.88 },
    duration: normal,
    timingFunction: decelerateMax,
    fillMode: 'forwards',
  },
  // Scale in w/ fade - Slow
  scaleEnterSlow: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `scale(${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'scale(1)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: 0.88 },
    duration: slow,
    timingFunction: decelerateMax,
    fillMode: 'forwards',
  },
  // Scale in w/ fade - Slower
  scaleEnterSlower: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `scale(${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'scale(1)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: 0.88 },
    duration: slower,
    timingFunction: decelerateMax,
    fillMode: 'forwards',
  },
  // Scale in w/ fade - UlrtaSlow
  scaleEnterUltraSlow: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `scale(${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'scale(1)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: 0.88 },
    duration: ultraSlow,
    timingFunction: decelerateMax,
    fillMode: 'forwards',
  },

  // Scale Out w/ Fade - UltraFast
  scaleExitUltraFast: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'scale(1)',
        opacity: 1,
      },
      '100%': {
        transform: `scale(${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: 0.9 },
    duration: ultraFast,
    timingFunction: accelerateMax,
    fillMode: 'forwards',
  },
  // Scale Out w/ Fade - Faster
  scaleExitFaster: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'scale(1)',
        opacity: 1,
      },
      '100%': {
        transform: `scale(${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: 0.9 },
    duration: faster,
    timingFunction: accelerateMax,
    fillMode: 'forwards',
  },
  // Scale Out w/ Fade - Fast
  scaleExitFast: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'scale(1)',
        opacity: 1,
      },
      '100%': {
        transform: `scale(${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: 0.9 },
    duration: fast,
    timingFunction: accelerateMax,
    fillMode: 'forwards',
  },
  // Scale Out w/ Fade - Normal
  scaleExitNormal: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'scale(1)',
        opacity: 1,
      },
      '100%': {
        transform: `scale(${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: 0.9 },
    duration: normal,
    timingFunction: accelerateMax,
    fillMode: 'forwards',
  },
  // Scale Out w/ Fade - Slow
  scaleExitSlow: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'scale(1)',
        opacity: 1,
      },
      '100%': {
        transform: `scale(${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: 0.9 },
    duration: slow,
    timingFunction: accelerateMax,
    fillMode: 'forwards',
  },
  // Scale Out w/ Fade - Slower
  scaleExitSlower: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'scale(1)',
        opacity: 1,
      },
      '100%': {
        transform: `scale(${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: 0.9 },
    duration: slower,
    timingFunction: accelerateMax,
    fillMode: 'forwards',
  },
  // Scale Out w/ Fade - UltraSlow
  scaleExitUltraSlow: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'scale(1)',
        opacity: 1,
      },
      '100%': {
        transform: `scale(${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: 0.9 },
    duration: ultraSlow,
    timingFunction: accelerateMax,
    fillMode: 'forwards',
  },
  scaleDownSoft: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'scale(1)',
        opacity: 1,
      },
      '100%': {
        transform: `scale(${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: 0.9 },
    duration: '100ms',
    timingFunction: 'cubic-bezier(.78, 0, .22, 1)',
    fillMode: 'both',
  },
};
