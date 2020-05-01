import { easeEasy } from './timingFunctions';

const fadeInOutAnimations = {
  // Basic Fade In Animation -- Fast
  fadeEnterFast: {
    keyframe: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
    duration: '220ms',
    timingFunction: easeEasy,
    fillMode: 'forwards',
  },
  // Basic Fade In Animation --Medium
  fadeEnterMedium: {
    keyframe: {
      '0%': {
        opacity: 0,
      },
      '100%': {
        opacity: 1,
      },
    },
    duration: '350ms',
    timingFunction: easeEasy,
    fillMode: 'forwards',
  },
  // Basic Fade In Animation --Slow
  fadeEnterSlow: {
    keyframe: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
    duration: '500ms',
    timingFunction: easeEasy,
    fillMode: 'forwards',
  },
  // Basic Fade Out Animation --Fast
  fadeExitFast: {
    keyframe: {
      '0%': { opacity: 1 },
      '100%': { opacity: 0 },
    },
    duration: '220ms',
    timingFunction: easeEasy,
    fillMode: 'forwards',
  },
  // Basic Fade Out Animation --Medium
  fadeExitMedium: {
    keyframe: {
      '0%': { opacity: 1 },
      '100%': { opacity: 0 },
    },
    duration: '350ms',
    timingFunction: easeEasy,
    fillMode: 'forwards',
  },
  // Basic Fade Out Animation --Slow
  fadeExitSlow: {
    keyframe: {
      '0%': { opacity: 1 },
      '100%': { opacity: 0 },
    },
    duration: '500ms',
    timingFunction: easeEasy,
    fillMode: 'forwards',
  },
};

export default fadeInOutAnimations;
