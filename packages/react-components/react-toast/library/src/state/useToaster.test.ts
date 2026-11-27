import { EVENTS } from './constants';
import type { Toast, ToastId } from './types';
import { useToaster } from './useToaster';
import { createToaster } from './vanilla/createToaster';
import { renderHook, act } from '@testing-library/react-hooks';

jest.mock('./vanilla/createToaster.ts');

type Toaster = ReturnType<typeof createToaster>;

describe('useToaster', () => {
  const mockToaster = (options?: Partial<Toaster>): Toaster => {
    const mock: Toaster = {
      buildToast: jest.fn(),
      dismissAllToasts: jest.fn(),
      dismissToast: jest.fn(),
      updateToast: jest.fn(),
      isToastVisible: jest.fn(),
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

  it('should close a toast once when its dismissed handler dispatches a toast with the same id', () => {
    const actual: { createToaster: typeof createToaster } = jest.requireActual('./vanilla/createToaster');
    (createToaster as jest.Mock).mockImplementation(actual.createToaster);
    const { result } = renderHook(() => useToaster());

    const statuses: string[] = [];
    const show = (content: string) => {
      const onStatusChange = (_: null, data: { status: string }) => {
        statuses.push(`${content} ${data.status}`);
        if (content === 'first' && data.status === 'dismissed') {
          show('second');
        }
      };
      const detail = { toasterId: undefined, toastId: 'foo', content, onStatusChange };
      document.dispatchEvent(new CustomEvent(EVENTS.show, { detail }));
    };

    act(() => show('first'));
    act(() => result.current.closeAllToasts());

    expect(statuses).toEqual(['first queued', 'first dismissed', 'second queued']);
    expect(result.current.isToastVisible('foo')).toBe(true);
  });

  it('should not close a toast that a dismissed handler dispatches with the id of another visible toast', () => {
    const actual: { createToaster: typeof createToaster } = jest.requireActual('./vanilla/createToaster');
    (createToaster as jest.Mock).mockImplementation(actual.createToaster);
    const { result } = renderHook(() => useToaster());

    const statuses: string[] = [];
    const show = (toastId: string, content: string) => {
      const onStatusChange = (_: null, data: { status: string }) => {
        statuses.push(`${content} ${data.status}`);
        if (content === 'first' && data.status === 'dismissed') {
          document.dispatchEvent(new CustomEvent(EVENTS.dismiss, { detail: { toasterId: undefined, toastId: 'bar' } }));
          show('bar', 'replacement');
        }
      };
      const detail = { toasterId: undefined, toastId, content, onStatusChange };
      document.dispatchEvent(new CustomEvent(EVENTS.show, { detail }));
    };

    act(() => {
      show('foo', 'first');
      show('bar', 'second');
    });
    act(() => result.current.closeAllToasts());

    expect(statuses).toContain('replacement queued');
    expect(statuses).not.toContain('replacement dismissed');
    expect(result.current.isToastVisible('foo')).toBe(false);
    expect(result.current.isToastVisible('bar')).toBe(true);
  });
});
