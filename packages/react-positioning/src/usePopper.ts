import { Middleware } from '@floating-ui/core';
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
  } = options;

  const { dir } = useFluent();
  const isRtl = dir === 'rtl';

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
  const { targetDocument } = useFluent();
  const enabled = true;
  const resolvePopperOptions = usePopperOptions(options);
  const updatePosition = useEventCallback(() => {
    const target = overrideTargetRef.current ?? targetRef.current;
    if (!canUseDOM || !enabled || !target || !containerRef.current) {
      return;
    }

    Object.assign(containerRef.current.style, { position: 'absolute' });
    // for positionFixed
    // Object.assign(containerRef.current.style, { position: 'fixed' });

    const { placement, middleware } = resolvePopperOptions(target, containerRef.current, arrowRef.current);
    computePosition(target, containerRef.current, { placement, middleware }).then(
      ({ x, y, middlewareData, placement: computedPlacement }) => {
        if (!containerRef.current) {
          return;
        }

        containerRef.current.setAttribute('data-popper-placement', computedPlacement);
        Object.assign(containerRef.current.style, {
          left: `${x}px`,
          top: `${y}px`,
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

  const targetRef = useCallbackRef<HTMLElement | PopperVirtualElement | null>(null, updatePosition, true);
  const containerRef = useCallbackRef<HTMLElement | null>(null, updatePosition, true);
  const arrowRef = useCallbackRef<HTMLElement | null>(null, updatePosition, true);
  const overrideTargetRef = useCallbackRef<HTMLElement | PopperVirtualElement | null>(null, updatePosition, true);

  useIsomorphicLayoutEffect(() => {
    updatePosition();
  }, [updatePosition, enabled]);

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
