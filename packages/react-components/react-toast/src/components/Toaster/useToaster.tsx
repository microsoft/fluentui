import * as React from 'react';
import { ExtractSlotProps, Slot, getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { ToasterProps, ToasterState } from './Toaster.types';
import { TOAST_POSITIONS, ToastPosition, useToaster } from '../../state';
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

  const rootProps = getNativeElementProps('div', rest);

  const createPositionSlot = (toastPosition: ToastPosition) =>
    resolveShorthand(toastsToRender.has(toastPosition) ? rootProps : null, {
      defaultProps: {
        children: toastsToRender.get(toastPosition)?.map(toast => (
          <Toast {...toast} announce={announce} key={toast.toastId} visible={isToastVisible(toast.toastId)}>
            {toast.content as React.ReactNode}
          </Toast>
        )),
        'data-toaster-position': toastPosition,
        // Explicitly casting because our slot types can't handle data attributes
      } as ExtractSlotProps<Slot<'div'>>,
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
    bottomLeft: createPositionSlot(TOAST_POSITIONS.bottomLeft),
    bottomRight: createPositionSlot(TOAST_POSITIONS.bottomRight),
    topLeft: createPositionSlot(TOAST_POSITIONS.topLeft),
    topRight: createPositionSlot(TOAST_POSITIONS.topRight),
    announceRef,
    offset,
    announce: announceProp ?? announce,
    renderAriaLive: !announceProp,
  };
};
