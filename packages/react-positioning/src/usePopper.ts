import { Middleware, Strategy } from '@floating-ui/core';
import { computePosition } from '@floating-ui/dom';
import { useFluent } from '@fluentui/react-shared-contexts';
import { canUseDOM, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import { PopperOptions, PositioningProps, PopperVirtualElement } from './types';
import { getPlacement } from './utils/positioningHelper';
import { useCallbackRef } from './utils/useCallbackRef';
import {
  offset as offsetMiddleware,
  arrow as arrowMiddleware,
  shift as shiftMiddleware,
  flip as flipMiddleware,
  coverTarget as coverTargetMiddleware,
  maxSize as maxSizeMiddleware,
} from './middleware';
import { getScrollParent } from './utils/getScrollParent';
import debounce from './utils/debounce';
import { useFirstMount } from '@fluentui/react-utilities';

function usePopperOptions(options: PopperOptions) {
  const {
    align,
    arrowPadding,
    autoSize,
    coverTarget,
    flipBoundary,
    offset,
    overflowBoundary,
    pinned,
    position,
    unstable_disableTether: disableTether,
    positionFixed,
  } = options;

  const { dir } = useFluent();
  const isRtl = dir === 'rtl';
  const strategy: Strategy = positionFixed ? 'fixed' : 'absolute';

  return React.useCallback(
    (target: HTMLElement | PopperVirtualElement | null, container: HTMLElement | null, arrow: HTMLElement | null) => {
      const scrollParentElement: HTMLElement = getScrollParent(container);
      const hasScrollableElement = scrollParentElement
        ? scrollParentElement !== scrollParentElement.ownerDocument?.body
        : false;

      const placement = getPlacement(align, position, isRtl);
      const middleware = [
        ...[offset && offsetMiddleware({ value: offset, isRtl })],
        ...[coverTarget && coverTargetMiddleware()],
        ...[!pinned && flipMiddleware({ container, flipBoundary, hasScrollableElement })],
        shiftMiddleware({ container, hasScrollableElement, overflowBoundary, disableTether }),
        ...[autoSize && maxSizeMiddleware(autoSize)],
        ...[arrow && arrowMiddleware({ arrowElement: arrow, arrowPadding })],
      ].filter(Boolean) as Middleware[];

      return {
        placement,
        middleware,
        strategy,
      };
    },
    [
      isRtl,
      align,
      position,
      disableTether,
      pinned,
      arrowPadding,
      overflowBoundary,
      flipBoundary,
      offset,
      coverTarget,
      autoSize,
      strategy,
    ],
  );
}

export function usePopper(
  options: PositioningProps,
): {
  // React refs are supposed to be contravariant
  // (allows a more general type to be passed rather than a more specific one)
  // However, Typescript currently can't infer that fact for refs
  // See https://github.com/microsoft/TypeScript/issues/30748 for more information
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  targetRef: React.MutableRefObject<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  containerRef: React.MutableRefObject<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  arrowRef: React.MutableRefObject<any>;
} {
  const isFirstMount = useFirstMount();
  const isFirstUpdate = React.useRef(true);
  const { targetDocument } = useFluent();
  const enabled = true;
  const resolvePopperOptions = usePopperOptions(options);

  const forceUpdate = useEventCallback(() => {
    const target = overrideTargetRef.current ?? targetRef.current;
    if (!canUseDOM || !enabled || !target || !containerRef.current) {
      return;
    }

    const { placement, middleware, strategy } = resolvePopperOptions(target, containerRef.current, arrowRef.current);

    // Revert to intended position before the first update
    if (isFirstUpdate.current) {
      Object.assign(containerRef.current.style, { position: strategy });
      isFirstUpdate.current = false;
    }

    computePosition(target, containerRef.current, { placement, middleware, strategy }).then(
      ({ x, y, middlewareData, placement: computedPlacement }) => {
        if (!containerRef.current) {
          return;
        }

        isFirstUpdate.current = false;
        containerRef.current.setAttribute('data-popper-placement', computedPlacement);
        Object.assign(containerRef.current.style, {
          // Layer acceleration can disable subpixel rendering which causes slightly
          // blurry text on low PPI displays, so we want to use 2D transforms
          // instead
          transform:
            (targetDocument?.defaultView?.devicePixelRatio || 1) <= 1
              ? `translate(${x}px, ${y}px)`
              : `translate3d(${x}px, ${y}px, 0)`,
          position: strategy,
        });

        if (middlewareData.arrow && arrowRef.current) {
          const { x: arrowX, y: arrowY } = middlewareData.arrow;

          Object.assign(arrowRef.current.style, {
            left: `${arrowX}px`,
            top: `${arrowY}px`,
          });
        }
      },
    );
  });

  const updatePosition = React.useState(() => debounce(forceUpdate))[0];

  // When a ref updates, we consider a new positioning cycle
  const handleRefUpdate = useEventCallback(() => {
    isFirstUpdate.current = true;
    updatePosition();
  });

  const targetRef = useCallbackRef<HTMLElement | PopperVirtualElement | null>(null, handleRefUpdate, true);
  const containerRef = useCallbackRef<HTMLElement | null>(null, handleRefUpdate, true);
  const arrowRef = useCallbackRef<HTMLElement | null>(null, handleRefUpdate, true);
  const overrideTargetRef = useCallbackRef<HTMLElement | PopperVirtualElement | null>(null, handleRefUpdate, true);

  React.useImperativeHandle(
    options.popperRef,
    () => ({
      updatePosition,
      setTarget: (target: HTMLElement | PopperVirtualElement) => {
        if (options.target && process.env.NODE_ENV !== 'production') {
          const err = new Error();
          // eslint-disable-next-line no-console
          console.warn('Imperative setTarget should not be used at the same time as target option');
          // eslint-disable-next-line no-console
          console.warn(err.stack);
        }

        overrideTargetRef.current = target;
      },
    }),
    // Missing deps:
    // options.target - only used for a runtime warning
    // overrideTargetRef - Stable between renders
    // updatePosition - Stable between renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useIsomorphicLayoutEffect(() => {
    if (options.target) {
      overrideTargetRef.current = options.target;
    }
  }, [options.target, overrideTargetRef, containerRef]);

  useIsomorphicLayoutEffect(
    () => {
      /**
       * At the start of a positioning cycle, the container position is always fixed to avoid scroll jumps.
       * Scroll jumps can happen if content in the floater is focused before it is
       * positioned. fixed positiong means that the floater will always be in the viewport
       * so it can be focused without scrolling. This is reset before the first first position update
       */
      if (enabled && containerRef.current && isFirstUpdate.current) {
        Object.assign(containerRef.current.style, { position: 'fixed', top: 0, left: 0 });
      }

      updatePosition();
      // `enabled` changes start a new positioning cycle
      return () => {
        isFirstUpdate.current = true;
      };
    },
    // Missing deps:
    // updatePosition - referentially stable
    // containerRef - referentially stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [enabled],
  );

  // Update position if rerender caused options to change
  useIsomorphicLayoutEffect(
    () => {
      if (!isFirstMount) {
        updatePosition();
      }
    },
    // Missing deps:
    // isFirstMount - Should never change after mount
    // arrowRef, containerRef, targetRef - Stable between renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [resolvePopperOptions],
  );

  // Add window resize and scroll listeners to update position
  useIsomorphicLayoutEffect(() => {
    const win = targetDocument?.defaultView;
    if (!win) {
      return;
    }

    win.addEventListener('resize', updatePosition);
    win.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [updatePosition, targetDocument]);

  return { targetRef, containerRef, arrowRef };
}
