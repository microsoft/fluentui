import { EVENTS } from './constants';
import { Toast, ToastId } from './types';
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
});
