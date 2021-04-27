import * as React from 'react';
import { makeMergeProps, useControllableValue, useOnClickOutside, useEventCallback } from '@fluentui/react-utilities';
import { useFluent } from '@fluentui/react-shared-contexts';
import { usePopper } from '@fluentui/react-positioning';
import { PopupProps, PopupState } from './Popup.types';
import { useCallbackRef } from './useCallbackRef';

const mergeProps = makeMergeProps<PopupState>({});

/**
 * Create the state required to render Popup.
 *
 * The returned state can be modified with hooks such as usePopupStyles,
 * before being passed to renderPopup.
 *
 * @param props - props from this instance of Popup
 * @param defaultProps - (optional) default prop values provided by the implementing type
 */
export const usePopup = (props: PopupProps, defaultProps?: PopupProps): PopupState => {
  const state = mergeProps(
    {
      open: (undefined as unknown) as boolean, // mergeProps typings require this
      setOpen: () => null,
      triggerRef: { current: null },
      targetRef: { current: null },
      contentRef: { current: null },
      children: null,
      position: 'below',
      align: 'start',
    },
    defaultProps,
    props,
  );

  useOpenState(state);
  usePopupRefs(state);

  const { targetDocument } = useFluent();
  useOnClickOutside({
    element: targetDocument,
    callback: ev => state.setOpen(ev, false),
    refs: [state.triggerRef, state.contentRef, state.targetRef],
  });

  return state;
};

/**
 * Creates and manages the popup open state
 * @param state Popup state
 */
function useOpenState(state: PopupState): PopupState {
  const [open, setOpen] = useControllableValue(state.open, state.defaultOpen);
  // TODO fix useControllableValue typing
  state.open = open !== undefined ? open : state.open;
  const onOpenChange: PopupState['onOpenChange'] = useEventCallback((e, data) => state.onOpenChange?.(e, data));
  state.setOpen = React.useCallback(
    (e, shouldOpen) => {
      setOpen(prevOpen => {
        // More than one event (mouse, focus, keyboard) can request the popup to close
        // We assume the first event is the correct one
        if (prevOpen !== shouldOpen) {
          onOpenChange?.(e, { open: shouldOpen });
        }

        return shouldOpen;
      });
    },
    [setOpen, onOpenChange],
  );

  return state;
}

/**
 * Creates and sets the necessary trigger, target and content refs used by popup
 * @param state Popup state
 */
function usePopupRefs(state: PopupState): PopupState {
  const { targetRef, containerRef: contentRef } = usePopper({
    align: state.align,
    position: state.position,
  });

  state.contentRef = contentRef;
  state.targetRef = targetRef;
  if (state.target) {
    state.targetRef.current = state.target;
  }

  const triggerRef = useCallbackRef<HTMLElement>(null, (newValue, lastValue) => {
    if (newValue !== lastValue && !state.target) {
      state.targetRef.current = (newValue as unknown) as HTMLElement;
    }
  });
  state.triggerRef = triggerRef;

  return state;
}
