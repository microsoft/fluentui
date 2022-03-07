import {
  computePosition,
  Middleware,
  Strategy,
  hide as hideMiddleware,
  arrow as arrowMiddleware,
} from '@floating-ui/dom';
import { useFluent } from '@fluentui/react-shared-contexts';
import { canUseDOM, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import { PopperOptions, PositioningProps, PopperVirtualElement } from './types';
import { getPlacement } from './utils/positioningHelper';
import { useCallbackRef } from './utils/useCallbackRef';
import {
  offset as offsetMiddleware,
  shift as shiftMiddleware,
  flip as flipMiddleware,
  coverTarget as coverTargetMiddleware,
  maxSize as maxSizeMiddleware,
  intersectionObserver as intersectionObserverMiddleware,
} from './middleware/index';
import { getScrollParent } from './utils/getScrollParent';
import debounce from './utils/debounce';
import { useFirstMount } from '@fluentui/react-utilities';
import { dataPopperEscaped, dataPopperIntersecting, dataPopperReferenceHidden } from './contants';
import { toggleScrollListener } from './utils/toggleScrollListener';
import { hasAutofocusFilter } from './utils/hasAutoFocusFilter';

interface UsePopperOptions extends PositioningProps {
  /**
   * If false, does not position anything
   */
  enabled?: boolean;
}

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
        ...[offset && offsetMiddleware(offset)],
        ...[coverTarget && coverTargetMiddleware()],
        ...[!pinned && flipMiddleware({ container, flipBoundary, hasScrollableElement })],
        shiftMiddleware({ container, hasScrollableElement, overflowBoundary, disableTether }),
        ...[autoSize && maxSizeMiddleware(autoSize)],
        intersectionObserverMiddleware(),
        ...[arrow && arrowMiddleware({ element: arrow, padding: arrowPadding })],
        hideMiddleware({ strategy: 'referenceHidden' }),
        hideMiddleware({ strategy: 'escaped' }),
      ].filter(Boolean) as Middleware[];

      return {
        placement,
        middleware,
        strategy,
      };
    },
    [
      align,
      arrowPadding,
      autoSize,
      coverTarget,
      disableTether,
      flipBoundary,
      isRtl,
      offset,
      overflowBoundary,
      pinned,
      position,
      strategy,
    ],
  );
}

export function usePopper(
  options: UsePopperOptions,
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
  const { targetDocument } = useFluent();
  const { enabled = true } = options;
  const resolvePopperOptions = usePopperOptions(options);

  const forceUpdate = useEventCallback(() => {
    const target = overrideTargetRef.current ?? targetRef.current;
    if (!canUseDOM || !enabled || !target || !containerRef.current) {
      return;
    }

    const { placement, middleware, strategy } = resolvePopperOptions(target, containerRef.current, arrowRef.current);

    Object.assign(containerRef.current.style, { position: strategy });
    computePosition(target, containerRef.current, { placement, middleware, strategy }).then(
      ({ x, y, middlewareData, placement: computedPlacement }) => {
        if (!containerRef.current) {
          return;
        }

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

        containerRef.current.removeAttribute(dataPopperIntersecting);
        if (middlewareData.intersectionObserver.intersecting) {
          containerRef.current.setAttribute(dataPopperIntersecting, '');
        }

        containerRef.current.removeAttribute(dataPopperEscaped);
        if (middlewareData.hide?.escaped) {
          containerRef.current.setAttribute(dataPopperEscaped, '');
        }

        containerRef.current.removeAttribute(dataPopperReferenceHidden);
        if (middlewareData.hide?.referenceHidden) {
          containerRef.current.setAttribute(dataPopperReferenceHidden, '');
        }

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

  const targetRef = useCallbackRef<HTMLElement | PopperVirtualElement | null>(null, (target, prevTarget, isFirst) => {
    toggleScrollListener(target, prevTarget, updatePosition);

    if (!isFirst) {
      updatePosition();
    }
  });
  const containerRef = useCallbackRef<HTMLElement | null>(null, (container, prevContainer, isFirst) => {
    if (container && enabled) {
      // When the container is first resolved, set position `fixed` to avoid scroll jumps.
      // Without this scroll jumps can occur when the element is rendered initially and receives focus
      Object.assign(container.style, { position: 'fixed', top: 0, left: 0 });
    }

    toggleScrollListener(container, prevContainer, updatePosition);

    if (!isFirst) {
      updatePosition();
    }
  });
  const arrowRef = useCallbackRef<HTMLElement | null>(null, updatePosition, true);
  const overrideTargetRef = useCallbackRef<HTMLElement | PopperVirtualElement | null>(
    null,
    (target, prevTarget, isFirst) => {
      toggleScrollListener(target, prevTarget, updatePosition);

      if (!isFirst) {
        updatePosition();
      }
    },
  );

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
      updatePosition();
    },
    // Missing deps:
    // updatePosition - referentially stable
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
    // updatePosition - Stable between renders
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

  if (process.env.NODE_ENV !== 'production') {
    // This checked should run only in development mode
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (containerRef.current) {
        const contentNode = containerRef.current;
        const treeWalker = contentNode.ownerDocument?.createTreeWalker(contentNode, NodeFilter.SHOW_ELEMENT, {
          acceptNode: hasAutofocusFilter,
        });

        while (treeWalker.nextNode()) {
          const node = treeWalker.currentNode;
          // eslint-disable-next-line no-console
          console.warn('<Popper>:', node);
          // eslint-disable-next-line no-console
          console.warn(
            [
              '<Popper>: ^ this node contains "autoFocus" prop on a React element. This can break the initial',
              'positioning of an element and cause a window jump effect. This issue occurs because React polyfills',
              '"autoFocus" behavior to solve inconsistencies between different browsers:',
              'https://github.com/facebook/react/issues/11851#issuecomment-351787078',
              '\n',
              'However, ".focus()" in this case occurs before any other React effects will be executed',
              '(React.useEffect(), componentDidMount(), etc.) and we can not prevent this behavior. If you really',
              'want to use "autoFocus" please add "position: fixed" to styles of the element that is wrapped by',
              '"Popper".',
              `In general, it's not recommended to use "autoFocus" as it may break accessibility aspects:`,
              'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-autofocus.md',
              '\n',
              'We suggest to use the "trapFocus" prop on Fluent components or a catch "ref" and then use',
              '"ref.current.focus" in React.useEffect():',
              'https://reactjs.org/docs/refs-and-the-dom.html#adding-a-ref-to-a-dom-element',
            ].join(' '),
          );
        }
      }
      // We run this check once, no need to add deps here
      // TODO: Should be rework to handle options.enabled and contentRef updates
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  }

  return { targetRef, containerRef, arrowRef };
}
