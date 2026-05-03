'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import {
  getIntrinsicElementProps,
  slot,
  useControllableState,
  useEventCallback,
  useId,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import type { ToastProps, ToastState } from './Toast.types';
import type { ToastOpenChangeData } from './toastContext';

export const useToast = (props: ToastProps, ref: React.Ref<HTMLElement>): ToastState => {
  const { open: openProp, defaultOpen, onOpenChange, intent, timeout = -1, ...rest } = props;
  const { targetDocument } = useFluent();

  const [open, setOpen] = useControllableState({
    state: openProp,
    defaultState: defaultOpen,
    initialState: false,
  });

  const toastRef = React.useRef<HTMLDivElement>(null);
  const mergedRef = useMergedRefs(ref, toastRef) as React.Ref<HTMLDivElement>;

  const titleId = useId('toast-title-');
  const bodyId = useId('toast-body-');

  const requestOpenChange = useEventCallback((data: ToastOpenChangeData) => {
    // EventHandler<T> signature is (ev, data). For timeout events there is no
    // DOM event; the double assertion satisfies the type without losing information.
    onOpenChange?.(data.event as unknown as React.SyntheticEvent, data);
    setOpen(data.open);
  });

  // Drive the Popover API from React open state.
  // useIsomorphicLayoutEffect keeps the element in the top layer synchronously
  // after the DOM update, preventing a flash where the element is in the DOM
  // but not yet visible.
  useIsomorphicLayoutEffect(() => {
    const el = toastRef.current;
    if (!el) {
      return;
    }

    if (open && !el.matches(':popover-open')) {
      el.showPopover();
    } else if (!open && el.matches(':popover-open')) {
      el.hidePopover();
    }
  }, [open]);

  // Auto-dismiss after `timeout` ms. Uses the window from FluentProvider so
  // timers are scoped to the correct browsing context (e.g. iframes).
  const win = targetDocument?.defaultView;
  React.useEffect(() => {
    if (!open || timeout < 0 || !win) {
      return;
    }
    const id = win.setTimeout(() => requestOpenChange({ type: 'timeout', open: false, event: null }), timeout);
    return () => win.clearTimeout(id);
  }, [open, timeout, requestOpenChange, win]);

  // error/warning → role="alert" (assertive); info/success/undefined → role="status" (polite)
  const role = intent === 'error' || intent === 'warning' ? 'alert' : 'status';

  return {
    components: { root: 'div' },
    root: slot.always(
      getIntrinsicElementProps('div', {
        // popover="manual": top-layer placement, no light-dismiss on outside click.
        // Users retain full control; only explicit calls to requestOpenChange or
        // the timeout dismiss the toast.
        ...({ popover: 'manual' } as {}),
        ref: mergedRef,
        role,
        'aria-labelledby': titleId,
        'aria-describedby': bodyId,
        ...rest,
      }),
      { elementType: 'div' },
    ),
    open,
    intent,
    bodyId,
    titleId,
    requestOpenChange,
  };
};
