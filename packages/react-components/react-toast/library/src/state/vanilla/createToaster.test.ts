import type { Toast } from '../types';
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

  it('should ignore a toast that uses the id of a visible toast', () => {
    const toaster = createToaster({});

    toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
    toaster.buildToast({ content: 'bar', toastId: 'foo' }, () => null);

    const toast = toaster.toasts.get('foo');
    assertToast(toast);
    expect(toaster.toasts.size).toBe(1);
    expect(toast.content).toBe('foo');
  });

  it('should ignore a toast that uses the id of a queued toast', () => {
    const toaster = createToaster({ limit: 1 });

    toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
    toaster.buildToast({ content: 'bar', toastId: 'bar' }, () => null);
    toaster.buildToast({ content: 'baz', toastId: 'bar' }, () => null);

    const toast = toaster.toasts.get('bar');
    assertToast(toast);
    expect(toaster.toasts.size).toBe(2);
    expect(toast.content).toBe('bar');
  });

  it('should show a toast that uses the id of a dismissed toast that is not removed yet', () => {
    const toaster = createToaster({});
    const onStatusChange = jest.fn();

    toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
    toaster.dismissToast('foo');
    toaster.buildToast({ content: 'bar', toastId: 'foo', onStatusChange }, () => null);

    const toast = toaster.toasts.get('foo');
    assertToast(toast);
    expect(toaster.toasts.size).toBe(1);
    expect(toast.content).toBe('bar');
    expect(toaster.visibleToasts.has('foo')).toBe(true);
    expect(onStatusChange).toHaveBeenCalledTimes(1);
    expect(onStatusChange).toHaveBeenCalledWith(null, expect.objectContaining({ status: 'queued' }));
  });

  it('should show a toast that uses the id of a closed toast that is not removed yet', () => {
    const toaster = createToaster({});

    toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
    const closed = toaster.toasts.get('foo');
    assertToast(closed);
    closed.close();
    toaster.buildToast({ content: 'bar', toastId: 'foo' }, () => null);

    const toast = toaster.toasts.get('foo');
    assertToast(toast);
    expect(toast.content).toBe('bar');
    expect(toaster.visibleToasts.has('foo')).toBe(true);
  });

  it('should let a queued toast take the free slot before a toast that reuses a dismissed id', () => {
    const toaster = createToaster({ limit: 1 });

    toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
    toaster.buildToast({ content: 'bar', toastId: 'bar' }, () => null);
    toaster.dismissToast('foo');
    toaster.buildToast({ content: 'baz', toastId: 'foo' }, () => null);

    const toast = toaster.toasts.get('foo');
    assertToast(toast);
    expect(toast.content).toBe('baz');
    expect(toaster.visibleToasts.has('bar')).toBe(true);
    expect(toaster.visibleToasts.has('foo')).toBe(false);

    // The toast that reuses the id waits in the queue and is shown once the slot is free again
    const bar = toaster.toasts.get('bar');
    assertToast(bar);
    bar.close();
    bar.remove();
    expect(toaster.visibleToasts.has('foo')).toBe(true);
  });

  it('should not let the callbacks of a replaced toast affect the toast that reuses its id', () => {
    const toaster = createToaster({});

    toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
    const replaced = toaster.toasts.get('foo');
    assertToast(replaced);
    toaster.dismissToast('foo');
    toaster.buildToast({ content: 'bar', toastId: 'foo' }, () => null);

    replaced.close();
    replaced.remove();

    const toast = toaster.toasts.get('foo');
    assertToast(toast);
    expect(toast.content).toBe('bar');
    expect(toaster.visibleToasts.has('foo')).toBe(true);
  });

  it('should show a toast that uses the id of a queued toast that dismissAllToasts dropped', () => {
    const toaster = createToaster({ limit: 1 });

    toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
    toaster.buildToast({ content: 'bar', toastId: 'bar' }, () => null);
    toaster.dismissAllToasts();
    toaster.buildToast({ content: 'baz', toastId: 'bar' }, () => null);

    const toast = toaster.toasts.get('bar');
    assertToast(toast);
    expect(toast.content).toBe('baz');
    expect(toaster.visibleToasts.has('bar')).toBe(true);
  });

  it('should show a toast that is dispatched with the same id from the dismissed handler', () => {
    const toaster = createToaster({});

    toaster.buildToast(
      {
        content: 'foo',
        toastId: 'foo',
        onStatusChange: (_, { status }) => {
          if (status === 'dismissed') {
            toaster.buildToast({ content: 'bar', toastId: 'foo' }, () => null);
          }
        },
      },
      () => null,
    );
    const dismissed = toaster.toasts.get('foo');
    assertToast(dismissed);
    dismissed.close();

    const toast = toaster.toasts.get('foo');
    assertToast(toast);
    expect(toast.content).toBe('bar');
    expect(toaster.visibleToasts.has('foo')).toBe(true);
  });

  it('should ignore a toast that is dispatched with the same id from the queued handler', () => {
    const toaster = createToaster({});

    toaster.buildToast(
      {
        content: 'foo',
        toastId: 'foo',
        onStatusChange: (_, { status }) => {
          if (status === 'queued') {
            toaster.buildToast({ content: 'bar', toastId: 'foo' }, () => null);
          }
        },
      },
      () => null,
    );

    const toast = toaster.toasts.get('foo');
    assertToast(toast);
    expect(toaster.toasts.size).toBe(1);
    expect(toast.content).toBe('foo');
    expect(toaster.visibleToasts.has('foo')).toBe(true);
  });

  it('should ignore a toast that is dispatched with the same id while the dismissed toast is removed', () => {
    const toaster = createToaster({ limit: 1 });
    const statuses: string[] = [];
    const build = (content: string, onUpdate: () => void) =>
      toaster.buildToast(
        {
          content,
          toastId: 'foo',
          onStatusChange: (_, { status }) => {
            statuses.push(`${content} ${status}`);
          },
        },
        onUpdate,
      );
    let replacing = false;

    // The update callback of the first toast dispatches the id again while that toast is removed
    build('first', () => {
      if (replacing) {
        replacing = false;
        build('nested', () => null);
      }
    });
    toaster.dismissToast('foo');
    replacing = true;
    build('second', () => null);

    const toast = toaster.toasts.get('foo');
    assertToast(toast);
    expect(statuses.filter(status => status.endsWith('queued'))).toEqual(['first queued', 'second queued']);
    expect(toast.content).toBe('second');
    expect(toaster.visibleToasts.has('foo')).toBe(true);

    // The id must not wait in the queue as well, where it would hold back the next toast
    toaster.buildToast({ content: 'bar', toastId: 'bar' }, () => null);
    toaster.dismissToast('foo');
    toast.remove();
    expect(toaster.visibleToasts.has('bar')).toBe(true);
  });
});
