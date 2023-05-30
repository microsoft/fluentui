import * as React from 'react';
import { ExtractSlotProps, Slot, getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { ToasterProps, ToasterState } from './Toaster.types';
import { TOAST_POSITIONS, useToaster } from '../../state';
import { Announce } from '../AriaLive';
import { Toast } from '../Toast';

/**
 * Create the state required to render Toaster.
 *
 * @param props - props from this instance of Toaster
 */
export const useToaster_unstable = (props: ToasterProps): ToasterState => {
  const { offset, announce: announceProp, ...rest } = props;
  const announceRef = React.useRef<Announce>(() => null);
  const { toastsToRender, isToastVisible } = useToaster<HTMLDivElement>(rest);
  const announce = React.useCallback<Announce>((message, options) => announceRef.current(message, options), []);

  const rootProps = getNativeElementProps('div', {
    ...rest,
  });

  return {
    components: {
      root: 'div',
      bottomLeft: 'div',
      bottomRight: 'div',
      topLeft: 'div',
      topRight: 'div',
    },
    root: resolveShorthand(rootProps, { required: true }),
    bottomLeft: resolveShorthand(toastsToRender.has(TOAST_POSITIONS.bottomLeft) ? rootProps : null, {
      defaultProps: {
        children: toastsToRender.get(TOAST_POSITIONS.bottomLeft)?.map(toast => (
          <Toast {...toast} announce={announce} key={toast.toastId} visible={isToastVisible(toast.toastId)}>
            {toast.content as React.ReactNode}
          </Toast>
        )),
        'data-toaster-position': TOAST_POSITIONS.bottomLeft,
        // Explicitly casting because our slot types can't handle data attributes
      } as ExtractSlotProps<Slot<'div'>>,
    }),
    bottomRight: resolveShorthand(toastsToRender.has(TOAST_POSITIONS.bottomRight) ? rootProps : null, {
      defaultProps: {
        children: toastsToRender.get(TOAST_POSITIONS.bottomRight)?.map(toast => (
          <Toast {...toast} announce={announce} key={toast.toastId} visible={isToastVisible(toast.toastId)}>
            {toast.content as React.ReactNode}
          </Toast>
        )),
        'data-toaster-position': TOAST_POSITIONS.bottomRight,
      } as ExtractSlotProps<Slot<'div'>>,
    }),
    topLeft: resolveShorthand(toastsToRender.has(TOAST_POSITIONS.topLeft) ? rootProps : null, {
      defaultProps: {
        children: toastsToRender.get(TOAST_POSITIONS.topLeft)?.map(toast => (
          <Toast {...toast} announce={announce} key={toast.toastId} visible={isToastVisible(toast.toastId)}>
            {toast.content as React.ReactNode}
          </Toast>
        )),
        'data-toaster-position': TOAST_POSITIONS.topLeft,
      } as ExtractSlotProps<Slot<'div'>>,
    }),
    topRight: resolveShorthand(toastsToRender.has(TOAST_POSITIONS.topRight) ? rootProps : null, {
      defaultProps: {
        children: toastsToRender.get(TOAST_POSITIONS.topRight)?.map(toast => (
          <Toast {...toast} announce={announce} key={toast.toastId} visible={isToastVisible(toast.toastId)}>
            {toast.content as React.ReactNode}
          </Toast>
        )),
        'data-toaster-position': TOAST_POSITIONS.topRight,
      } as ExtractSlotProps<Slot<'div'>>,
    }),
    announceRef,
    offset,
    announce: announceProp ?? announce,
    renderAriaLive: !announceProp,
  };
};
