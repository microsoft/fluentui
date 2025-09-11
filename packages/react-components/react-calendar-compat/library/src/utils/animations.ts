import { motionTokens } from '@fluentui/react-motion';

export const EASING_FUNCTION_1 = motionTokens.curveDecelerateMax;
// This is nearly linear easing
export const EASING_FUNCTION_2 = 'cubic-bezier(.1,.25,.75,.9)';
// TODO: migrate to the closest duration tokens
// These constants are strings in seconds for CSS, but WAAPI expects numbers in milliseconds
// DURATION_2 is used in CalendarDay for the fade animation
// DURATION_3 is used in CalendarDayGrid for the slide animation
// DURATION_1 and DURATION_4 are not currently used
export const DURATION_1 = '0.167s'; // motionTokens.durationFast   = 150
export const DURATION_2 = '0.267s'; // motionTokens.durationGentle = 250
export const DURATION_3 = '0.367s'; // motionTokens.durationSlower = 400
export const DURATION_4 = '0.467s'; // motionTokens.durationUltraSlow = 500

export const FADE_IN = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};
export const FADE_OUT = {
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
    visibility: 'hidden' as const,
  },
};
export const SLIDE_DOWN_IN20 = {
  from: {
    pointerEvents: 'none' as const,
    transform: 'translate3d(0, -20px, 0)',
  },
  to: {
    pointerEvents: 'auto' as const,
    transform: 'translate3d(0, 0, 0)',
  },
};
export const SLIDE_LEFT_IN20 = {
  from: {
    pointerEvents: 'none' as const,
    transform: 'translate3d(20px, 0, 0)',
  },
  to: {
    pointerEvents: 'auto' as const,
    transform: 'translate3d(0, 0, 0)',
  },
};
export const SLIDE_RIGHT_IN20 = {
  from: {
    pointerEvents: 'none' as const,
    transform: 'translate3d(-20px, 0, 0)',
  },
  to: {
    pointerEvents: 'auto' as const,
    transform: 'translate3d(0, 0, 0)',
  },
};
export const SLIDE_UP_IN20 = {
  from: {
    pointerEvents: 'none' as const,
    transform: 'translate3d(0, 20px, 0)',
  },
  to: {
    pointerEvents: 'auto' as const,
    transform: 'translate3d(0, 0, 0)',
  },
};
export const SLIDE_DOWN_OUT20 = {
  from: {
    transform: 'translate3d(0, 0, 0)',
  },
  to: {
    transform: 'translate3d(0, 20px, 0)',
  },
};
export const SLIDE_UP_OUT20 = {
  from: {
    transform: 'translate3d(0, 0, 0)',
  },
  to: {
    transform: 'translate3d(0, -20px, 0)',
  },
};

export const TRANSITION_ROW_DISAPPEARANCE = {
  '100%': {
    height: '0px',
    overflow: 'hidden',

    width: '0px',
  },
  '99.9%': {
    height: '28px',
    overflow: 'visible',
    width: '100%',
  },
  '0%': {
    height: '28px',
    overflow: 'visible',
    width: '100%',
  },
};
