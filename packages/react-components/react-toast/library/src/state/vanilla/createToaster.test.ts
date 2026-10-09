import type { Toast, ToastChangeData } from '../types';
import { createToaster } from './createToaster';

describe('createToaster', () => {
  function assertToast(toast: Toast | undefined): asserts toast is Toast {
    if (toast === undefined) {
      throw new Error('Toast is undefined');
    }
  }

  it('should have defaults without user config', () => {
    const toaster = createToaster({});

    toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
    const toast = toaster.toasts.get('foo');
    assertToast(toast);
    expect(toast).toEqual({
      close: expect.any(Function),
      content: 'foo',
      data: {},
      order: expect.any(Number),
      onStatusChange: undefined,
      pauseOnHover: false,
      pauseOnWindowBlur: false,
      position: 'bottom-end',
      priority: 0,
      remove: expect.any(Function),
      timeout: 3000,
      toastId: 'foo',
      toasterId: undefined,
      updateId: 0,
      imperativeRef: { current: null },
    });
  });

  it('should make a toast visible', () => {
    const toaster = createToaster({});

    toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);

    expect(toaster.toasts.size).toBe(1);
    expect(toaster.visibleToasts.size).toBe(1);
    expect(toaster.visibleToasts.has('foo')).toBe(true);
  });

  it('should make a toast visible', () => {
    const toaster = createToaster({});

    toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);

    expect(toaster.toasts.size).toBe(1);
    expect(toaster.visibleToasts.size).toBe(1);
    expect(toaster.visibleToasts.has('foo')).toBe(true);
  });

  it('should close a toast', () => {
    const toaster = createToaster({});

    toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
    const toast = toaster.toasts.get('foo');
    assertToast(toast);
    toast.close();

    expect(toaster.visibleToasts.size).toBe(0);
  });

  it('should remove a toast', () => {
    const toaster = createToaster({});

    toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
    const toast = toaster.toasts.get('foo');
    assertToast(toast);
    toast.close();
    toast.remove();

    expect(toaster.visibleToasts.size).toBe(0);
    expect(toaster.toasts.size).toBe(0);
  });

  it('should dismiss a toast', () => {
    const toaster = createToaster({});

    toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
    toaster.dismissToast('foo');

    expect(toaster.visibleToasts.size).toBe(0);
  });

  it('should report dismissal before the toast is removed', () => {
    const toaster = createToaster({});
    const onStatusChange = jest.fn();
    const onUpdate = jest.fn();

    toaster.buildToast({ content: 'foo', toastId: 'foo', onStatusChange }, onUpdate);
    onStatusChange.mockClear();
    toaster.dismissToast('foo');

    expect(toaster.isToastVisible('foo')).toBe(false);
    expect(toaster.toasts.has('foo')).toBe(true);
    expect(onUpdate).toHaveBeenCalledTimes(1);
    expect(onStatusChange).toHaveBeenCalledTimes(1);
    expect(onStatusChange).toHaveBeenCalledWith(null, expect.objectContaining({ toastId: 'foo', status: 'dismissed' }));
  });

  it.each(['close', 'dismissToast'] as const)('should report dismissal only once when %s happens first', first => {
    const toaster = createToaster({});
    const onStatusChange = jest.fn();
    const onUpdate = jest.fn();

    toaster.buildToast({ content: 'foo', toastId: 'foo', onStatusChange }, onUpdate);
    const toast = toaster.toasts.get('foo');
    assertToast(toast);
    onStatusChange.mockClear();

    if (first === 'close') {
      toast.close();
    } else {
      toaster.dismissToast('foo');
    }
    toaster.dismissToast('foo');
    toast.close();

    expect(onStatusChange).toHaveBeenCalledTimes(1);
    expect(onStatusChange).toHaveBeenCalledWith(null, expect.objectContaining({ status: 'dismissed' }));
    expect(onUpdate).toHaveBeenCalledTimes(1);
  });

  it('should ignore dismissal of unknown or queued toasts', () => {
    const toaster = createToaster({ limit: 1 });
    const onStatusChange = jest.fn();

    toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
    toaster.buildToast({ content: 'bar', toastId: 'bar', onStatusChange }, () => null);
    onStatusChange.mockClear();
    toaster.dismissToast('missing');
    toaster.dismissToast('bar');

    expect(onStatusChange).not.toHaveBeenCalled();
    expect(toaster.isToastVisible('foo')).toBe(true);
    toaster.toasts.get('foo')?.close();
    toaster.toasts.get('foo')?.remove();
    expect(toaster.isToastVisible('bar')).toBe(true);
  });

  it('should dismiss all toasts', () => {
    const toaster = createToaster({});

    toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
    toaster.buildToast({ content: 'foo', toastId: 'bar' }, () => null);
    toaster.buildToast({ content: 'foo', toastId: 'baz' }, () => null);
    toaster.dismissAllToasts();

    expect(toaster.visibleToasts.size).toBe(0);
  });

  it('should report dismissal for each visible toast and clear the queue before notifying', () => {
    const toaster = createToaster({ limit: 2 });
    const onStatusChange = jest.fn((_: null, { status, toastId }: ToastChangeData) => {
      if (status === 'dismissed') {
        toaster.toasts.get(toastId)?.remove();
      }
    });
    const onQueuedStatusChange = jest.fn();

    toaster.buildToast({ content: 'foo', toastId: 'foo', onStatusChange }, () => null);
    toaster.buildToast({ content: 'bar', toastId: 'bar', onStatusChange }, () => null);
    toaster.buildToast({ content: 'baz', toastId: 'baz', onStatusChange: onQueuedStatusChange }, () => null);
    onStatusChange.mockClear();
    onQueuedStatusChange.mockClear();
    toaster.dismissAllToasts();

    expect(onStatusChange).toHaveBeenCalledTimes(2);
    expect(onStatusChange).toHaveBeenNthCalledWith(
      1,
      null,
      expect.objectContaining({ toastId: 'foo', status: 'dismissed' }),
    );
    expect(onStatusChange).toHaveBeenNthCalledWith(
      2,
      null,
      expect.objectContaining({ toastId: 'bar', status: 'dismissed' }),
    );
    expect(onQueuedStatusChange).not.toHaveBeenCalled();
    expect(toaster.visibleToasts.size).toBe(0);
  });

  it('should leave toasts dispatched by a dismissal callback visible', () => {
    const toaster = createToaster({});
    const onStatusChange = jest.fn((_: null, { status }: ToastChangeData) => {
      if (status === 'dismissed') {
        toaster.buildToast({ content: 'new', toastId: 'new' }, () => null);
      }
    });

    toaster.buildToast({ content: 'foo', toastId: 'foo', onStatusChange }, () => null);
    toaster.buildToast({ content: 'bar', toastId: 'bar' }, () => null);
    toaster.dismissAllToasts();

    expect(toaster.visibleToasts).toEqual(new Set(['new']));
  });

  it('should update a toasts', () => {
    const toaster = createToaster({});

    toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
    toaster.updateToast({ content: 'bar', toastId: 'foo' });

    const toast = toaster.toasts.get('foo');
    assertToast(toast);

    expect(toast.content).toBe('bar');
    expect(toast.updateId).toBe(1);
  });

  it('should not have more visible toasts than the limit', () => {
    const toaster = createToaster({ limit: 1 });

    toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
    toaster.buildToast({ content: 'foo', toastId: 'bar' }, () => null);

    expect(toaster.visibleToasts.has('bar')).toBe(false);
  });

  it('should dequeue new toast from queue after toast is removed', () => {
    const toaster = createToaster({ limit: 1 });

    toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
    toaster.buildToast({ content: 'foo', toastId: 'bar' }, () => null);

    const toast = toaster.toasts.get('foo');
    assertToast(toast);
    toast.remove();

    expect(toaster.visibleToasts.size).toBe(1);
    expect(toaster.toasts.get('bar')).not.toBeUndefined();
  });

  it('should set default toast options', () => {
    const toaster = createToaster({ position: 'top-end' });

    toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);

    const toast = toaster.toasts.get('foo');
    assertToast(toast);
    expect(toast.position).toBe('top-end');
  });

  it('should let toast options win over defaults', () => {
    const toaster = createToaster({ position: 'top-end' });

    toaster.buildToast({ content: 'foo', toastId: 'foo', position: 'bottom-start' }, () => null);

    const toast = toaster.toasts.get('foo');
    assertToast(toast);
    expect(toast.position).toBe('bottom-start');
  });

  it('should dequeue toasts in priority', () => {
    const toaster = createToaster({ limit: 1 });

    toaster.buildToast({ content: 'foo', toastId: 'one', priority: 1 }, () => null);
    toaster.buildToast({ content: 'foo', toastId: 'two', priority: 2 }, () => null);
    toaster.buildToast({ content: 'foo', toastId: 'four', priority: 4 }, () => null);

    expect(toaster.visibleToasts.has('one')).toBe(true);
    const one = toaster.toasts.get('one');
    assertToast(one);
    one.close();
    one.remove();

    expect(toaster.visibleToasts.has('one')).toBe(false);
    expect(toaster.visibleToasts.has('four')).toBe(false);
    const four = toaster.toasts.get('four');
    assertToast(four);
    four.close();
    four.remove();

    expect(toaster.visibleToasts.has('two')).toBe(true);
  });
});
