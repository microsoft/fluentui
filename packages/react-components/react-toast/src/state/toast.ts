import { isStr, isNum, isFn, Type } from './utils';
import { eventManager, OnChangeCallback, Event } from './eventManager';
import {
  ToastContent,
  ToastOptions,
  ToastProps,
  Id,
  UpdateOptions,
  ClearWaitingQueueParams,
  NotValidatedToastProps,
  TypeOptions,
  ContainerInstance,
} from './types';

interface EnqueuedToast {
  content: ToastContent<unknown>;
  options: NotValidatedToastProps;
}

const containers = new Map<ContainerInstance | Id, ContainerInstance>();
let latestInstance: ContainerInstance | Id;
let queue: EnqueuedToast[] = [];
let TOAST_ID = 1;

/**
 * Get the toast by id, given it's in the DOM, otherwise returns null
 */
function getToast(toastId: Id, { containerId }: ToastOptions) {
  const container = containers.get(containerId || latestInstance);
  return container && container.getToast(toastId);
}

/**
 * Generate a random toastId
 */
function generateToastId() {
  return `${TOAST_ID++}`;
}

/**
 * Generate a toastId or use the one provided
 */
function getToastId(options?: ToastOptions) {
  return options && (isStr(options.toastId) || isNum(options.toastId)) ? options.toastId : generateToastId();
}

/**
 * If the container is not mounted, the toast is enqueued and
 * the container lazy mounted
 */
function dispatchToast<TData>(content: ToastContent<TData>, options: NotValidatedToastProps): Id {
  if (containers.size > 0) {
    eventManager.emit(Event.Show, content, options);
  } else {
    queue.push({ content, options });
  }

  return options.toastId;
}

/**
 * Merge provided options with the defaults settings and generate the toastId
 */
function mergeOptions(type: string, options?: ToastOptions) {
  return {
    ...options,
    type: (options && options.type) || type,
    toastId: getToastId(options),
  } as NotValidatedToastProps;
}

function createToastByType(type: string) {
  return <TData = unknown>(content: ToastContent<TData>, options?: ToastOptions) =>
    dispatchToast(content, mergeOptions(type, options));
}

function toast<TData = unknown>(content: ToastContent<TData>, options?: ToastOptions) {
  return dispatchToast(content, mergeOptions(Type.DEFAULT, options));
}

toast.loading = <TData = unknown>(content: ToastContent<TData>, options?: ToastOptions) =>
  dispatchToast(
    content,
    mergeOptions(Type.DEFAULT, {
      isLoading: true,
      autoClose: false,
      closeOnClick: false,
      ...options,
    }),
  );

export interface ToastPromiseParams<TData = unknown, TError = unknown, TPending = unknown> {
  pending?: string | UpdateOptions<TPending>;
  success?: string | UpdateOptions<TData>;
  error?: string | UpdateOptions<TError>;
}

function handlePromise<TData = unknown, TError = unknown, TPending = unknown>(
  promise: Promise<TData> | (() => Promise<TData>),
  { pending, error, success }: ToastPromiseParams<TData, TError, TPending>,
  options?: ToastOptions,
) {
  let id: Id;

  if (pending) {
    id = isStr(pending)
      ? toast.loading(pending, options)
      : toast.loading(pending.render, {
          ...options,
          ...(pending as ToastOptions),
        });
  }

  const resetParams = {
    isLoading: null,
    autoClose: null,
    closeOnClick: null,
    closeButton: null,
    draggable: null,
  };

  const resolver = <T>(type: TypeOptions, input: string | UpdateOptions<T> | undefined, result: T) => {
    // Remove the toast if the input has not been provided. This prevents the toast from hanging
    // in the pending state if a success/error toast has not been provided.
    if (!input) {
      toast.dismiss(id);
      return;
    }

    const baseParams = {
      type,
      ...resetParams,
      ...options,
      data: result,
    };
    const params = isStr(input) ? { render: input } : input;

    // if the id is set we know that it's an update
    if (id) {
      toast.update(id, {
        ...baseParams,
        ...params,
      } as UpdateOptions);
    } else {
      // using toast.promise without loading
      toast(params!.render, {
        ...baseParams,
        ...params,
      } as ToastOptions);
    }

    return result;
  };

  const p = isFn(promise) ? promise() : promise;

  //call the resolvers only when needed
  p.then(result => resolver('success', success, result)).catch(err => resolver('error', error, err));

  return p;
}

toast.promise = handlePromise;
toast.success = createToastByType(Type.SUCCESS);
toast.info = createToastByType(Type.INFO);
toast.error = createToastByType(Type.ERROR);
toast.warning = createToastByType(Type.WARNING);
toast.warn = toast.warning;
toast.dark = (content: ToastContent, options?: ToastOptions) =>
  dispatchToast(
    content,
    mergeOptions(Type.DEFAULT, {
      ...options,
    }),
  );

/**
 * Remove toast programmaticaly
 */
toast.dismiss = (id?: Id) => {
  if (containers.size > 0) {
    eventManager.emit(Event.Clear, id);
  } else {
    queue = queue.filter(t => id === undefined && t.options.toastId !== id);
  }
};

/**
 * Clear waiting queue when limit is used
 */
toast.clearWaitingQueue = (params: ClearWaitingQueueParams = {}) => eventManager.emit(Event.ClearWaitingQueue, params);

/**
 * return true if one container is displaying the toast
 */
toast.isActive = (id: Id) => {
  let isToastActive = false;

  containers.forEach(container => {
    if (container.isToastActive && container.isToastActive(id)) {
      isToastActive = true;
    }
  });

  return isToastActive;
};

toast.update = <TData = unknown>(toastId: Id, options: UpdateOptions<TData> = {}) => {
  setTimeout(() => {
    const toastInstance = getToast(toastId, options as ToastOptions);
    if (toastInstance) {
      const { props: oldOptions, content: oldContent } = toastInstance;

      const nextOptions = {
        delay: 100,
        ...oldOptions,
        ...options,
        toastId: options.toastId || toastId,
        updateId: generateToastId(),
      } as ToastProps & UpdateOptions;

      if (nextOptions.toastId !== toastId) {
        nextOptions.staleId = toastId;
      }

      const content = nextOptions.render || oldContent;
      delete nextOptions.render;

      dispatchToast(content, nextOptions);
    }
  }, 0);
};

/**
 * Subscribe to change when a toast is added, removed and updated
 *
 * Usage:
 * ```
 * const unsubscribe = toast.onChange((payload) => {
 *   switch (payload.status) {
 *   case "added":
 *     // new toast added
 *     break;
 *   case "updated":
 *     // toast updated
 *     break;
 *   case "removed":
 *     // toast has been removed
 *     break;
 *   }
 * })
 * ```
 */
toast.onChange = (callback: OnChangeCallback) => {
  eventManager.on(Event.Change, callback);
  return () => {
    eventManager.off(Event.Change, callback);
  };
};

/**
 * Wait until the ToastContainer is mounted to dispatch the toast
 * and attach isActive method
 */
eventManager
  .on(Event.DidMount, (containerInstance: ContainerInstance) => {
    latestInstance = containerInstance.containerId || containerInstance;
    containers.set(latestInstance, containerInstance);

    queue.forEach(item => {
      eventManager.emit(Event.Show, item.content, item.options);
    });

    queue = [];
  })
  .on(Event.WillUnmount, (containerInstance: ContainerInstance) => {
    containers.delete(containerInstance.containerId || containerInstance);

    if (containers.size === 0) {
      eventManager.off(Event.Show).off(Event.Clear).off(Event.ClearWaitingQueue);
    }
  });

export { toast };
