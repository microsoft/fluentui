import * as React from 'react';
import {
  useControllableState,
  useEventCallback,
  useOnClickOutside,
  useOnScrollOutside,
} from '@fluentui/react-utilities';
import { useFluent } from '@fluentui/react-shared-contexts';
import {
  usePopper,
  resolvePositioningShorthand,
  mergeArrowOffset,
  usePopperMouseTarget,
} from '@fluentui/react-positioning';
import { elementContains } from '@fluentui/react-portal';
import { arrowHeights } from '../PopoverSurface/index';
import type { OpenPopoverEvents, PopoverProps, PopoverState, PopoverRender } from './Popover.types';
import { renderPopover_unstable } from './renderPopover';

/**
 * Create the state required to render Popover.
 *
 * The returned state can be modified with hooks such as usePopoverStyles,
 * before being passed to renderPopover_unstable.
 *
 * @param props - props from this instance of Popover
 */
export const usePopover_unstable = (props: PopoverProps): [PopoverState, PopoverRender] => {
  const [contextTarget, setContextTarget] = usePopperMouseTarget();
  const initialState = {
    size: 'medium',
    contextTarget,
    setContextTarget,
    ...props,
  } as const;

  const [open, setOpen] = useOpenState(initialState);
  const popperRefs = usePopoverRefs(initialState);

  const { targetDocument } = useFluent();
  useOnClickOutside({
    contains: elementContains,
    element: targetDocument,
    callback: ev => setOpen(ev, false),
    refs: [popperRefs.triggerRef, popperRefs.contentRef],
    disabled: !open,
  });
  useOnScrollOutside({
    contains: elementContains,
    element: targetDocument,
    callback: ev => setOpen(ev, false),
    refs: [popperRefs.triggerRef, popperRefs.contentRef],
    disabled: !open || !initialState.openOnContext, // only close on scroll for context
  });

  const state: PopoverState = {
    ...initialState,
    ...popperRefs,
    open,
    setOpen,
    setContextTarget,
    contextTarget,
  };

  return [state, renderPopover_unstable];
};

/**
 * Creates and manages the Popover open state
 */
function useOpenState(
  state: Pick<PopoverState, 'setContextTarget' | 'onOpenChange'> & Pick<PopoverProps, 'open' | 'defaultOpen'>,
) {
  const onOpenChange: PopoverState['onOpenChange'] = useEventCallback((e, data) => state.onOpenChange?.(e, data));

  const [open, setOpenState] = useControllableState({
    state: state.open,
    defaultState: state.defaultOpen,
    initialState: false,
  });
  state.open = open !== undefined ? open : state.open;
  const setContextTarget = state.setContextTarget;

  const setOpen = React.useCallback(
    (e: OpenPopoverEvents, shouldOpen: boolean) => {
      if (shouldOpen && e.type === 'contextmenu') {
        setContextTarget(e as React.MouseEvent);
      }

      if (!shouldOpen) {
        setContextTarget(undefined);
      }

      setOpenState(prevOpen => {
        // More than one event (mouse, focus, keyboard) can request the Popover to close
        // We assume the first event is the correct one
        if (prevOpen !== shouldOpen) {
          onOpenChange?.(e, { open: shouldOpen });
        }

        return shouldOpen;
      });
    },
    [setOpenState, onOpenChange, setContextTarget],
  );

  return [open, setOpen] as const;
}

/**
 * Creates and sets the necessary trigger, target and content refs used by Popover
 */
function usePopoverRefs(
  state: Pick<PopoverState, 'size' | 'contextTarget'> & Pick<PopoverProps, 'positioning' | 'openOnContext' | 'noArrow'>,
) {
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

  return {
    triggerRef,
    contentRef,
    arrowRef,
  } as const;
}
