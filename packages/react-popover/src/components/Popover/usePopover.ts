import * as React from 'react';
import {
  makeMergeProps,
  useControllableValue,
  useEventCallback,
  useOnClickOutside,
  useOnScrollOutside,
} from '@fluentui/react-utilities';
import { useFluent } from '@fluentui/react-shared-contexts';
import {
  usePopper,
  createVirtualElementFromClick,
  resolvePositioningShorthand,
  mergeArrowOffset,
} from '@fluentui/react-positioning';
import { elementContains } from '@fluentui/react-portal';
import { arrowHeights } from '../PopoverSurface/index';
import type { PopperVirtualElement } from '@fluentui/react-positioning';
import type { PopoverProps, PopoverState } from './Popover.types';

/**
 * Names of the shorthand properties in PopoverProps
 */
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
      size: 'medium',
      open: (undefined as unknown) as boolean, // mergeProps typings require this
      setOpen: () => null,
      triggerRef: { current: null },
      contentRef: { current: null },
      arrowRef: { current: null },
      children: null,
      setContextTarget: () => null,
      contextTarget: undefined,
    },
    defaultProps,
    props,
  );

  const [contextTarget, setContextTarget] = React.useState<PopperVirtualElement>();
  state.setContextTarget = setContextTarget;
  state.contextTarget = contextTarget;

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
  useOnScrollOutside({
    contains: elementContains,
    element: targetDocument,
    callback: ev => state.setOpen(ev, false),
    refs: [state.triggerRef, state.contentRef],
    disabled: !state.open || !state.openOnContext, // only close on scroll for context
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
  const setContextTarget = state.setContextTarget;

  state.setOpen = React.useCallback(
    (e, shouldOpen) => {
      if (shouldOpen && e.type === 'contextmenu') {
        const virtualElement = createVirtualElementFromClick((e as React.MouseEvent).nativeEvent);
        setContextTarget(virtualElement);
      }

      if (!shouldOpen) {
        setContextTarget(undefined);
      }

      setOpen(prevOpen => {
        // More than one event (mouse, focus, keyboard) can request the Popover to close
        // We assume the first event is the correct one
        if (prevOpen !== shouldOpen) {
          onOpenChange?.(e, { open: shouldOpen });
        }

        return shouldOpen;
      });
    },
    [setOpen, onOpenChange, setContextTarget],
  );

  return state;
}

/**
 * Creates and sets the necessary trigger, target and content refs used by Popover
 * @param state Popover state
 */
function usePopoverRefs(state: PopoverState): PopoverState {
  const popperOptions = {
    position: 'above' as const,
    align: 'center' as const,
    target: state.openOnContext ? state.contextTarget : undefined,
    ...resolvePositioningShorthand(state.positioning),
  };

  // no reason to render arrow when covering the target
  if (popperOptions.coverTarget) {
    state.noArrow = true;
  }

  if (!state.noArrow) {
    popperOptions.offset = mergeArrowOffset(popperOptions.offset, arrowHeights[state.size]);
  }

  const { targetRef: triggerRef, containerRef: contentRef, arrowRef } = usePopper(popperOptions);

  state.contentRef = contentRef;
  state.triggerRef = triggerRef;
  state.arrowRef = arrowRef;

  return state;
}
