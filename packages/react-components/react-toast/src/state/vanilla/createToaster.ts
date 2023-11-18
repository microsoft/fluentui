import * as React from 'react';
import { createPriorityQueue } from '@fluentui/react-utilities';
import { Toast, ToasterOptions, ToastId, ToastImperativeRef, ToastOptions, UpdateToastEventDetail } from '../types';

function assignDefined<T extends object>(a: Partial<T>, b: Partial<T>) {
  // This cast is required, as Object.entries will return string as key which is not indexable
  for (const [key, prop] of Object.entries(b) as [keyof T, T[keyof T]][]) {
    // eslint-disable-next-line eqeqeq
    if (prop != undefined) {
      a[key] = prop;
    }
  }
}
const defaulToastOptions: Pick<
  ToastOptions,
  'priority' | 'pauseOnHover' | 'pauseOnWindowBlur' | 'position' | 'timeout' | 'politeness' | 'onStatusChange'
> = {
  onStatusChange: undefined,
  priority: 0,
  pauseOnHover: false,
  pauseOnWindowBlur: false,
  position: 'bottom-end',
  timeout: 3000,
};

// Multiple toasts can be dispatched in a single tick, use counter to prevent collisions
let counter = 0;

/**
 * Toast are managed outside of the react lifecycle because they can be
 * dispatched imperatively. Therefore the state of toast visibility can't
 * really be managed properly by a declarative lifecycle.
 */
export function createToaster(options: Partial<ToasterOptions>) {
  const { limit = Number.POSITIVE_INFINITY } = options;
  const visibleToasts = new Set<ToastId>();
  const toasts = new Map<ToastId, Toast>();

  const queue = createPriorityQueue<ToastId>((ta, tb) => {
    const a = toasts.get(ta);
    const b = toasts.get(tb);
    if (!a || !b) {
      return 0;
    }

    if (a.priority === b.priority) {
      return a.order - b.order;
    }

    return a.priority - b.priority;
  });

  const isToastVisible = (toastId: ToastId) => {
    return visibleToasts.has(toastId);
  };

  /**
   * Updates an existing toast with any available option
   */
  const updateToast = (toastOptions: UpdateToastEventDetail) => {
    const { toastId } = toastOptions;
    const toastToUpdate = toasts.get(toastId);
    if (!toastToUpdate) {
      return;
    }

    Object.assign(toastToUpdate, toastOptions);
    toastToUpdate.updateId++;
  };

  /**
   * Dismisses a toast with a specific id
   */
  const dismissToast = (toastId: ToastId) => {
    visibleToasts.delete(toastId);
  };

  /**
   * Dismisses all toasts and clears the queue
   */
  const dismissAllToasts = () => {
    visibleToasts.clear();
    queue.clear();
  };

  /**
   * @param toastOptions user configured options
   * @param onUpdate Some toast methods can result in UI changes (i.e. close) use this to dispatch callbacks
   */
  const buildToast = (toastOptions: Partial<ToastOptions> & { toastId: ToastId }, onUpdate: () => void) => {
    const { toastId, content, toasterId } = toastOptions;

    if (toasts.has(toastId)) {
      return;
    }

    const close = () => {
      const toast = toasts.get(toastId);
      if (!toast) {
        return;
      }

      visibleToasts.delete(toastId);
      onUpdate();
      toast.onStatusChange?.(null, { status: 'dismissed', ...toast });
    };

    const remove = () => {
      const toast = toasts.get(toastId);
      if (!toast) {
        return;
      }

      toasts.delete(toastId);

      if (visibleToasts.size < limit && queue.peek()) {
        const nextToast = toasts.get(queue.dequeue());
        if (!nextToast) {
          return;
        }

        visibleToasts.add(nextToast.toastId);
      }

      onUpdate();
    };

    const toast: Toast = {
      ...defaulToastOptions,
      close,
      remove,
      toastId,
      content,
      updateId: 0,
      toasterId,
      order: counter++,
      data: {},
      imperativeRef: React.createRef<ToastImperativeRef>(),
    };

    assignDefined(toast, options);
    assignDefined(toast, toastOptions);

    toasts.set(toastId, toast);
    toast.onStatusChange?.(null, { status: 'queued', ...toast });
    if (visibleToasts.size >= limit) {
      queue.enqueue(toastId);
    } else {
      visibleToasts.add(toastId);
    }
  };

  return {
    buildToast,
    dismissAllToasts,
    dismissToast,
    isToastVisible,
    updateToast,
    visibleToasts,
    toasts,
  };
}
