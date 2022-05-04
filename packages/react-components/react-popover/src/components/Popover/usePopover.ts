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
import { useFocusFinders } from '@fluentui/react-tabster';
import { arrowHeights } from '../PopoverSurface/index';
import type { OpenPopoverEvents, PopoverProps, PopoverState } from './Popover.types';

/**
 * Create the state required to render Popover.
 *
 * The returned state can be modified with hooks such as usePopoverStyles,
 * before being passed to renderPopover_unstable.
 *
 * @param props - props from this instance of Popover
 */
export const usePopover_unstable = (props: PopoverProps): PopoverState => {
  const [contextTarget, setContextTarget] = usePopperMouseTarget();
  const initialState = {
    size: 'medium',
    contextTarget,
    setContextTarget,
    ...props,
  } as const;

  const children = React.Children.toArray(props.children) as React.ReactElement[];

  if (process.env.NODE_ENV !== 'production') {
    if (children.length === 0) {
      // eslint-disable-next-line no-console
      console.warn('Popover must contain at least one child');
    }

    if (children.length > 2) {
      // eslint-disable-next-line no-console
      console.warn('Popover must contain at most two children');
    }
  }

  let popoverTrigger: React.ReactElement | undefined = undefined;
  let popoverSurface: React.ReactElement | undefined = undefined;
  if (children.length === 2) {
    popoverTrigger = children[0];
    popoverSurface = children[1];
  } else if (children.length === 1) {
    popoverSurface = children[0];
  }

  const [open, setOpen] = useOpenState(initialState);
  const toggleOpen = React.useCallback<PopoverState['toggleOpen']>(
    e => {
      setOpen(e, !open);
    },
    [setOpen, open],
  );

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

  const { findFirstFocusable } = useFocusFinders();

  React.useEffect(() => {
    if (open && popperRefs.contentRef.current) {
      const firstFocusable = findFirstFocusable(popperRefs.contentRef.current);
      firstFocusable?.focus();
    }
  }, [findFirstFocusable, open, popperRefs.contentRef]);

  return {
    ...initialState,
    ...popperRefs,
    popoverTrigger,
    popoverSurface,
    open,
    setOpen,
    toggleOpen,
    setContextTarget,
    contextTarget,
  };
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
