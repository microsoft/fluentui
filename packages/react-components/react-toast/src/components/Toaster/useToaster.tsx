import * as React from 'react';
import {
  ExtractSlotProps,
  Slot,
  getNativeElementProps,
  useEventCallback,
  useMergedRefs,
  slot,
} from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useFocusableGroup } from '@fluentui/react-tabster';
import { Escape } from '@fluentui/keyboard-keys';
import type { ToasterProps, ToasterState } from './Toaster.types';
import { TOAST_POSITIONS, ToastPosition, useToaster } from '../../state';
import { Announce } from '../AriaLive';
import { ToastContainer } from '../ToastContainer';
import { useToasterFocusManagement_unstable } from './useToasterFocusManagement';
import { useToastAnnounce } from './useToastAnnounce';

/**
 * Create the state required to render Toaster.
 *
 * @param props - props from this instance of Toaster
 */
export const useToaster_unstable = (props: ToasterProps): ToasterState => {
  const { offset, announce: announceProp, mountNode, ...rest } = props;
  const announceRef = React.useRef<Announce>(() => null);
  const { toastsToRender, isToastVisible, pauseAllToasts, playAllToasts, tryRestoreFocus, closeAllToasts } =
    useToaster<HTMLDivElement>(rest);
  const announce = React.useCallback<Announce>((message, options) => announceRef.current(message, options), []);
  const { dir } = useFluent();

  const rootProps = slot.always(getNativeElementProps('div', rest), { elementType: 'div' });
  const focusableGroupAttr = useFocusableGroup({
    tabBehavior: 'limited-trap-focus',
    ignoreDefaultKeydown: { Escape: true },
  });
  const onKeyDown = useEventCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === Escape) {
      e.preventDefault();
      closeAllToasts();
    }
    props.onKeyDown?.(e);
  });
  const usePositionSlot = (toastPosition: ToastPosition) => {
    const focusManagementRef = useToasterFocusManagement_unstable(pauseAllToasts, playAllToasts);
    const { announceToast, toasterRef } = useToastAnnounce(announceProp ?? announce);
    return slot.optional(toastsToRender.has(toastPosition) ? rootProps : null, {
      defaultProps: {
        ref: useMergedRefs(focusManagementRef, toasterRef),
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
        ...focusableGroupAttr,
        'data-toaster-position': toastPosition,
        role: 'list',
        // Explicitly casting because our slot types can't handle data attributes
      } as ExtractSlotProps<Slot<'div'>>,
      elementType: 'div',
    });
  };
  return {
    dir,
    mountNode,
    components: { root: 'div', bottomStart: 'div', bottomEnd: 'div', topStart: 'div', topEnd: 'div' },
    root: slot.always(rootProps, { elementType: 'div' }),
    bottomStart: usePositionSlot(TOAST_POSITIONS.bottomStart),
    bottomEnd: usePositionSlot(TOAST_POSITIONS.bottomEnd),
    topStart: usePositionSlot(TOAST_POSITIONS.topStart),
    topEnd: usePositionSlot(TOAST_POSITIONS.topEnd),
    announceRef,
    offset,
    announce: announceProp ?? announce,
    renderAriaLive: !announceProp,
  };
};
