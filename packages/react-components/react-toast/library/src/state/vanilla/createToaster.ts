import * as React from 'react';
import { createPriorityQueue } from '@fluentui/react-utilities';
import type {
  Toast,
  ToasterOptions,
  ToastId,
  ToastImperativeRef,
  ToastOptions,
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

/**
 * Toast are managed outside of the react lifecycle because they can be
 * dispatched imperatively. Therefore the state of toast visibility can't
 * really be managed properly by a declarative lifecycle.
 */
export function createToaster(options: Partial<ToasterOptions>): {
  buildToast: (toastOptions: Partial<ToastOptions> & { toastId: ToastId }, onUpdate: () => void) => void;
  dismissAllToasts: () => void;
  dismissToast: (toastId: ToastId) => void;
  isToastVisible: (toastId: ToastId) => boolean;
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

  const notifyDismissed = (toast: Toast) => {
    toast.onStatusChange?.(null, { status: 'dismissed', ...toast });
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
   * Removes a toast that is still in the queue.
   *
   * A queued toast is never added to `visibleToasts`, so `remove()` is never called for it and it
   * would otherwise stay in `toasts` forever: its `toastId` could not be dispatched again and it
   * would become visible as soon as a slot freed up.
   *
   * Both containers are mutated together, so a queued id cannot be left in `queue` without a
   * matching entry in `toasts`.
   */
  const discardQueuedToast = (toastId: ToastId): Toast | undefined => {
    const toast = toasts.get(toastId);
    if (!toast) {
      return undefined;
    }

    queue.remove(toastId);
    toasts.delete(toastId);

    return toast;
  };

  /**
   * Dismisses a toast with a specific id
   *
   * A visible toast is only removed from `visibleToasts`: it stays in `toasts` so its exit motion
   * can run, and `remove()` finishes the teardown once the motion completes.
   */
  const dismissToast = (toastId: ToastId) => {
    if (queue.contains(toastId)) {
      const toast = discardQueuedToast(toastId);
      if (toast) {
        notifyDismissed(toast);
      }
      return;
    }

    visibleToasts.delete(toastId);
  };

  /**
   * Dismisses all toasts and clears the queue
   *
   * Every container is updated before any callback runs. A `dismissed` handler can dispatch a new
   * toast synchronously, and a handler that throws must not leave the containers half updated.
   */
  const dismissAllToasts = () => {
    const queuedIds = queue.all();
    const queuedToasts: Toast[] = [];

    queue.clear();
    for (const toastId of queuedIds) {
      const toast = toasts.get(toastId);
      if (toast) {
        queuedToasts.push(toast);
        toasts.delete(toastId);
      }
    }

    // Visible toasts stay in `toasts` so their exit motion can run.
    visibleToasts.clear();

    for (const toast of queuedToasts) {
      notifyDismissed(toast);
    }
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
      notifyDismissed(toast);
    };

    const remove = () => {
      const toast = toasts.get(toastId);
      if (!toast) {
        return;
      }

      toasts.delete(toastId);

      // Skip ids that are no longer in `toasts` rather than returning early, so one stale queue
      // entry cannot strand every toast behind it.
      while (visibleToasts.size < limit && queue.peek() !== null) {
        const nextToast = toasts.get(queue.dequeue());
        if (!nextToast) {
          continue;
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
