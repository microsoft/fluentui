import type { Toast, ToastChangeHandler } from '../types';
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

  it('should report queued for a toast over the limit', () => {
    const toaster = createToaster({ limit: 1 });
    const statuses: string[] = [];

    toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
    toaster.buildToast(
      {
        content: 'bar',
        toastId: 'bar',
        onStatusChange: (_event, data) => statuses.push(data.status),
      },
      () => null,
    );

    expect(statuses).toEqual(['queued']);
    expect(toaster.visibleToasts.has('bar')).toBe(false);
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

  describe('dismissing queued toasts', () => {
    it('should report dismissed for a queued toast dismissed by id', () => {
      const statuses: string[] = [];
      const toaster = createToaster({ limit: 1 });
      const onStatusChange: ToastChangeHandler = (_event, data) => {
        statuses.push(`${data.toastId}:${data.status}`);
      };

      toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
      toaster.buildToast({ content: 'bar', toastId: 'bar', onStatusChange }, () => null);

      toaster.dismissToast('bar');

      expect(statuses).toEqual(['bar:queued', 'bar:dismissed']);
    });

    it('should remove a queued toast from the toaster when dismissed by id', () => {
      const toaster = createToaster({ limit: 1 });

      toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
      toaster.buildToast({ content: 'bar', toastId: 'bar' }, () => null);

      toaster.dismissToast('bar');

      expect(toaster.toasts.has('bar')).toBe(false);
      expect(toaster.visibleToasts.has('bar')).toBe(false);
    });

    it('should not make a dismissed queued toast visible when a slot frees up', () => {
      const toaster = createToaster({ limit: 1 });

      toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
      toaster.buildToast({ content: 'bar', toastId: 'bar' }, () => null);

      toaster.dismissToast('bar');

      const foo = toaster.toasts.get('foo');
      assertToast(foo);
      foo.close();
      foo.remove();

      expect(toaster.visibleToasts.has('bar')).toBe(false);
      expect(toaster.toasts.has('bar')).toBe(false);
    });

    it('should allow the id of a dismissed queued toast to be dispatched again', () => {
      const toaster = createToaster({ limit: 1 });

      toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
      toaster.buildToast({ content: 'bar', toastId: 'bar' }, () => null);

      toaster.dismissToast('bar');
      toaster.buildToast({ content: 'bar again', toastId: 'bar' }, () => null);

      // The replacement must be the newly built toast, not the original one being promoted.
      const bar = toaster.toasts.get('bar');
      assertToast(bar);
      expect(bar.content).toBe('bar again');

      const foo = toaster.toasts.get('foo');
      assertToast(foo);
      foo.close();
      foo.remove();

      expect(toaster.visibleToasts.has('bar')).toBe(true);
    });

    it('should report dismissed for queued toasts when dismissing all toasts', () => {
      const statuses: string[] = [];
      const toaster = createToaster({ limit: 1 });
      const onStatusChange: ToastChangeHandler = (_event, data) => {
        statuses.push(`${data.toastId}:${data.status}`);
      };

      toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
      toaster.buildToast({ content: 'bar', toastId: 'bar', onStatusChange }, () => null);

      toaster.dismissAllToasts();

      expect(statuses).toEqual(['bar:queued', 'bar:dismissed']);
    });

    it('should not leave dismissed queued toasts in the toaster', () => {
      const toaster = createToaster({ limit: 1 });

      toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
      toaster.buildToast({ content: 'bar', toastId: 'bar' }, () => null);
      toaster.buildToast({ content: 'baz', toastId: 'baz' }, () => null);

      toaster.dismissAllToasts();

      expect(toaster.toasts.has('bar')).toBe(false);
      expect(toaster.toasts.has('baz')).toBe(false);
    });

    it('should keep a toast dispatched from a dismissal handler', () => {
      // A handler can dispatch synchronously while `dismissAllToasts` is notifying. The new toast
      // must survive: it must not be queued and then cleared, and it must not be orphaned in
      // `toasts` without being visible.
      const toaster = createToaster({ limit: 1 });
      let dispatched = false;

      toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
      toaster.buildToast(
        {
          content: 'bar',
          toastId: 'bar',
          onStatusChange: (_event, data) => {
            if (data.status === 'dismissed' && !dispatched) {
              dispatched = true;
              toaster.buildToast({ content: 'replacement', toastId: 'replacement' }, () => null);
            }
          },
        },
        () => null,
      );

      toaster.dismissAllToasts();

      expect(dispatched).toBe(true);
      expect(toaster.toasts.has('replacement')).toBe(true);
      expect(toaster.visibleToasts.has('replacement')).toBe(true);
    });

    it('should keep every container consistent when a dismissal handler throws', () => {
      const toaster = createToaster({ limit: 1 });

      toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
      toaster.buildToast({ content: 'bar', toastId: 'bar' }, () => null);
      toaster.buildToast(
        {
          content: 'baz',
          toastId: 'baz',
          onStatusChange: (_event, data) => {
            if (data.status === 'dismissed') {
              throw new Error('handler failed');
            }
          },
        },
        () => null,
      );

      expect(() => toaster.dismissAllToasts()).toThrow('handler failed');

      expect(toaster.visibleToasts.size).toBe(0);
      expect(toaster.toasts.has('bar')).toBe(false);
      expect(toaster.toasts.has('baz')).toBe(false);
    });

    it('should promote past a queue entry that is no longer in the toaster', () => {
      // `toasts` is public, so an entry can disappear while its id is still queued. Promotion must
      // skip that id instead of returning early and stranding everything behind it.
      const toaster = createToaster({ limit: 1 });

      toaster.buildToast({ content: 'foo', toastId: 'foo' }, () => null);
      toaster.buildToast({ content: 'bar', toastId: 'bar' }, () => null);
      toaster.buildToast({ content: 'baz', toastId: 'baz' }, () => null);

      toaster.toasts.delete('bar');

      const foo = toaster.toasts.get('foo');
      assertToast(foo);
      foo.close();
      foo.remove();

      expect(toaster.visibleToasts.has('baz')).toBe(true);
    });
  });

  describe('status reporting for visible toasts', () => {
    it('should report dismissed when a visible toast is dismissed by id', () => {
      // `close()` reports `dismissed` for the same state change, so the status a consumer observes
      // should not depend on which API dismissed the toast.
      const statuses: string[] = [];
      const toaster = createToaster({});

      toaster.buildToast(
        {
          content: 'foo',
          toastId: 'foo',
          onStatusChange: (_event, data) => statuses.push(data.status),
        },
        () => null,
      );

      toaster.dismissToast('foo');

      expect(statuses).toEqual(['queued', 'dismissed']);
      expect(toaster.visibleToasts.has('foo')).toBe(false);
    });

    it('should report dismissed only once when a toast is dismissed twice', () => {
      const statuses: string[] = [];
      const toaster = createToaster({});

      toaster.buildToast(
        {
          content: 'foo',
          toastId: 'foo',
          onStatusChange: (_event, data) => statuses.push(data.status),
        },
        () => null,
      );

      toaster.dismissToast('foo');
      toaster.dismissToast('foo');

      expect(statuses).toEqual(['queued', 'dismissed']);
    });

    it('should report dismissed for visible toasts when dismissing all toasts', () => {
      const statuses: string[] = [];
      const onStatusChange: ToastChangeHandler = (_event, data) => {
        statuses.push(`${data.toastId}:${data.status}`);
      };
      const toaster = createToaster({});

      toaster.buildToast({ content: 'foo', toastId: 'foo', onStatusChange }, () => null);
      toaster.buildToast({ content: 'bar', toastId: 'bar', onStatusChange }, () => null);

      toaster.dismissAllToasts();

      expect(statuses).toEqual(['foo:queued', 'bar:queued', 'foo:dismissed', 'bar:dismissed']);
      expect(toaster.visibleToasts.size).toBe(0);
    });

    it('should ignore a toast id that was never dispatched', () => {
      const toaster = createToaster({});

      expect(() => toaster.dismissToast('missing')).not.toThrow();
      expect(toaster.visibleToasts.size).toBe(0);
      expect(toaster.toasts.size).toBe(0);
    });

    it('should not report dismissed twice when close is followed by dismiss', () => {
      const statuses: string[] = [];
      const toaster = createToaster({});

      toaster.buildToast(
        {
          content: 'foo',
          toastId: 'foo',
          onStatusChange: (_event, data) => statuses.push(data.status),
        },
        () => null,
      );

      const toast = toaster.toasts.get('foo');
      assertToast(toast);
      toast.close();
      toaster.dismissToast('foo');

      expect(statuses).toEqual(['queued', 'dismissed']);
    });
  });
});
