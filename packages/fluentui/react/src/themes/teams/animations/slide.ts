import { easeOut, easeIn } from './timingFunctions'

const slideAnimations = {
  // Slides object down to original position
  slideDownEnterFast: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: `translateY(-${distance})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '400ms',
    timingFunction: easeOut,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object in from top to bottom
  slideDownEnterMedium: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: `translateY(-${distance})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '500ms',
    timingFunction: easeOut,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slides object in from top to bottom
  slideDownEnterSlow: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: `translateY(-${distance})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '700ms',
    timingFunction: easeOut,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slides object in from top to bottom
  slideUpEnterFast: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: `translateY(${distance})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '400ms',
    timingFunction: easeOut,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object in from down to up
  slideUpEnterMedium: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: `translateY(${distance})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '500ms',
    timingFunction: easeOut,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slides object in from bottom to top
  slideUpEnterSlow: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: `translateY(${distance})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '700ms',
    timingFunction: easeOut,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // ---Horizontal Slide Animations---- //

  // Slides object in from right to left
  slideLeftEnterFast: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: `translateX(${distance})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '400ms',
    timingFunction: easeOut,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object in from right to left
  slideLeftEnterMedium: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: `translateX(${distance})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '500ms',
    timingFunction: easeOut,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object in from right to left
  slideLeftEnterSlow: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: `translateX(${distance})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '700ms',
    timingFunction: easeOut,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object in from left to right
  slideRightEnterFast: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: `translateX(-${distance})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '400ms',
    timingFunction: easeOut,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object in from left to right
  SlideRightEnterMedium: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: `translateX(-${distance})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '500ms',
    timingFunction: easeOut,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object in from left to right
  slideRightEnterSlow: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: `translateX(-${distance})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '700ms',
    timingFunction: easeOut,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slide Exit Animation///
  slideDownExitFast: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateY(${distance})`,
        opacity: 0,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '400ms',
    timingFunction: easeIn,
    direction: 'forward',
    fillMode: 'forwards',
  },

  slideDownExitMedium: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateY(${distance})`,
        opacity: 0,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '400ms',
    timingFunction: easeIn,
    direction: 'forward',
    fillMode: 'forwards',
  },
  slideDownExitSlow: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateY(${distance})`,
        opacity: 0,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '500ms',
    timingFunction: easeIn,
    direction: 'forward',
    fillMode: 'forwards',
  },
  slideUpExitFast: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateY(-${distance})`,
        opacity: 0,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '300ms',
    timingFunction: easeIn,
    direction: 'forward',
    fillMode: 'forwards',
  },
  slideUpExitMedium: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateY(-${distance})`,
        opacity: 0,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '400ms',
    timingFunction: easeIn,
    direction: 'forward',
    fillMode: 'forwards',
  },
  slideUpExitSlow: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateY(-${distance})`,
        opacity: 0,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '500ms',
    timingFunction: easeIn,
    direction: 'forward',
    fillMode: 'forwards',
  },
  slideRightExitFast: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateX(${distance})`,
        opacity: 0,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '300ms',
    timingFunction: easeIn,
    direction: 'forward',
    fillMode: 'forwards',
  },
  slideRightExitMedium: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateX(${distance})`,
        opacity: 0,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '400ms',
    timingFunction: easeIn,
    direction: 'forward',
    fillMode: 'forwards',
  },
  slideRightExitSlow: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateX(${distance})`,
        opacity: 0,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '500ms',
    timingFunction: easeIn,
    direction: 'forward',
    fillMode: 'forwards',
  },
  slideLeftExitFast: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateX(-${distance})`,
        opacity: 0,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '300ms',
    timingFunction: easeIn,
    direction: 'forward',
    fillMode: 'forwards',
  },
  slideLeftExitMedium: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateX(-${distance})`,
        opacity: 0,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '400ms',
    timingFunction: easeIn,
    direction: 'forward',
    fillMode: 'forwards',
  },
  slideLeftExitSlow: {
    keyframe: ({ distance }) => ({
      '0%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateX(-${distance})`,
        opacity: 0,
      },
    }),
    keyframeParams: { distance: '20px' },
    duration: '500ms',
    timingFunction: easeIn,
    direction: 'forward',
    fillMode: 'forwards',
  },
}

export default slideAnimations
