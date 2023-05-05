import * as React from 'react';
import { canBeRendered, isNum, getAutoCloseDelay, toToastItem } from './utils';
import { eventManager, Event } from './eventManager';

import {
  Id,
  ToastContainerProps,
  ToastProps,
  ToastContent,
  Toast,
  ToastPosition,
  ClearWaitingQueueParams,
  NotValidatedToastProps,
  ContainerInstance,
  QueuedToast,
} from './types';

export function useToaster(props: ToastContainerProps) {
  const [, forceUpdate] = React.useReducer(x => x + 1, 0);
  const [toastIds, setToastIds] = React.useState<Id[]>([]);
  const containerRef = React.useRef(null);
  const toastToRender = React.useState(() => new Map<Id, Toast>())[0];
  const isToastActive = (id: Id) => toastIds.indexOf(id) !== -1;
  const instance = React.useState<ContainerInstance>(() => ({
    toastKey: 1,
    displayedToast: 0,
    count: 0,
    queue: [],
    props,
    containerId: null,
    isToastActive,
    getToast: id => toastToRender.get(id),
  }))[0];

  const clearWaitingQueue = React.useCallback(
    ({ containerId }: ClearWaitingQueueParams) => {
      const { limit } = instance.props;
      if (limit && (!containerId || instance.containerId === containerId)) {
        instance.count -= instance.queue.length;
        instance.queue = [];
      }
    },
    [instance],
  );

  const removeToast = React.useCallback((toastId?: Id) => {
    setToastIds(state => (toastId === undefined ? [] : state.filter(id => id !== toastId)));
  }, []);

  const appendToast = React.useCallback(
    (content: ToastContent, toastProps: ToastProps, staleId?: Id) => {
      const { toastId } = toastProps;

      if (staleId) {
        toastToRender.delete(staleId);
      }

      const toast = {
        content,
        props: toastProps,
      };
      toastToRender.set(toastId, toast);

      setToastIds(state => [...state, toastId].filter(id => id !== staleId));
      eventManager.emit(Event.Change, toToastItem(toast, toast.props.updateId === undefined ? 'added' : 'updated'));
    },
    [setToastIds, toastToRender],
  );

  const dequeueToast = React.useCallback(() => {
    const { toastContent, toastProps, staleId } = instance.queue.shift() as QueuedToast;
    appendToast(toastContent, toastProps, staleId);
  }, [instance, appendToast]);

  /**
   * check if a container is attached to the dom
   * check for multi-container, build only if associated
   * check for duplicate toastId if no update
   */
  const isNotValid = React.useCallback(
    (options: NotValidatedToastProps) => {
      return (
        !containerRef.current ||
        (instance.props.enableMultiContainer && options.containerId !== instance.props.containerId) ||
        (toastToRender.has(options.toastId) && options.updateId === undefined)
      );
    },
    [instance, toastToRender],
  );

  const deleteToast = React.useCallback(
    (toastId: Id) => {
      const removed = toToastItem(toastToRender.get(toastId)!, 'removed');
      toastToRender.delete(toastId);

      eventManager.emit(Event.Change, removed);

      const queueLen = instance.queue.length;
      instance.count = toastId === undefined ? instance.count - instance.displayedToast : instance.count - 1;

      if (instance.count < 0) {
        instance.count = 0;
      }

      if (queueLen > 0) {
        const freeSlot = toastId === undefined ? instance.props.limit! : 1;

        if (queueLen === 1 || freeSlot === 1) {
          instance.displayedToast++;
          dequeueToast();
        } else {
          const toDequeue = freeSlot > queueLen ? queueLen : freeSlot;
          instance.displayedToast = toDequeue;

          for (let i = 0; i < toDequeue; i++) {
            dequeueToast();
          }
        }
      } else {
        forceUpdate();
      }
    },
    [dequeueToast, instance, toastToRender],
  );

  // this function and all the function called inside needs to rely on refs
  const buildToast = React.useCallback(
    (content: ToastContent, { delay, staleId, ...options }: NotValidatedToastProps) => {
      if (!canBeRendered(content) || isNotValid(options)) {
        return;
      }

      const { toastId, updateId, data } = options;
      const { props: instanceProps } = instance;
      const closeToast = () => removeToast(toastId);
      const isNotAnUpdate = updateId === null || updateId === undefined;

      if (isNotAnUpdate) {
        instance.count++;
      }

      const toastProps: ToastProps = {
        ...instanceProps,
        position: instanceProps.position ?? 'bottom-right',
        type: 'default',
        key: instance.toastKey++,
        ...Object.fromEntries(Object.entries(options).filter(([_, v]) => v !== null || v !== undefined)),
        toastId,
        updateId,
        data,
        closeToast,
        isIn: false,
        autoClose: options.isLoading ? false : getAutoCloseDelay(options.autoClose, instanceProps.autoClose),
        deleteToast: () => deleteToast(toastId),
      };

      // not handling limit + delay by design. Waiting for user feedback first
      if (instanceProps.limit && instanceProps.limit > 0 && instance.count > instanceProps.limit && isNotAnUpdate) {
        instance.queue.push({ toastContent: content, toastProps, staleId });
      } else if (isNum(delay)) {
        setTimeout(() => {
          appendToast(content, toastProps, staleId);
        }, delay);
      } else {
        appendToast(content, toastProps, staleId);
      }
    },
    [appendToast, instance, isNotValid, removeToast, deleteToast],
  );

  React.useEffect(() => {
    instance.containerId = props.containerId;
    const clearToasts = (toastId: Id | undefined) => containerRef.current && removeToast(toastId);
    eventManager
      .cancelEmit(Event.WillUnmount)
      .on(Event.Show, buildToast)
      .on(Event.Clear, clearToasts)
      .on(Event.ClearWaitingQueue, clearWaitingQueue)
      .emit(Event.DidMount, instance);

    return () => {
      eventManager
        .off(Event.Show, buildToast)
        .off(Event.Clear, clearToasts)
        .off(Event.ClearWaitingQueue, clearWaitingQueue);
      toastToRender.clear();
      eventManager.emit(Event.WillUnmount, instance);
    };
  }, [buildToast, clearWaitingQueue, instance, props.containerId, toastToRender, removeToast]);

  React.useEffect(() => {
    instance.props = props;
    instance.isToastActive = isToastActive;
    instance.displayedToast = toastIds.length;
  });

  const getToastToRender = React.useCallback(
    <T>(cb: (position: ToastPosition, toastList: Toast[]) => T) => {
      const toRender = new Map<ToastPosition, Toast[]>();
      const collection = Array.from(toastToRender.values());

      collection.forEach(toast => {
        const { position } = toast.props;
        toRender.has(position) || toRender.set(position, []);
        toRender.get(position)!.push(toast);
      });

      return Array.from(toRender, ([position, toasts]) => {
        if (position.startsWith('top')) {
          toasts.reverse();
        }

        return cb(position, toasts);
      });
    },
    [toastToRender],
  );

  const getPositionStyles = React.useCallback(
    (position: ToastPosition) => {
      const containerStyles: React.CSSProperties = {
        position: 'fixed',
      };

      let positionStyles: React.CSSProperties = {};
      const { horizontal = 0, vertical = 0 } = instance.props.offset ?? {};
      switch (position) {
        case 'top-left':
          positionStyles = {
            top: 0 + vertical,
            left: 0 + horizontal,
          };
          break;
        case 'top-right':
          positionStyles = {
            top: 0 + vertical,
            right: 0 + horizontal,
          };
          break;
        case 'bottom-left':
          positionStyles = {
            bottom: 0 + vertical,
            left: 0 + horizontal,
          };
          break;
        case 'bottom-right':
          positionStyles = {
            bottom: 0 + vertical,
            right: 0 + horizontal,
          };
          break;
      }

      Object.assign(containerStyles, positionStyles);
      return containerStyles;
    },
    [instance],
  );

  return {
    getToastToRender,
    containerRef,
    isToastActive,
    getPositionStyles,
  };
}
