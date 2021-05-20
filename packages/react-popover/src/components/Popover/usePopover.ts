import * as React from 'react';
import { makeMergeProps, useControllableValue, useEventCallback, useOnClickOutside } from '@fluentui/react-utilities';
import { useFluent } from '@fluentui/react-shared-contexts';
import { usePopper } from '@fluentui/react-positioning';
import { elementContains } from '@fluentui/react-portal';
import { PopoverProps, PopoverState } from './Popover.types';

const mergeProps = makeMergeProps<PopoverState>({});

/**
 * Create the state required to render Popover.
 *
 * The returned state can be modified with hooks such as usePopoverStyles,
 * before being passed to renderPopover.
 *
 * @param props - props from this instance of Popover
 * @param defaultProps - (optional) default prop values provided by the implementing type
 */
export const usePopover = (props: PopoverProps, defaultProps?: PopoverProps): PopoverState => {
  const state = mergeProps(
    {
      open: (undefined as unknown) as boolean, // mergeProps typings require this
      setOpen: () => null,
      triggerRef: { current: null },
      contentRef: { current: null },
      children: null,
      position: 'below',
      align: 'start',
    },
    defaultProps,
    props,
  );

  useOpenState(state);
  usePopoverRefs(state);

  const { targetDocument } = useFluent();
  useOnClickOutside({
    contains: elementContains,
    element: targetDocument,
    callback: ev => state.setOpen(ev, false),
    refs: [state.triggerRef, state.contentRef],
    disabled: !state.open,
  });

  return state;
};

/**
 * Creates and manages the Popover open state
 * @param state Popover state
 */
function useOpenState(state: PopoverState): PopoverState {
  const onOpenChange: PopoverState['onOpenChange'] = useEventCallback((e, data) => state.onOpenChange?.(e, data));

  const [open, setOpen] = useControllableValue(state.open, state.defaultOpen);
  state.open = open !== undefined ? open : state.open;

  state.setOpen = React.useCallback(
    (e, shouldOpen) => {
      setOpen(prevOpen => {
        // More than one event (mouse, focus, keyboard) can request the Popover to close
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
 * Creates and sets the necessary trigger, target and content refs used by Popover
 * @param state Popover state
 */
function usePopoverRefs(state: PopoverState): PopoverState {
  const { targetRef: triggerRef, containerRef: contentRef } = usePopper({
    align: state.align,
    position: state.position,
    target: state.target,
    coverTarget: state.coverTarget,
  });

  state.contentRef = contentRef;
  state.triggerRef = triggerRef;

  return state;
}
