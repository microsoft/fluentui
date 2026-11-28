import type { Toast } from '../types';
import { createToaster, reportToastStatus } from './createToaster';

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

  it('uses the supplied callback for a rendered toast status', () => {
    const toaster = createToaster({});
    const managedStatus = jest.fn();
    const renderedStatus = jest.fn();
    toaster.buildToast({ toastId: 'toast', onStatusChange: managedStatus }, () => null);
    const toast = toaster.toasts.get('toast');
    assertToast(toast);

    reportToastStatus({ ...toast, onStatusChange: renderedStatus }, 'visible');

    expect(renderedStatus).toHaveBeenCalledWith(null, expect.objectContaining({ status: 'visible' }));
    expect(managedStatus).not.toHaveBeenCalledWith(null, expect.objectContaining({ status: 'visible' }));
  });

  it('finishes pending unmount reporting when a toast is removed directly', () => {
    const toaster = createToaster({});
    const statuses: string[] = [];
    const onUpdate = jest.fn();
    toaster.buildToast({ toastId: 'toast', onStatusChange: (_, data) => statuses.push(data.status) }, onUpdate);
    const toast = toaster.toasts.get('toast');
    assertToast(toast);
    onUpdate.mockImplementation(() => {
      reportToastStatus(toast, 'unmounted');
      statuses.push('updated');
    });

    toast.remove();

    expect(statuses).toEqual(['queued', 'updated', 'dismissed', 'unmounted']);
  });

  it('preserves errors from both pending dismissal and unmount callbacks', () => {
    const toaster = createToaster({});
    const errors = [new Error('dismissed'), new Error('unmounted')];
    const onUpdate = jest.fn();
    toaster.buildToast(
      {
        toastId: 'toast',
        onStatusChange: (_, data) => {
          if (data.status === 'dismissed') {
            throw errors[0];
          }
          if (data.status === 'unmounted') {
            throw errors[1];
          }
        },
      },
      onUpdate,
    );
    const toast = toaster.toasts.get('toast');
    assertToast(toast);
    onUpdate.mockImplementation(() => reportToastStatus(toast, 'unmounted'));

    expect(() => toast.close()).toThrow(
      expect.objectContaining({ message: 'Multiple errors occurred while reporting toast status', errors }),
    );
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
    const onStatusChange = jest.fn();

    toaster.buildToast({ content: 'foo', toastId: 'foo', onStatusChange }, () => null);
    toaster.dismissToast('foo');

    expect(toaster.visibleToasts.size).toBe(0);
    expect(onStatusChange).toHaveBeenLastCalledWith(null, expect.objectContaining({ status: 'dismissed' }));
  });

  it('removes a dismissed queued toast from the queue', () => {
    const toaster = createToaster({ limit: 1 });
    const onStatusChange = jest.fn();
    toaster.buildToast({ toastId: 'first' }, () => null);
    toaster.buildToast({ toastId: 'second', onStatusChange }, () => null);
    toaster.buildToast({ toastId: 'third' }, () => null);

    toaster.dismissToast('second');

    expect(toaster.getQueuedToastIds()).toEqual(['third']);
    expect(onStatusChange).toHaveBeenLastCalledWith(null, expect.objectContaining({ status: 'dismissed' }));
  });

  it('should dismiss all toasts', () => {
    const toaster = createToaster({});

    toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
    toaster.buildToast({ content: 'foo', toastId: 'bar' }, () => null);
    toaster.buildToast({ content: 'foo', toastId: 'baz' }, () => null);
    toaster.dismissAllToasts();

    expect(toaster.visibleToasts.size).toBe(0);
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

  it('reports queued ids until they are promoted or cleared', () => {
    const toaster = createToaster({ limit: 1 });

    toaster.buildToast({ toastId: 'first' }, () => null);
    toaster.buildToast({ toastId: 'second' }, () => null);
    expect(toaster.getQueuedToastIds()).toEqual(['second']);

    toaster.dismissToast('first');
    expect(toaster.getQueuedToastIds()).toEqual(['second']);

    const first = toaster.toasts.get('first');
    assertToast(first);
    first.remove();
    expect(toaster.getQueuedToastIds()).toEqual([]);
    expect(toaster.isToastVisible('second')).toBe(true);

    toaster.buildToast({ toastId: 'third' }, () => null);
    toaster.dismissAllToasts();
    expect(toaster.getQueuedToastIds()).toEqual([]);
  });

  it('keeps a new arrival behind an existing queue while dismissal is pending', () => {
    const toaster = createToaster({ limit: 1 });
    toaster.buildToast({ toastId: 'first' }, () => null);
    toaster.buildToast({ toastId: 'second' }, () => null);

    toaster.dismissToast('first');
    toaster.buildToast({ toastId: 'third' }, () => null);

    expect(toaster.isToastVisible('third')).toBe(false);
    const first = toaster.toasts.get('first');
    assertToast(first);
    first.remove();
    expect(toaster.isToastVisible('second')).toBe(true);
  });

  it('respects queue priority for arrivals while dismissal is pending', () => {
    const toaster = createToaster({ limit: 1 });
    toaster.buildToast({ toastId: 'first' }, () => null);
    toaster.buildToast({ toastId: 'second', priority: 1 }, () => null);
    toaster.dismissToast('first');
    toaster.buildToast({ toastId: 'third', priority: 0 }, () => null);

    const first = toaster.toasts.get('first');
    assertToast(first);
    first.remove();
    expect(toaster.isToastVisible('third')).toBe(true);
    expect(toaster.isToastVisible('second')).toBe(false);
  });

  it('uses an updated priority for a toast queued during a pending dismissal', () => {
    const toaster = createToaster({ limit: 1 });
    toaster.buildToast({ toastId: 'first' }, () => null);
    toaster.buildToast({ toastId: 'second', priority: 1 }, () => null);
    toaster.dismissToast('first');
    toaster.buildToast({ toastId: 'third', priority: 2 }, () => null);
    toaster.updateToast({ toastId: 'third', priority: 0 });

    const first = toaster.toasts.get('first');
    assertToast(first);
    first.remove();
    expect(toaster.isToastVisible('third')).toBe(true);
  });

  it('keeps instance metadata when toast data is reused to dispatch or update', () => {
    const toaster = createToaster({});
    toaster.buildToast({ toastId: 'first' }, () => null);
    const first = toaster.toasts.get('first');
    assertToast(first);

    toaster.buildToast({ ...first, toastId: 'second' }, () => null);
    const second = toaster.toasts.get('second');
    assertToast(second);
    const secondOrder = second.order;
    const secondClose = second.close;
    const secondRemove = second.remove;
    const secondRef = second.imperativeRef;
    expect(secondOrder).not.toBe(first.order);
    expect(secondClose).not.toBe(first.close);
    expect(secondRemove).not.toBe(first.remove);
    expect(secondRef).not.toBe(first.imperativeRef);

    toaster.updateToast({ ...first, toastId: 'second' });
    expect(second.order).toBe(secondOrder);
    expect(second.close).toBe(secondClose);
    expect(second.remove).toBe(secondRemove);
    expect(second.imperativeRef).toBe(secondRef);
    expect(second.updateId).toBe(1);
  });

  it('does not let an old instance close or remove a same-id replacement', () => {
    const toaster = createToaster({});
    toaster.buildToast({ toastId: 'toast' }, () => null);
    const oldToast = toaster.toasts.get('toast');
    assertToast(oldToast);
    oldToast.close();
    oldToast.remove();

    toaster.buildToast({ toastId: 'toast' }, () => null);
    const replacement = toaster.toasts.get('toast');
    oldToast.close();
    oldToast.remove();

    expect(toaster.toasts.get('toast')).toBe(replacement);
    expect(toaster.isToastVisible('toast')).toBe(true);
  });

  it('does not enqueue a toast removed by its queued callback', () => {
    const toaster = createToaster({ limit: 1 });
    toaster.buildToast({ toastId: 'first' }, () => null);

    toaster.buildToast(
      {
        toastId: 'second',
        onStatusChange: (_, data) => {
          if (data.status === 'queued') {
            toaster.takeAllToasts();
            toaster.buildToast({ toastId: 'replacement' }, () => null);
          }
        },
      },
      () => null,
    );

    expect(toaster.isToastVisible('replacement')).toBe(true);
    expect(toaster.getQueuedToastIds()).toEqual([]);
    expect(Array.from(toaster.toasts.keys())).toEqual(['replacement']);
  });

  it('promotes a queued toast with an empty id', () => {
    const toaster = createToaster({ limit: 1 });
    toaster.buildToast({ toastId: 'first' }, () => null);
    toaster.buildToast({ toastId: '' }, () => null);

    toaster.dismissToast('first');
    const first = toaster.toasts.get('first');
    assertToast(first);
    first.remove();

    expect(toaster.isToastVisible('')).toBe(true);
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
