import { easeOut, easeIn, easeEasy } from './timingFunctions';

const scaleAnimations = {
  // Scale in w/ Fade -- Useful for opening modal dialogs
  scaleEnterFast: {
    keyframe: {
      '0%': {
        transform: 'scale(.88)',
        opacity: 0,
      },
      '100%': {
        transform: 'scale(1)',
        opacity: 1,
      },
    },
    duration: '500ms',
    timingFunction: easeOut,
    fillMode: 'forwards',
  },
  scaleEnterMedium: {
    keyframe: {
      '0%': {
        transform: 'scale(.88)',
        opacity: 0,
      },
      '100%': {
        transform: 'scale(1)',
        opacity: 1,
      },
    },
    duration: '600ms',
    timingFunction: easeOut,
    fillMode: 'forwards',
  },
  scaleEnterSlow: {
    keyframe: {
      '0%': {
        transform: 'scale(.88)',
        opacity: 0,
      },
      '100%': {
        transform: 'scale(1)',
        opacity: 1,
      },
    },
    duration: '700ms',
    timingFunction: easeOut,
    fillMode: 'forwards',
  },
  // Scale Out w/ Fade --Useful for dismissing modal dialogs
  scaleExitFast: {
    keyframe: {
      '0%': {
        transform: 'scale(1)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(.9)',
        opacity: 0,
      },
    },
    duration: '200ms',
    timingFunction: easeIn,
    fillMode: 'forwards',
  },
  scaleExitMedium: {
    keyframe: {
      '0%': {
        transform: 'scale(1)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(.9)',
        opacity: 0,
      },
    },
    duration: '275ms',
    timingFunction: easeIn,
    fillMode: 'forwards',
  },
  scaleExitSlow: {
    keyframe: {
      '0%': {
        transform: 'scale(1)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(.9)',
        opacity: 0,
      },
    },
    duration: '350ms',
    timingFunction: easeIn,
    fillMode: 'forwards',
  },
  scaleDownSoft: {
    keyframe: {
      '0%': {
        transform: 'scale(1)',
      },
      '100%': {
        transform: 'scale(.96)',
      },
    },
    duration: '100ms',
    timingFunction: 'cubic-bezier(.78, 0, .22, 1)',
    fillMode: 'both',
  },

  // Bounce in w/ fade --Useful for explicity grabbing the users attention.
  bounceEnterFast: {
    keyframe: {
      '0%': {
        transform: 'scale(.92)',
        opacity: 0,
        animationTimingFunction: easeIn,
      },
      '50%': {
        transform: 'scale(1.03)',
        animationTimingFunction: easeOut,
        opacity: 1,
      },
      '100%': {
        transform: 'scale(1)',
        animationTimingFunction: easeOut,
      },
    },
    delay: '0ms',
    duration: '450ms',
    fillMode: 'forwards',
  },
  bounceEnterMedium: {
    keyframe: {
      '0%': {
        transform: 'scale(.92)',
        opacity: 0,
        animationTimingFunction: easeIn,
      },
      '50%': {
        transform: 'scale(1.03)',
        opacity: 1,
        animationTimingFunction: easeOut,
      },
      '100%': {
        transform: 'scale(1)',
        animationTimingFunction: easeOut,
      },
    },
    delay: '0ms',
    duration: '550ms',
    fillMode: 'forwards',
  },
  bounceEnterSlow: {
    keyframe: {
      '0%': {
        transform: 'scale(.92)',
        opacity: 0,
        animationTimingFunction: easeIn,
      },
      '50%': {
        transform: 'scale(1.03)',
        opacity: 1,
        animationTimingFunction: easeIn,
      },
      '100%': {
        transform: 'scale(1)',
        animationTimingFunction: easeOut,
      },
    },
    delay: '0ms',
    duration: '600ms',
    fillMode: 'forwards',
  },
  // Bounce exit w/ fade.
  bounceExitFast: {
    keyframe: {
      '0%': {
        transform: 'scale(1)',
        animationTimingFunction: easeEasy,
      },
      '30%': {
        transform: 'scale(1.03)',
        opacity: 1,
        animationTimingFunction: easeIn,
      },
      '100%': {
        transform: 'scale(.96)',
        opacity: 0,
      },
    },
    delay: '0ms',
    duration: '400ms',
    fillMode: 'forwards',
  },
  bounceExitMedium: {
    keyframe: {
      '0%': {
        transform: 'scale(1)',

        animationTimingFunction: easeEasy,
      },
      '30%': {
        transform: 'scale(1.03)',
        opacity: 1,
        animationTimingFunction: easeIn,
      },
      '100%': {
        transform: 'scale(.96)',
        opacity: 0,
      },
    },
    delay: '0ms',
    duration: '500ms',
    fillMode: 'forwards',
  },
  bounceExitSlow: {
    keyframe: {
      '0%': {
        transform: 'scale(1)',
        animationTimingFunction: easeEasy,
      },
      '30%': {
        transform: 'scale(1.03)',
        opacity: 1,
        animationTimingFunction: easeIn,
      },
      '100%': {
        transform: 'scale(.95)',
        opacity: 0,
      },
    },
    delay: '0ms',
    duration: '600ms',
    fillMode: 'forwards',
  },
  // Bounce in w/ fade --Useful for explicity grabbing the users attention.
  bounceNotify: {
    keyframe: {
      '0%': {
        transform: 'scale(1)',
        animationTimingFunction: easeIn,
      },
      '30%': {
        transform: 'scale(.92)',
        animationTimingFunction: easeEasy,
      },
      '60%': {
        transform: 'scale(1.05)',
        animationTimingFunction: easeEasy,
      },
      '100%': {
        transform: 'scale(1)',
      },
    },
    delay: '0ms',
    duration: '600ms',
    fillMode: 'forwards',
  },
};

export default scaleAnimations;
