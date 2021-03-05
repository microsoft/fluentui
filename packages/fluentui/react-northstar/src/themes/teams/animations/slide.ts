import { decelerateMax, accelerateMax } from './timingFunctions';
import { ultraFast, faster, fast, normal, slow, slower, ultraSlow } from './durations';

export const slideAnimations = {
  // Slide Down Animations
  // Slides object down to original position --ultrafast
  slideDownEnterUltraFast: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateY(-${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: ultraFast,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object down to original position -Faster
  slideDownEnterFaster: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateY(-${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: faster,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object down to original position -fast
  slideDownEnterFast: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateY(-${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: fast,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object in from top to bottom --normal
  slideDownEnterNormal: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateY(-${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: normal,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object in from top to bottom --slow
  slideDownEnterSlow: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateY(-${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: slow,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slides object in from top to bottom --slower
  slideDownEnterSlower: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateY(-${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: slower,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slides object in from top to bottom - Slow
  slideDownEnterUltraSlow: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateY(-${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: ultraSlow,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slide Up Animations

  // Slides object in from top to bottom --ultrafast
  slideUpEnterUltraFast: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateY(${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: ultraFast,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object in from top to bottom --faster
  slideUpEnterFaster: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateY(${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: faster,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object in from top to bottom --fast
  slideUpEnterFast: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateY(${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: fast,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object in from down to up-normal
  slideUpEnterNormal: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateY(${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: normal,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object in from top to bottom --slow
  slideUpEnterSlow: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateY(${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: slow,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slides object in from bottom to top - slower
  slideUpEnterSlower: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateY(${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: slower,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slides object in from bottom to top - ultraslow
  slideUpEnterUltraSlow: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateY(${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: ultraSlow,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // ---Horizontal Slide Animations---- //

  // Slide Left Animations
  // Slides object in from right to left --ultrafast
  slideLeftEnterUltraFast: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateX(${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: ultraFast,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object in from right to left -faster
  slideLeftEnterFaster: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateX(${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: faster,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object in from right to left -Fast
  slideLeftEnterFast: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateX(${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: fast,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object in from right to left -Normal
  slideLeftEnterNormal: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateX(${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '200px' },
    duration: normal,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object in from right to left -Slow
  slideLeftEnterSlow: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateX(${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: slow,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object in from right to left - slower
  slideLeftEnterSlower: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateX(${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: slower,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slides object in from right to left - ultraslow
  slideLeftEnterUltraSlow: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateX(${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: ultraSlow,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slide Right Animations

  // Slides object in from left to right -ultrafast
  slideRightEnterUltraFast: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateX(-${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: ultraFast,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object in from left to right - Faster
  slideRightEnterFaster: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateX(-${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: faster,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slides object in from left to right -fast
  slideRightEnterFast: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateX(-${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: fast,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object in from left to right -normal
  slideRightEnterNormal: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateX(-${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '200px' },
    duration: normal,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object in from left to right -slow
  slideRightEnterSlow: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateX(-${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: slow,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slides object in from left to right- slower
  slideRightEnterSlower: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateX(-${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: slower,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slides object in from left to right- ultraslow
  slideRightEnterUltraSlow: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: `translateX(-${delta})`,
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: ultraSlow,
    timingFunction: decelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slide Exit Animation///

  // Slide Down - Exit - UltraFast
  slideDownExitUltraFast: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateY(${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: ultraFast,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slide Down - Exit - Faster
  slideDownExitFaster: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateY(${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: faster,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slide Down - Exit - Fast
  slideDownExitFast: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateY(${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: fast,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slide Down - Exit - Normal
  slideDownExitNormal: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateY(${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: normal,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slide Down - Exit - Slow
  slideDownExitSlow: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateY(${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: slow,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slide Down - Exit - Slower
  slideDownExitSlower: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateY(${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: slower,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slide Down - Exit - Ultraslow
  slideDownExitUltraSlow: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateY(${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: ultraSlow,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slide Up - Exit- Animations

  // Slide Up - Exit - UltraFast
  slideUpExitUltraFast: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateY(-${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: ultraFast,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slide Up - Exit - Faster
  slideUpExitFaster: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateY(-${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: faster,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slide Up - Exit - Fast
  slideUpExitFast: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateY(-${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: fast,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slide Up - Exit - Normal
  slideUpExitNormal: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateY(-${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: normal,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slide Up - Exit - Slow
  slideUpExitSlow: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateY(-${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: slow,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slide Up - Exit - Slower
  slideUpExitSlower: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateY(-${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: slower,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slide Up - Exit - Ultra Slow
  slideUpExitUltraSlow: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateY(-${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: ultraSlow,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slide Right Exit Animations

  // Slide Right Exit - Ultrafast
  slideRightExitUltraFast: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateX(${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: ultraFast,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slide Right Exit - Faster
  slideRightExitFaster: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateX(${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: faster,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slide Right Exit - Fast
  slideRightExitFast: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateX(${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: fast,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slide Right Exit - Normal
  slideRightExitNormal: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateX(${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: normal,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slide Right Exit - Slow
  slideRightExitSlow: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateX(${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: slow,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slide Right Exit - Ultrafast
  slideRightExitSlower: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateX(${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: slower,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slide Right Exit - Ultraslow
  slideRightExitUltraSlow: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateX(${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: ultraSlow,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },

  // Slide Left Exit Aniamtions

  // Slide Left Exit -ultrafast
  slideLeftExitUltraFast: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateX(-${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: ultraFast,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slide Left Exit -Faster
  slideLeftExitFaster: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateX(-${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: faster,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slide Left Exit -Fast
  slideLeftExitFast: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateX(-${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: fast,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slide Left Exit -Normal
  slideLeftExitNormal: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateX(-${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: normal,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slide Left Exit -Slow
  slideLeftExitSlow: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateX(-${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: slow,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slide Left Exit -Slower
  slideLeftExitSlower: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateX(-${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: slower,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
  // Slide Left Exit -Ultraslow
  slideLeftExitUltraSlow: {
    keyframe: ({ delta }) => ({
      '0%': {
        transform: 'translateX(0px)',
        opacity: 1,
      },
      '100%': {
        transform: `translateX(-${delta})`,
        opacity: 0,
      },
    }),
    keyframeParams: { delta: '20px' },
    duration: ultraSlow,
    timingFunction: accelerateMax,
    direction: 'forward',
    fillMode: 'forwards',
  },
};
