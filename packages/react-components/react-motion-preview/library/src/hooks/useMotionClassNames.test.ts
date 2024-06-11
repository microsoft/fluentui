import { renderHook } from '@testing-library/react-hooks';

import { useMotionClassNames } from './useMotionClassNames';
import * as reducedMotionStyles from '../styles/useReducedMotionStyles.styles';
import { getDefaultMotionState, MotionState } from './useMotion';

describe('useMotionClassNames', () => {
  let useReducedMotionStylesMock: jest.SpyInstance;
  let consoleWarnMock: jest.SpyInstance;

  beforeEach(() => {
    useReducedMotionStylesMock = jest.spyOn(reducedMotionStyles, 'useReducedMotionStyles').mockReturnValue({
      reduced: 'reduced',
    });
    consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation(message => message);
  });

  afterEach(() => jest.restoreAllMocks());

  it('should include reduced motion styles by default', () => {
    const motion = getDefaultMotionState();
    const { result } = renderHook(() => useMotionClassNames(motion, {}));

    expect(useReducedMotionStylesMock).toHaveBeenCalled();
    expect(result.current).toBe('reduced');
  });

  it('should return the default class name if provided', () => {
    const motion = getDefaultMotionState();
    const { result } = renderHook(() =>
      useMotionClassNames(motion, {
        default: 'default',
      }),
    );

    expect(result.current.includes('default')).toBe(true);
  });

  it('should include styles when MotionType changes', () => {
    let motion = getDefaultMotionState();
    const motionTypes = ['entering', 'exiting', 'idle', 'exiting', 'exited', 'unmounted'] as const;
    const { result, rerender } = renderHook(() =>
      useMotionClassNames(
        motion,
        motionTypes.reduce((acc, type) => ({ ...acc, [type]: type }), {}),
      ),
    );

    motionTypes.forEach(type => {
      motion = { ...motion, type };
      rerender();

      expect(result.current.includes(type)).toBe(true);
    });
  });

  it('should handle "enter" className when "active" change its value', () => {
    let motion: MotionState = { ...getDefaultMotionState(), active: true };
    const { result, rerender } = renderHook(() =>
      useMotionClassNames(motion, {
        enter: 'enter',
      }),
    );

    expect(result.current.includes('enter')).toBe(true);

    motion = { ...motion, active: false };
    rerender();

    expect(result.current.includes('enter')).toBe(false);
  });

  it('should include "enter" className when MotionType is "idle"', () => {
    let motion: MotionState = { ...getDefaultMotionState(), type: 'idle' };
    const { result, rerender } = renderHook(() =>
      useMotionClassNames(motion, {
        enter: 'enter',
      }),
    );

    expect(result.current.includes('enter')).toBe(true);

    motion = { ...motion, type: 'exiting' };
    rerender();

    expect(result.current.includes('enter')).toBe(false);
  });

  it('should handle "exit" className when "active" change its value', () => {
    let motion: MotionState = { ...getDefaultMotionState(), active: true };
    const { result, rerender } = renderHook(() =>
      useMotionClassNames(motion, {
        exit: 'exit',
      }),
    );

    expect(result.current.includes('exit')).toBe(false);

    motion = { ...motion, active: false };
    rerender();

    expect(result.current.includes('exit')).toBe(true);
  });

  it('should warn when one of the provided classNames is not allowed', () => {
    const allowedTypes = ['default', 'enter', 'exit', 'entering', 'entered', 'idle', 'exiting', 'exited', 'unmounted'];
    const { result } = renderHook(() =>
      useMotionClassNames(getDefaultMotionState(), {
        // @ts-expect-error - In case the TS check fails, we want to test the warning
        notAllowed: 'notAllowed',
      }),
    );

    expect(consoleWarnMock).toHaveBeenCalled();
    expect(consoleWarnMock).toHaveBeenCalledWith(
      [
        `@fluentui/react-motion-preview [assertMotionStyles]:`,
        `The property "notAllowed" is not a valid motion style key!`,
        `The valid keys are: "${allowedTypes.join(', ')}".`,
        'Be sure to create motion styles properly.',
      ].join('\n'),
    );
    expect(result.current).toBe('reduced');
  });
});
