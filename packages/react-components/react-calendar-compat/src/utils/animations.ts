export const EASING_FUNCTION_1 = 'cubic-bezier(.1,.9,.2,1)';
export const EASING_FUNCTION_2 = 'cubic-bezier(.1,.25,.75,.9)';
export const DURATION_1 = '0.167s';
export const DURATION_2 = '0.267s';
export const DURATION_3 = '0.367s';
export const DURATION_4 = '0.467s';

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
