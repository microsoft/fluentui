import { EVENTS } from './constants';
import type { Toast, ToastId } from './types';
import { useToaster } from './useToaster';
import { createToaster } from './vanilla/createToaster';
import { renderHook, act } from '@testing-library/react-hooks';

jest.mock('./vanilla/createToaster.ts', () => ({
  ...jest.requireActual('./vanilla/createToaster.ts'),
  createToaster: jest.fn(),
}));

type Toaster = ReturnType<typeof createToaster>;

describe('useToaster', () => {
  const mockToaster = (options?: Partial<Toaster>): Toaster => {
    const mock: Toaster = {
      buildToast: jest.fn(),
      dismissAllToasts: jest.fn(),
      dismissToast: jest.fn(),
      getQueuedToastIds: jest.fn(() => []),
      updateToast: jest.fn(),
      isToastVisible: jest.fn(),
      takeAllToasts: jest.fn(() => []),
      toasts: new Map<ToastId, Toast>(),
      visibleToasts: new Set<ToastId>(),
      ...options,
    };

    (createToaster as jest.Mock).mockReturnValue(mock);
    return mock;
  };
  beforeEach(() => {
    mockToaster();
  });

  it('should register document event handlers', () => {
    const toaster = mockToaster();
    renderHook(() => useToaster());

    const detail = { toasterId: undefined };
    act(() => {
      document.dispatchEvent(new CustomEvent(EVENTS.dismiss, { detail }));
      document.dispatchEvent(new CustomEvent(EVENTS.update, { detail }));
      document.dispatchEvent(new CustomEvent(EVENTS.dismissAll, { detail }));
      document.dispatchEvent(new CustomEvent(EVENTS.show, { detail }));
    });

    expect(toaster.buildToast).toHaveBeenCalledTimes(1);
    expect(toaster.updateToast).toHaveBeenCalledTimes(1);
    expect(toaster.dismissAllToasts).toHaveBeenCalledTimes(1);
    expect(toaster.dismissToast).toHaveBeenCalledTimes(1);
  });

  it('should respect toasterId for events', () => {
    const toaster = mockToaster();
    renderHook(() => useToaster({ toasterId: 'foo' }));

    const detail = { toasterId: 'bar' };
    act(() => {
      document.dispatchEvent(new CustomEvent(EVENTS.dismiss, { detail }));
      document.dispatchEvent(new CustomEvent(EVENTS.update, { detail }));
      document.dispatchEvent(new CustomEvent(EVENTS.dismissAll, { detail }));
      document.dispatchEvent(new CustomEvent(EVENTS.show, { detail }));
    });

    expect(toaster.buildToast).toHaveBeenCalledTimes(0);
    expect(toaster.updateToast).toHaveBeenCalledTimes(0);
    expect(toaster.dismissAllToasts).toHaveBeenCalledTimes(0);
    expect(toaster.dismissToast).toHaveBeenCalledTimes(0);
  });

  it('finishes dismissing and restores focus when a dismissal callback throws', () => {
    const actualCreateToaster: typeof createToaster = jest.requireActual('./vanilla/createToaster.ts').createToaster;
    const toaster = actualCreateToaster({});
    const error = new Error('dismissal failed');
    const secondStatus = jest.fn();
    toaster.buildToast(
      {
        toastId: 'first',
        onStatusChange: (_, data) => {
          if (data.status === 'dismissed') {
            throw error;
          }
        },
      },
      jest.fn(),
    );
    toaster.buildToast({ toastId: 'second', onStatusChange: secondStatus }, jest.fn());
    const second = toaster.toasts.get('second');
    if (!second) {
      throw new Error('Second toast was not created');
    }

    const trigger = document.createElement('button');
    const toast = document.createElement('button');
    document.body.append(trigger, toast);
    try {
      second.imperativeRef.current = { focus: () => toast.focus(), pause: jest.fn(), play: jest.fn() };
      mockToaster(toaster);
      const { result } = renderHook(() => useToaster({ shortcuts: { focus: event => event.key === 'F2' } }));
      trigger.focus();
      act(() => {
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'F2' }));
      });
      expect(document.activeElement).toBe(toast);

      expect(() => act(() => result.current.closeAllToasts({ immediate: true }))).toThrow(error);
      expect(secondStatus).toHaveBeenCalledWith(null, expect.objectContaining({ status: 'dismissed' }));
      expect(document.activeElement).toBe(trigger);
    } finally {
      trigger.remove();
      toast.remove();
    }
  });

  it('preserves multiple errors from dismissal callbacks', () => {
    const actualCreateToaster: typeof createToaster = jest.requireActual('./vanilla/createToaster.ts').createToaster;
    const toaster = actualCreateToaster({});
    const errors = [new Error('first'), new Error('second')];
    errors.forEach((error, index) => {
      toaster.buildToast(
        {
          toastId: String(index),
          onStatusChange: (_, data) => {
            if (data.status === 'dismissed') {
              throw error;
            }
          },
        },
        jest.fn(),
      );
    });
    mockToaster(toaster);
    const { result } = renderHook(() => useToaster());
    let thrown: unknown;

    try {
      act(() => result.current.closeAllToasts({ immediate: true }));
    } catch (error) {
      thrown = error;
    }

    expect(thrown).toEqual(
      expect.objectContaining({ message: 'Multiple errors occurred while dismissing toasts', errors }),
    );
  });
});
