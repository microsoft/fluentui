import { motionTokens } from '@fluentui/react-motion';

export const EASING_FUNCTION_1 = motionTokens.curveDecelerateMax;
// This is nearly linear easing - no exact motion token equivalent
export const EASING_FUNCTION_2 = 'cubic-bezier(.1,.25,.75,.9)';

// Duration constants for CSS animations
// DURATION_2 is used in CalendarDay/CalendarPicker for the fade animation (CSS)
// DURATION_3 is no longer used - slide animations now use motion components directly
export const DURATION_1 = `${motionTokens.durationFast}ms`;
export const DURATION_2 = `${motionTokens.durationGentle}ms`;
export const DURATION_3 = `${motionTokens.durationSlower}ms`;
export const DURATION_4 = `${motionTokens.durationUltraSlow}ms`;

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
