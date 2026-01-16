import { motionTokens } from '@fluentui/react-motion';

// === EASING FUNCTIONS ===

/** @deprecated Slide animations now use motion components. Use motionTokens.curveDecelerateMax instead. */
export const EASING_FUNCTION_1 = motionTokens.curveDecelerateMax;

// Used in header fade animations (CalendarDay, CalendarPicker currentItemButton)
export const EASING_FUNCTION_2 = 'cubic-bezier(.1,.25,.75,.9)'; // No exact motion token equivalent

// === DURATIONS ===

/** @deprecated No longer used internally. */
export const DURATION_1 = `${motionTokens.durationFast}ms`;

// Used in header fade animations (CalendarDay, CalendarPicker currentItemButton)
export const DURATION_2 = `${motionTokens.durationGentle}ms`;

/** @deprecated Slide animations now use motion components with motionTokens.durationSlower. */
export const DURATION_3 = `${motionTokens.durationSlower}ms`;

/** @deprecated No longer used internally. */
export const DURATION_4 = `${motionTokens.durationUltraSlow}ms`;

// === FADE ANIMATIONS ===

// Used in header fade animations (CalendarDay, CalendarPicker currentItemButton)
export const FADE_IN = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};

/** @deprecated Slide animations now use motion components. */
export const FADE_OUT = {
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
    visibility: 'hidden' as const,
  },
};

// === SLIDE ANIMATIONS ===

/** @deprecated Slide animations now use DirectionalSlide motion component. */
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

/** @deprecated Slide animations now use DirectionalSlide motion component. */
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

/** @deprecated Slide animations now use DirectionalSlide motion component. */
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

/** @deprecated Slide animations now use DirectionalSlide motion component. */
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

/** @deprecated Slide animations now use DirectionalSlide motion component. */
export const SLIDE_DOWN_OUT20 = {
  from: {
    transform: 'translate3d(0, 0, 0)',
  },
  to: {
    transform: 'translate3d(0, 20px, 0)',
  },
};

/** @deprecated Slide animations now use DirectionalSlide motion component. */
export const SLIDE_UP_OUT20 = {
  from: {
    transform: 'translate3d(0, 0, 0)',
  },
  to: {
    transform: 'translate3d(0, -20px, 0)',
  },
};

// === OTHER TRANSITIONS ===

/** @deprecated No longer used internally. */
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
