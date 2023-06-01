import * as React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { Toast } from './Toast';
import { isConformant } from '../../testing/isConformant';
import { ToastProps } from './Toast.types';
import { toastClassNames } from './useToastStyles.styles';

const defaultToastProps: ToastProps = {
  announce: () => null,
  close: () => null,
  content: '',
  data: {},
  dispatchedAt: 0,
  pauseOnHover: false,
  pauseOnWindowBlur: false,
  politeness: 'polite',
  position: 'bottom-left',
  priority: 0,
  remove: () => null,
  timeout: -1,
  toasterId: 'toaster',
  toastId: 'toast',
  updateId: 0,
  visible: true,
};

const runningTimerSelector = '[data-timer-status="running"]';
const pausedTimerSelector = '[data-timer-status="paused"]';

describe('Toast', () => {
  beforeEach(() => {
    jest.useRealTimers();
  });

  isConformant({
    Component: Toast,
    displayName: 'Toast',
    requiredProps: defaultToastProps,
    isInternal: true,
  });

  it('renders a default state', () => {
    const result = render(<Toast {...defaultToastProps}>Default Toast</Toast>);
    expect(result.container).toMatchSnapshot();
  });

  it('should announce on mount', () => {
    const announce = jest.fn();
    const toastProps = { ...defaultToastProps, announce };
    render(<Toast {...toastProps}>Toast</Toast>);

    expect(announce).toHaveBeenCalledTimes(1);
    expect(announce).toHaveBeenCalledWith('Toast', { politeness: 'polite' });
  });

  it('should announce on updateId change', () => {
    const announce = jest.fn();
    const toastProps = { ...defaultToastProps, announce };
    const { rerender } = render(<Toast {...toastProps}>Toast</Toast>);

    toastProps.updateId++;

    rerender(<Toast {...toastProps}>Toast</Toast>);

    expect(announce).toHaveBeenCalledTimes(2);
    expect(announce).toHaveBeenNthCalledWith(2, 'Toast', { politeness: 'polite' });
  });

  it('should announce with configured politeness', () => {
    const announce = jest.fn();
    const toastProps: ToastProps = { ...defaultToastProps, announce, politeness: 'assertive' };
    render(<Toast {...toastProps}>Toast</Toast>);

    expect(announce).toHaveBeenCalledTimes(1);
    expect(announce).toHaveBeenCalledWith('Toast', { politeness: 'assertive' });
  });

  it('should respect user root', () => {
    const className = 'foo';
    const toastProps: ToastProps = { ...defaultToastProps, data: { root: { className } } };
    const { container } = render(<Toast {...toastProps}>Toast</Toast>);

    expect(container.querySelector(`.${className}`)).not.toBe(null);
  });

  it('should remove toast after visible is false', () => {
    jest.useFakeTimers();
    const remove = jest.fn();
    const toastProps: ToastProps = { ...defaultToastProps, remove };
    const { rerender } = render(<Toast {...toastProps}>Toast</Toast>);
    toastProps.visible = false;
    rerender(<Toast {...toastProps}>Toast</Toast>);

    jest.advanceTimersByTime(500);

    expect(remove).toHaveBeenCalledTimes(1);
  });

  it('should start timer after toast on animationend', () => {
    const toastProps: ToastProps = { ...defaultToastProps, timeout: 1 };
    const { container } = render(<Toast {...toastProps}>Toast</Toast>);

    const toastElement = container.querySelector(`.${toastClassNames.root}`);
    expect(toastElement).not.toBeNull();
    act(() => {
      if (toastElement) {
        fireEvent.animationEnd(toastElement);
      }
    });

    expect(container.querySelector(runningTimerSelector)).not.toBeNull();
  });

  it('should close toast ontimeout', () => {
    const close = jest.fn();
    const toastProps: ToastProps = { ...defaultToastProps, timeout: 1, close };
    const { container } = render(<Toast {...toastProps}>Toast</Toast>);

    const toastElement = container.querySelector(`.${toastClassNames.root}`);
    expect(toastElement).not.toBeNull();
    act(() => {
      if (toastElement) {
        fireEvent.animationEnd(toastElement);
      }
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
    const toastProps: ToastProps = { ...defaultToastProps, timeout: 1, pauseOnHover: true };
    const { container } = render(<Toast {...toastProps}>Toast</Toast>);

    const toastElement = container.querySelector(`.${toastClassNames.root}`);
    expect(toastElement).not.toBeNull();
    act(() => {
      if (toastElement) {
        fireEvent.animationEnd(toastElement);
      }
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
    const toastProps: ToastProps = { ...defaultToastProps, timeout: 1, pauseOnWindowBlur: true };
    const { container } = render(<Toast {...toastProps}>Toast</Toast>);

    const toastElement = container.querySelector(`.${toastClassNames.root}`);
    expect(toastElement).not.toBeNull();
    act(() => {
      if (toastElement) {
        fireEvent.animationEnd(toastElement);
      }
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
    const toastProps: ToastProps = { ...defaultToastProps, timeout: 1 };
    const { container, rerender } = render(<Toast {...toastProps}>Toast</Toast>);

    const firstTimer = container.querySelector(pausedTimerSelector);
    expect(firstTimer).not.toBeNull();

    toastProps.updateId++;
    rerender(<Toast {...toastProps}>Toast</Toast>);

    const secondTimer = container.querySelector(pausedTimerSelector);
    expect(firstTimer).not.toBe(secondTimer);
  });
});
