'use client';

import type * as React from 'react';
import { useMergedRefs, slot, useEventCallback } from '@fluentui/react-utilities';
import { usePopoverContext } from '../popoverContext';
import { useFocusScope } from '../../../hooks';
import { stringifyDataAttribute } from '../../../utils';
import type { PopoverSurfaceProps, PopoverSurfaceState } from './PopoverSurface.types';

/**
 * Returns the state for a PopoverSurface component.
 */
export const usePopoverSurface = (props: PopoverSurfaceProps, ref: React.Ref<HTMLDivElement>): PopoverSurfaceState => {
  const contentRef = usePopoverContext(context => context.contentRef);
  const openOnHover = usePopoverContext(context => context.openOnHover);
  const setOpen = usePopoverContext(context => context.setOpen);
  const arrowRef = usePopoverContext(context => context.arrowRef);
  const withArrow = usePopoverContext(context => context.withArrow);
  const trapFocus = usePopoverContext(context => context.trapFocus);
  const disableAutoFocus = usePopoverContext(context => context.disableAutoFocus);
  const inline = usePopoverContext(context => context.inline);
  const open = usePopoverContext(context => context.open);
  const mountNode = usePopoverContext(context => context.mountNode);
  const positioningCtx = usePopoverContext(context => context.positioning);
  const tabIndex = typeof props.tabIndex === 'number' ? props.tabIndex : undefined;

  const onMountAutoFocus = useEventCallback((event: Event) => {
    if (disableAutoFocus) {
      event.preventDefault();
      return;
    }

    if (tabIndex !== undefined) {
      event.preventDefault();
      contentRef.current?.focus({ preventScroll: true });
    }
  });

  const focusScope = useFocusScope({
    trapped: trapFocus,
    loop: trapFocus,
    onMountAutoFocus,
  });

  const mergedArrowRef = useMergedRefs(arrowRef, positioningCtx.arrowRef);

  const state: PopoverSurfaceState = {
    inline,
    withArrow,
    arrowRef: mergedArrowRef as React.RefObject<HTMLDivElement | null>,
    mountNode,
    components: { root: 'div' },
    root: slot.always(
      {
        ref: useMergedRefs(
          ref,
          contentRef,
          positioningCtx.containerRef,
          focusScope.containerRef,
        ) as React.Ref<HTMLDivElement>,
        role: trapFocus ? 'dialog' : 'group',
        'aria-modal': trapFocus ? true : undefined,
        tabIndex: focusScope.containerProps.tabIndex,
        ...props,
        'data-popover-surface': '',
        'data-open': stringifyDataAttribute(open),
      },
      { elementType: 'div' },
    ),
    'data-open': open ? 'true' : 'false',
  };

  const {
    onMouseEnter: onMouseEnterOriginal,
    onMouseLeave: onMouseLeaveOriginal,
    onKeyDown: onKeyDownOriginal,
  } = state.root;

  state.root.onMouseEnter = useEventCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (openOnHover) {
      setOpen(e, true);
    }
    onMouseEnterOriginal?.(e);
  });

  state.root.onMouseLeave = useEventCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (openOnHover) {
      setOpen(e, false);
    }
    onMouseLeaveOriginal?.(e);
  });

  const focusScopeKeyDown = focusScope.containerProps.onKeyDown;

  state.root.onKeyDown = useEventCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    focusScopeKeyDown(e);

    if (e.key === 'Escape') {
      const target = e.target as HTMLElement;
      const surface = contentRef.current;
      if (surface && target.closest('[data-popover-surface]') === surface) {
        e.preventDefault();
        setOpen(e, false);
      }
    }

    onKeyDownOriginal?.(e);
  });

  return state;
};
