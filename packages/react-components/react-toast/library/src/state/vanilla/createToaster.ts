import * as React from 'react';
import { createPriorityQueue } from '@fluentui/react-utilities';
import type {
  Toast,
  ToasterOptions,
  ToastId,
  ToastImperativeRef,
  ToastOptions,
  ToastStatus,
  UpdateToastEventDetail,
} from '../types';

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
const dismissalStates = new WeakMap<
  Toast['imperativeRef'],
  { status: 'open' | 'pending' | 'reported'; toast: Toast; pendingUnmounts: Toast[] }
>();

const getToastDismissal = (toast: Toast) => {
  const dismissal = dismissalStates.get(toast.imperativeRef);
  if (
    !dismissal ||
    dismissal.toast.close !== toast.close ||
    dismissal.toast.remove !== toast.remove ||
    dismissal.toast.toastId !== toast.toastId ||
    dismissal.toast.order !== toast.order
  ) {
    return undefined;
  }
  return dismissal;
};

export const runToastCallbacks = (callbacks: Array<() => void>, errorMessage: string): void => {
  const errors: unknown[] = [];
  callbacks.forEach(callback => {
    try {
      callback();
    } catch (error) {
      errors.push(error);
    }
  });
  if (errors.length === 1) {
    throw errors[0];
  }
  if (errors.length > 1) {
    throw Object.assign(new Error(errorMessage), { errors });
  }
};

const markToastDismissalPending = (toast: Toast): void => {
  const dismissal = getToastDismissal(toast);
  if (dismissal?.status === 'open') {
    dismissal.status = 'pending';
  }
};

/** Reports a toast lifecycle status, preserving dismissal ordering for managed toasts. */
export const reportToastStatus = (toast: Toast, status: ToastStatus): void => {
  const dismissal = getToastDismissal(toast);
  if (status === 'unmounted' && dismissal?.status === 'pending') {
    // Let the pending dismissal run outside the unmount commit before reporting unmount.
    dismissal.pendingUnmounts.push(toast);
    return;
  }

  if (status === 'dismissed' && dismissal) {
    if (dismissal.status === 'reported') {
      return;
    }
    dismissal.status = 'reported';
    const pendingUnmounts = dismissal.pendingUnmounts.splice(0);
    runToastCallbacks(
      [
        () => toast.onStatusChange?.(null, { ...toast, status }),
        ...pendingUnmounts.map(
          unmounted => () => unmounted.onStatusChange?.(null, { ...unmounted, status: 'unmounted' }),
        ),
      ],
      'Multiple errors occurred while reporting toast status',
    );
    return;
  }

  toast.onStatusChange?.(null, { ...toast, status });
};

/**
 * Toast are managed outside of the react lifecycle because they can be
 * dispatched imperatively. Therefore the state of toast visibility can't
 * really be managed properly by a declarative lifecycle.
 */
export function createToaster(options: Partial<ToasterOptions>): {
  buildToast: (toastOptions: Partial<ToastOptions> & { toastId: ToastId }, onUpdate: () => void) => void;
  dismissAllToasts: () => void;
  dismissToast: (toastId: ToastId) => void;
  getQueuedToastIds: () => ToastId[];
  isToastVisible: (toastId: ToastId) => boolean;
  takeAllToasts: () => Toast[];
  updateToast: (options: UpdateToastEventDetail) => void;
  visibleToasts: Set<ToastId>;
  toasts: Map<ToastId, Toast>;
} {
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

    const { close, remove, updateId, order, imperativeRef, priority } = toastToUpdate;
    Object.assign(toastToUpdate, toastOptions);
    Object.assign(toastToUpdate, { close, remove, updateId: updateId + 1, order, imperativeRef });

    if (toastToUpdate.priority !== priority && queue.contains(toastId)) {
      const queuedToastIds = queue.all();
      queue.clear();
      queuedToastIds.forEach(queue.enqueue);
    }
  };

  /**
   * Dismisses a toast with a specific id
   */
  const dismissToast = (toastId: ToastId) => {
    const toast = toasts.get(toastId);
    if (!toast) {
      return;
    }

    queue.remove(toastId);
    toast.close();
  };

  /**
   * Dismisses all toasts and clears the queue
   */
  const dismissAllToasts = () => {
    visibleToasts.clear();
    queue.clear();
  };

  const takeAllToasts = () => {
    const activeToasts = Array.from(toasts.values());
    activeToasts.forEach(markToastDismissalPending);
    toasts.clear();
    visibleToasts.clear();
    queue.clear();
    return activeToasts;
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
      if (!toast || toast.close !== close) {
        return;
      }

      visibleToasts.delete(toastId);
      markToastDismissalPending(toast);
      runToastCallbacks(
        [onUpdate, () => reportToastStatus(toast, 'dismissed')],
        'Multiple errors occurred while closing a toast',
      );
    };

    const remove = () => {
      const toast = toasts.get(toastId);
      if (!toast || toast.remove !== remove) {
        return;
      }

      markToastDismissalPending(toast);
      toasts.delete(toastId);

      if (visibleToasts.size < limit && queue.size() > 0) {
        const nextToast = toasts.get(queue.dequeue());
        if (!nextToast) {
          return;
        }

        visibleToasts.add(nextToast.toastId);
      }

      runToastCallbacks(
        [
          onUpdate,
          () => {
            const dismissal = getToastDismissal(toast);
            const unmounted = dismissal?.pendingUnmounts[0];
            if (dismissal?.status === 'pending' && unmounted) {
              reportToastStatus(unmounted, 'dismissed');
            }
          },
        ],
        'Multiple errors occurred while removing a toast',
      );
    };

    const order = counter++;
    const imperativeRef = React.createRef<ToastImperativeRef>();
    const toast: Toast = {
      ...defaulToastOptions,
      close,
      remove,
      toastId,
      content,
      updateId: 0,
      toasterId,
      order,
      data: {},
      imperativeRef,
    };

    assignDefined(toast, options);
    assignDefined(toast, toastOptions);
    Object.assign(toast, { close, remove, updateId: 0, order, imperativeRef });

    dismissalStates.set(imperativeRef, { status: 'open', toast, pendingUnmounts: [] });
    toasts.set(toastId, toast);
    toast.onStatusChange?.(null, { ...toast, status: 'queued' });
    if (toasts.get(toastId) !== toast) {
      return;
    }

    if (visibleToasts.size >= limit || queue.size() > 0) {
      queue.enqueue(toastId);
    } else {
      visibleToasts.add(toastId);
    }
  };

  return {
    buildToast,
    dismissAllToasts,
    dismissToast,
    getQueuedToastIds: queue.all,
    isToastVisible,
    takeAllToasts,
    updateToast,
    visibleToasts,
    toasts,
  };
}
