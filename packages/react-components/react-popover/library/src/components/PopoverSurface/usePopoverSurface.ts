import * as React from 'react';
import { getIntrinsicElementProps, useMergedRefs, slot, useFirstMount } from '@fluentui/react-utilities';
import { useModalAttributes } from '@fluentui/react-tabster';
import { usePopoverContext_unstable } from '../../popoverContext';
import type { PopoverSurfaceProps, PopoverSurfaceState } from './PopoverSurface.types';
import { resolvePositioningShorthand } from '@fluentui/react-positioning';
import type { Alignment, Position } from '@fluentui/react-positioning';

/**
 * Create the state required to render PopoverSurface.
 *
 * The returned state can be modified with hooks such as usePopoverSurfaceStyles_unstable,
 * before being passed to renderPopoverSurface_unstable.
 *
 * @param props - props from this instance of PopoverSurface
 * @param ref - reference to root HTMLDivElement of PopoverSurface
 */
export const usePopoverSurface_unstable = (
  props: PopoverSurfaceProps,
  ref: React.Ref<HTMLDivElement>,
): PopoverSurfaceState => {
  const popoverId = usePopoverContext_unstable(context => context.popoverId);
  const positioningCtx = usePopoverContext_unstable(context => context.positioning);
  const contentRef = usePopoverContext_unstable(context => context.contentRef);
  const openOnHover = usePopoverContext_unstable(context => context.openOnHover);
  const open = usePopoverContext_unstable(context => context.open);
  const setOpen = usePopoverContext_unstable(context => context.setOpen);
  const mountNode = usePopoverContext_unstable(context => context.mountNode);
  const arrowRef = usePopoverContext_unstable(context => context.arrowRef);
  const size = usePopoverContext_unstable(context => context.size);
  const withArrow = usePopoverContext_unstable(context => context.withArrow);
  const appearance = usePopoverContext_unstable(context => context.appearance);
  const trapFocus = usePopoverContext_unstable(context => context.trapFocus);
  const inertTrapFocus = usePopoverContext_unstable(context => context.inertTrapFocus);
  const { modalAttributes } = useModalAttributes({
    trapFocus,
    legacyTrapFocus: !inertTrapFocus,
    alwaysFocusable: !trapFocus,
  });

  const surfaceRef = React.useRef<HTMLElement>();
  const positioning = resolvePositioningShorthand(positioningCtx);

  const state: PopoverSurfaceState = {
    appearance,
    withArrow,
    size,
    arrowRef,
    mountNode,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `contentRef` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: useMergedRefs(ref, contentRef, surfaceRef) as React.Ref<HTMLDivElement>,
        role: trapFocus ? 'dialog' : 'group',
        'aria-modal': trapFocus ? true : undefined,
        id: popoverId,
        popover: openOnHover ? 'hint' : 'auto',
        ...modalAttributes,
        ...props,
        style: {
          positionAnchor: `--${popoverId}`,
          positionArea: toPositionArea(positioning?.align, positioning?.position),
          positionTryFallbacks: 'flip-block, flip-inline',
          margin: 0,
          ...props.style,
        },
      }),
      { elementType: 'div' },
    ),
  };

  const {
    onMouseEnter: onMouseEnterOriginal,
    onMouseLeave: onMouseLeaveOriginal,
    // onKeyDown: onKeyDownOriginal,
    // @ts-expect-error React types are missing this event
    onToggle: onToggleOriginal,
  } = state.root;
  state.root.onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (openOnHover) {
      setOpen(e, true);
    }

    onMouseEnterOriginal?.(e);
  };

  state.root.onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (openOnHover) {
      setOpen(e, false);
    }

    onMouseLeaveOriginal?.(e);
  };

  // React 18 doesn't properly support `popover`
  // so manually wire up the events :/
  // See: https://github.com/facebook/react/issues/27479
  // React.useEffect(() => {
  //   const onToggle = (e: any) => {
  //     if (e.oldState === 'open' && e.newState === 'closed' && e.target === state.root.ref?.current) {
  //       setOpen(e, false);
  //     }

  //     onToggleOriginal?.(e);
  //   };
  //   surfaceRef.current?.addEventListener('toggle', onToggle);

  //   return () => surfaceRef.current?.removeEventListener('toggle', onToggle);
  // }, [onToggleOriginal]);

  const isFirst = useFirstMount();
  // Handle the default open case
  React.useEffect(() => {
    if (open && isFirst) {
      surfaceRef.current?.showPopover();
    }
  }, [open, isFirst]);

  return state;
};

const getPositionMap = (rtl?: boolean): Record<Position, string> => ({
  above: 'top',
  below: 'bottom',
  before: rtl ? 'right' : 'left',
  after: rtl ? 'left' : 'right',
});

const getAlignmentMap = (): Record<Alignment, string | undefined> => ({
  start: 'start',
  end: 'end',
  top: 'start',
  bottom: 'end',
  center: undefined,
});

const shouldAlignToCenter = (p?: Position, a?: Alignment): boolean => {
  const positionedVertically = p === 'above' || p === 'below';
  const alignedVertically = a === 'top' || a === 'bottom';

  return (positionedVertically && alignedVertically) || (!positionedVertically && !alignedVertically);
};

const toPositionArea = (align?: Alignment, position?: Position, rtl?: boolean): string => {
  const alignment = shouldAlignToCenter(position, align) ? 'center' : align;

  const computedPosition = position && getPositionMap(rtl)[position];
  const computedAlignment = alignment && getAlignmentMap()[alignment];

  if (computedPosition && computedAlignment) {
    return `${computedPosition} ${computedAlignment}`;
  }

  if (!computedPosition) {
    return 'top span-all';
  }

  return computedPosition;
};
