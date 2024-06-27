import * as React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { ToastContainer } from './ToastContainer';
import { isConformant } from '../../testing/isConformant';
import { ToastContainerProps } from './ToastContainer.types';
import { toastContainerClassNames } from './useToastContainerStyles.styles';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { type PresenceComponentProps } from '@fluentui/react-motion';

const defaultToastContainerProps: ToastContainerProps = {
  announce: () => null,
  close: () => null,
  data: {},
  pauseOnHover: false,
  pauseOnWindowBlur: false,
  politeness: 'polite',
  remove: () => null,
  timeout: -1,
  intent: undefined,
  updateId: 0,
  visible: true,
  imperativeRef: { current: null },
  tryRestoreFocus: () => null,
  order: 0,
  content: '',
  onStatusChange: () => null,
  position: 'bottom-end',
  toastId: '',
  priority: 0,
  toasterId: '',
};

const runningTimerSelector = '[data-timer-status="running"]';
const pausedTimerSelector = '[data-timer-status="paused"]';

const FAKE_MOTION_DURATION = 500;

jest.mock('./ToastContainerMotion', () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ToastContainerMotion: (props: PresenceComponentProps) => {
    const { children, onMotionFinish, visible } = props;

    React.useEffect(() => {
      const timeout = setTimeout(() => {
        onMotionFinish?.(null, { direction: visible ? 'enter' : 'exit' });
      }, FAKE_MOTION_DURATION);

      return () => {
        clearTimeout(timeout);
      };
    }, [onMotionFinish, visible]);

    return <>{children}</>;
  },
}));

