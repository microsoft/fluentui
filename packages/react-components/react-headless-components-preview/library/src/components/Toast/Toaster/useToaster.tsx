'use client';

import * as React from 'react';
import { useToaster as useToasterState, useToastAnnounce } from '@fluentui/react-toast';
import type { ToastAnnounce, ToastPosition } from '@fluentui/react-toast';
import type { ToasterProps, ToasterState } from './Toaster.types';
import type { ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import {
  getIntrinsicElementProps,
  slot,
  useEventCallback,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { Escape } from '@fluentui/keyboard-keys';
import { ToastContainer } from '../ToastContainer';

const SUPPORTS_POPOVER_OPEN_SELECTOR =
  typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('selector(:popover-open)');

/**
 * Create the state required to render the Toaster.
 */
export const useToaster = (props: ToasterProps): ToasterState => {
  const { toasterId, offset, shortcuts, announce: announceProp, ...rest } = props;

  const { toastsToRender, isToastVisible, tryRestoreFocus, closeAllToasts } = useToasterState<HTMLDivElement>({
    toasterId,
    offset,
    shortcuts,
  });

  const announceRef = React.useRef<ToastAnnounce>(() => null);
  const announce = React.useCallback<ToastAnnounce>((message, options) => announceRef.current(message, options), []);
  const { dir } = useFluent();

  const { onKeyDown: onKeyDownProp, ...rootProps } = slot.always(
    getIntrinsicElementProps<ExtractSlotProps<Slot<'div'>>>('div', rest),
    {
      elementType: 'div',
    },
  );
  const onKeyDown = useEventCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === Escape) {
      e.preventDefault();
      closeAllToasts();
    }
    onKeyDownProp?.(e);
  });

  const usePositionSlot = (toastPosition: ToastPosition) => {
    const { announceToast, toasterRef } = useToastAnnounce(announceProp ?? announce);
    const popoverRef = React.useRef<HTMLDivElement>(null);
    const positionHasToasts = toastsToRender.has(toastPosition);

    // Each rendered position container is its own native popover. We open it on
    // mount so the position is promoted to the browser top layer. When the
    // position has no more toasts, the slot unmounts and the browser removes
    // it from the top layer automatically — no explicit hidePopover needed.
    useIsomorphicLayoutEffect(() => {
      if (!positionHasToasts) {
        return;
      }
      const el = popoverRef.current;
      if (!el || typeof el.showPopover !== 'function') {
        return;
      }
      const isOpen = SUPPORTS_POPOVER_OPEN_SELECTOR && el.matches(':popover-open');
      if (!isOpen) {
        el.showPopover();
      }
    }, [positionHasToasts]);

    return slot.optional<ExtractSlotProps<Slot<'div'>>>(positionHasToasts ? {} : null, {
      defaultProps: {
        ref: useMergedRefs(toasterRef, popoverRef),
        children: toastsToRender.get(toastPosition)?.map(toast => (
          <ToastContainer
            {...toast}
            tryRestoreFocus={tryRestoreFocus}
            intent={toast.intent}
            announce={announceToast}
            key={toast.toastId}
            visible={isToastVisible(toast.toastId)}
          >
            {toast.content as React.ReactNode}
          </ToastContainer>
        )),
        onKeyDown,
        popover: 'manual' as const,
        'data-toaster-position': toastPosition,
        role: 'list',
        ...rootProps,
      } as ExtractSlotProps<Slot<'div'>>,
      elementType: 'div',
    });
  };

  const bottomStart = usePositionSlot('bottom-start');
  const bottomEnd = usePositionSlot('bottom-end');
  const topStart = usePositionSlot('top-start');
  const topEnd = usePositionSlot('top-end');
  const top = usePositionSlot('top');
  const bottom = usePositionSlot('bottom');

  return {
    dir,
    components: {
      root: 'div',
      bottomStart: 'div',
      bottomEnd: 'div',
      topStart: 'div',
      topEnd: 'div',
      top: 'div',
      bottom: 'div',
    },
    root: slot.always(rootProps, { elementType: 'div' }),
    bottomStart,
    bottomEnd,
    topStart,
    topEnd,
    top,
    bottom,
    announceRef,
    offset,
    announce: announceProp ?? announce,
    renderAriaLive: !announceProp,
  };
};
