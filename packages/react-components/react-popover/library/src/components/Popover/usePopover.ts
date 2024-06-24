import * as React from 'react';
import {
  useControllableState,
  useEventCallback,
  useOnClickOutside,
  useOnScrollOutside,
  elementContains,
  useTimeout,
} from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import {
  usePositioning,
  resolvePositioningShorthand,
  mergeArrowOffset,
  usePositioningMouseTarget,
} from '@fluentui/react-positioning';
import { useFocusFinders } from '@fluentui/react-tabster';
import { arrowHeights } from '../PopoverSurface/index';
import type { OpenPopoverEvents, PopoverProps, PopoverState } from './Popover.types';
import { popoverSurfaceBorderRadius } from './constants';

/**
 * Create the state required to render Popover.
 *
 * The returned state can be modified with hooks such as usePopoverStyles,
 * before being passed to renderPopover_unstable.
 *
 * @param props - props from this instance of Popover
 */
export const usePopover_unstable = (props: PopoverProps): PopoverState => {
  const [contextTarget, setContextTarget] = usePositioningMouseTarget();
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

  const [open, setOpenState] = useOpenState(initialState);

  const [setOpenTimeout, clearOpenTimeout] = useTimeout();
  const setOpen = useEventCallback((e: OpenPopoverEvents, shouldOpen: boolean) => {
    clearOpenTimeout();
    if (!(e instanceof Event) && e.persist) {
      // < React 17 still uses pooled synthetic events
      e.persist();
    }

    if (e.type === 'mouseleave') {
      // FIXME leaking Node timeout type
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setOpenTimeout(() => {
        setOpenState(e, shouldOpen);
      }, props.mouseLeaveDelay ?? 500);
    } else {
      setOpenState(e, shouldOpen);
    }
  });

  const toggleOpen = React.useCallback<PopoverState['toggleOpen']>(
    e => {
      setOpen(e, !open);
    },
    [setOpen, open],
  );

  const positioningRefs = usePopoverRefs(initialState);
  const { targetDocument } = useFluent();

  useOnClickOutside({
    contains: elementContains,
    element: targetDocument,
    callback: ev => setOpen(ev, false),
    refs: [positioningRefs.triggerRef, positioningRefs.contentRef],
    disabled: !open,
    disabledFocusOnIframe: !(props.closeOnIframeFocus ?? true),
  });

  // only close on scroll for context, or when closeOnScroll is specified
  const closeOnScroll = initialState.openOnContext || initialState.closeOnScroll;
  useOnScrollOutside({
    contains: elementContains,
    element: targetDocument,
    callback: ev => setOpen(ev, false),
    refs: [positioningRefs.triggerRef, positioningRefs.contentRef],
    disabled: !open || !closeOnScroll,
  });

  const { findFirstFocusable } = useFocusFinders();

  React.useEffect(() => {
    if (props.unstable_disableAutoFocus) {
      return;
    }

    if (open && positioningRefs.contentRef.current) {
      const containerTabIndex = positioningRefs.contentRef.current.getAttribute('tabIndex') ?? undefined;
      const firstFocusable = isNaN(containerTabIndex)
        ? findFirstFocusable(positioningRefs.contentRef.current)
        : positioningRefs.contentRef.current;
      firstFocusable?.focus();
    }
  }, [findFirstFocusable, open, positioningRefs.contentRef, props.unstable_disableAutoFocus]);

  return {
    ...initialState,
    ...positioningRefs,
    // eslint-disable-next-line deprecation/deprecation
    inertTrapFocus: props.inertTrapFocus ?? (props.legacyTrapFocus === undefined ? false : !props.legacyTrapFocus),
    popoverTrigger,
    popoverSurface,
    open,
    setOpen,
    toggleOpen,
    setContextTarget,
    contextTarget,
    inline: props.inline ?? false,
  };
};

/**
 * Creates and manages the Popover open state
 */
function useOpenState(
  state: Pick<PopoverState, 'setContextTarget' | 'onOpenChange'> & Pick<PopoverProps, 'open' | 'defaultOpen'>,
) {
  'use no memo';

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

      setOpenState(shouldOpen);
      onOpenChange?.(e, { open: shouldOpen });
    },
    [setOpenState, onOpenChange, setContextTarget],
  );

  return [open, setOpen] as const;
}

/**
 * Creates and sets the necessary trigger, target and content refs used by Popover
 */
function usePopoverRefs(
  state: Pick<PopoverState, 'size' | 'contextTarget'> &
    Pick<PopoverProps, 'positioning' | 'openOnContext' | 'withArrow'>,
) {
  'use no memo';

  const positioningOptions = {
    position: 'above' as const,
    align: 'center' as const,
    arrowPadding: 2 * popoverSurfaceBorderRadius,
    target: state.openOnContext ? state.contextTarget : undefined,
    ...resolvePositioningShorthand(state.positioning),
  };

  // no reason to render arrow when covering the target
  if (positioningOptions.coverTarget) {
    state.withArrow = false;
  }

  if (state.withArrow) {
    positioningOptions.offset = mergeArrowOffset(positioningOptions.offset, arrowHeights[state.size]);
  }

  const { targetRef: triggerRef, containerRef: contentRef, arrowRef } = usePositioning(positioningOptions);

  return {
    triggerRef,
    contentRef,
    arrowRef,
  } as const;
}