describe('ToastContainer', () => {
  beforeEach(() => {
    jest.useRealTimers();
    resetIdsForTests();
  });

  isConformant({
    Component: ToastContainer,
    displayName: 'ToastContainer',
    requiredProps: defaultToastContainerProps,
    isInternal: true,
    disabledTests: [
      'consistent-callback-args',
      // There are conflicts between ToastContainerMotion mock and React
      'make-styles-overrides-win',
    ],
  });

  it('renders a default state', () => {
    const result = render(<ToastContainer {...defaultToastContainerProps}>Default ToastContainer</ToastContainer>);
    expect(result.container).toMatchSnapshot();
  });

  it('should announce on mount', () => {
    const announce = jest.fn();
    const toastProps = { ...defaultToastContainerProps, announce };
    render(<ToastContainer {...toastProps}>ToastContainer</ToastContainer>);

    expect(announce).toHaveBeenCalledTimes(1);
    expect(announce).toHaveBeenCalledWith('ToastContainer', { politeness: 'polite' });
  });

  it('should announce on updateId change', () => {
    const announce = jest.fn();
    const toastProps = { ...defaultToastContainerProps, announce };
    const { rerender } = render(<ToastContainer {...toastProps}>ToastContainer</ToastContainer>);

    toastProps.updateId++;

    rerender(<ToastContainer {...toastProps}>ToastContainer</ToastContainer>);

    expect(announce).toHaveBeenCalledTimes(2);
    expect(announce).toHaveBeenNthCalledWith(2, 'ToastContainer', { politeness: 'polite' });
  });

  it('should announce with configured politeness', () => {
    const announce = jest.fn();
    const toastProps: ToastContainerProps = { ...defaultToastContainerProps, announce, politeness: 'assertive' };
    render(<ToastContainer {...toastProps}>ToastContainer</ToastContainer>);

    expect(announce).toHaveBeenCalledTimes(1);
    expect(announce).toHaveBeenCalledWith('ToastContainer', { politeness: 'assertive' });
  });

  it('should respect user root', () => {
    const className = 'foo';
    const toastProps: ToastContainerProps = { ...defaultToastContainerProps, data: { root: { className } } };
    const { container } = render(<ToastContainer {...toastProps}>ToastContainer</ToastContainer>);

    expect(container.querySelector(`.${className}`)).not.toBe(null);
  });

  it('should remove toast after visible is false', () => {
    jest.useFakeTimers();
    const remove = jest.fn();
    const toastProps: ToastContainerProps = { ...defaultToastContainerProps, remove };
    const { rerender } = render(<ToastContainer {...toastProps}>ToastContainer</ToastContainer>);
    toastProps.visible = false;
    rerender(<ToastContainer {...toastProps}>ToastContainer</ToastContainer>);

    jest.advanceTimersByTime(500);

    expect(remove).toHaveBeenCalledTimes(1);
  });

  it('should start timer after toast on animationend', () => {
    jest.useFakeTimers();

    const toastProps: ToastContainerProps = { ...defaultToastContainerProps, timeout: 1 };
    const { container } = render(<ToastContainer {...toastProps}>ToastContainer</ToastContainer>);

    const toastElement = container.querySelector(`.${toastContainerClassNames.root}`);
    expect(toastElement).not.toBeNull();
    act(() => {
      jest.advanceTimersToNextTimer(FAKE_MOTION_DURATION);
    });

    expect(container.querySelector(runningTimerSelector)).not.toBeNull();
  });

  it('should close toast ontimeout', () => {
    jest.useFakeTimers();

    const close = jest.fn();
    const toastProps: ToastContainerProps = { ...defaultToastContainerProps, timeout: 500, close };
    const { container } = render(<ToastContainer {...toastProps}>ToastContainer</ToastContainer>);

    const toastElement = container.querySelector(`.${toastContainerClassNames.root}`);
    expect(toastElement).not.toBeNull();

    act(() => {
      jest.advanceTimersByTime(FAKE_MOTION_DURATION);
    });

    const timer = container.querySelector(runningTimerSelector);
    expect(timer).not.toBeNull();

    act(() => {
      if (timer) {
        fireEvent.animationEnd(timer);
      }
    });

    expect(close).toHaveBeenCalledTimes(1);
  });

  it('should pause on hover', () => {
    jest.useFakeTimers();

    const toastProps: ToastContainerProps = { ...defaultToastContainerProps, timeout: 1, pauseOnHover: true };
    const { container } = render(<ToastContainer {...toastProps}>ToastContainer</ToastContainer>);

    const toastElement = container.querySelector(`.${toastContainerClassNames.root}`);
    expect(toastElement).not.toBeNull();

    act(() => {
      jest.advanceTimersToNextTimer(FAKE_MOTION_DURATION);
    });

    expect(container.querySelector(runningTimerSelector)).not.toBeNull();

    act(() => {
      if (toastElement) {
        fireEvent.mouseEnter(toastElement);
      }
    });

    expect(container.querySelector(pausedTimerSelector)).not.toBeNull();

    act(() => {
      if (toastElement) {
        fireEvent.mouseLeave(toastElement);
      }
    });

    expect(container.querySelector(runningTimerSelector)).not.toBeNull();
  });

  it('should pause on window blur', () => {
    jest.useFakeTimers();

    const toastProps: ToastContainerProps = { ...defaultToastContainerProps, timeout: 1, pauseOnWindowBlur: true };
    const { container } = render(<ToastContainer {...toastProps}>ToastContainer</ToastContainer>);

    const toastElement = container.querySelector(`.${toastContainerClassNames.root}`);
    expect(toastElement).not.toBeNull();

    act(() => {
      jest.advanceTimersByTime(FAKE_MOTION_DURATION);
    });

    expect(container.querySelector(runningTimerSelector)).not.toBeNull();

    act(() => {
      fireEvent.blur(window);
    });

    expect(container.querySelector(pausedTimerSelector)).not.toBeNull();

    act(() => {
      fireEvent.focus(window);
    });

    expect(container.querySelector(runningTimerSelector)).not.toBeNull();
  });

  it('should render different timer on update', () => {
    const toastProps: ToastContainerProps = { ...defaultToastContainerProps, timeout: 1 };
    const { container, rerender } = render(<ToastContainer {...toastProps}>ToastContainer</ToastContainer>);

    const firstTimer = container.querySelector(pausedTimerSelector);
    expect(firstTimer).not.toBeNull();

    toastProps.updateId++;
    rerender(<ToastContainer {...toastProps}>ToastContainer</ToastContainer>);

    const secondTimer = container.querySelector(pausedTimerSelector);
    expect(firstTimer).not.toBe(secondTimer);
  });
});
