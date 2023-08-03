import * as React from 'react';
import {
  ExtractSlotProps,
  Slot,
  getNativeElementProps,
  isHTMLElement,
  resolveShorthand,
} from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { ToasterProps, ToasterState } from './Toaster.types';
import { TOAST_POSITIONS, ToastPosition, useToaster } from '../../state';
import { Announce } from '../AriaLive';
import { ToastContainer } from '../ToastContainer';

/**
 * Create the state required to render Toaster.
 *
 * @param props - props from this instance of Toaster
 */
export const useToaster_unstable = (props: ToasterProps): ToasterState => {
  const { offset, announce: announceProp, ...rest } = props;
  const announceRef = React.useRef<Announce>(() => null);
  const { toastsToRender, isToastVisible, pauseAllToasts, playAllToasts, tryRestoreFocus } =
    useToaster<HTMLDivElement>(rest);
  const announce = React.useCallback<Announce>((message, options) => announceRef.current(message, options), []);
  const { dir } = useFluent();

  const rootProps = getNativeElementProps('div', rest);

  // Adds native HTML focusin/focusout listeners
  // https://github.com/facebook/react/issues/25194
  const focusListenerRef = React.useCallback(
    (el: HTMLDivElement | null) => {
      if (el) {
        el.addEventListener('focusin', e => {
          if (
            isHTMLElement(e.currentTarget) &&
            !e.currentTarget.contains(isHTMLElement(e.relatedTarget) ? e.relatedTarget : null)
          ) {
            pauseAllToasts();
          }
        });

        el.addEventListener('focusout', e => {
          if (
            isHTMLElement(e.currentTarget) &&
            !e.currentTarget.contains(isHTMLElement(e.relatedTarget) ? e.relatedTarget : null)
          ) {
            playAllToasts();
            tryRestoreFocus();
          }
        });
      }
    },
    [playAllToasts, pauseAllToasts, tryRestoreFocus],
  );

  const createPositionSlot = (toastPosition: ToastPosition) =>
    resolveShorthand(toastsToRender.has(toastPosition) ? rootProps : null, {
      defaultProps: {
        ref: focusListenerRef,
        children: toastsToRender.get(toastPosition)?.map(toast => (
          <ToastContainer
            {...toast}
            tryRestoreFocus={tryRestoreFocus}
            intent={toast.intent}
            announce={announce}
            key={toast.toastId}
            visible={isToastVisible(toast.toastId)}
          >
            {toast.content as React.ReactNode}
          </ToastContainer>
        )),
        'data-toaster-position': toastPosition,
        // Explicitly casting because our slot types can't handle data attributes
      } as ExtractSlotProps<Slot<'div'>>,
    });

  return {
    dir,
    components: {
      root: 'div',
      bottomStart: 'div',
      bottomEnd: 'div',
      topStart: 'div',
      topEnd: 'div',
    },
    root: resolveShorthand(rootProps, { required: true }),
    bottomStart: createPositionSlot(TOAST_POSITIONS.bottomStart),
    bottomEnd: createPositionSlot(TOAST_POSITIONS.bottomEnd),
    topStart: createPositionSlot(TOAST_POSITIONS.topStart),
    topEnd: createPositionSlot(TOAST_POSITIONS.topEnd),
    announceRef,
    offset,
    announce: announceProp ?? announce,
    renderAriaLive: !announceProp,
  };
};
