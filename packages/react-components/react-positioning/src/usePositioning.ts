import { computePosition, hide as hideMiddleware, arrow as arrowMiddleware } from '@floating-ui/dom';
import type { Middleware, Strategy } from '@floating-ui/dom';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { canUseDOM, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import type {
  PositioningOptions,
  PositioningVirtualElement,
  TargetType,
  UsePositioningOptions,
  UsePositioningReturn,
} from './types';
import {
  useCallbackRef,
  toFloatingUIPlacement,
  hasAutofocusFilter,
  debounce,
  hasScrollParent,
  getScrollParent,
  writeArrowUpdates,
  writeContainerUpdates,
} from './utils';
import {
  shift as shiftMiddleware,
  flip as flipMiddleware,
  coverTarget as coverTargetMiddleware,
  maxSize as maxSizeMiddleware,
  offset as offsetMiddleware,
  intersecting as intersectingMiddleware,
} from './middleware';

/**
 * @internal
 */
export function usePositioning(options: UsePositioningOptions): UsePositioningReturn {
  const containerRef = React.useRef<HTMLElement | null>(null);
  const targetRef = React.useRef<HTMLElement | PositioningVirtualElement | null>(null);
  const arrowRef = React.useRef<HTMLElement | null>(null);

  const { targetDocument } = useFluent();

  const { enabled = true } = options;
  const resolvePositioningOptions = usePositioningOptions(options);

  const forceUpdate = useEventCallback(() => {
    const target = targetRef.current;
    if (!canUseDOM || !enabled || !target || !containerRef.current) {
      return;
    }

    const { placement, middleware, strategy } = resolvePositioningOptions(containerRef.current, arrowRef.current);

    // Container is always initialized with `position: fixed` to avoid scroll jumps
    // Before computing the positioned coordinates, revert the container to the deisred positioning strategy
    Object.assign(containerRef.current.style, { position: strategy });
    computePosition(target, containerRef.current, { placement, middleware, strategy })
      .then(({ x, y, middlewareData, placement: computedPlacement }) => {
        writeArrowUpdates({ arrow: arrowRef.current, middlewareData });
        writeContainerUpdates({
          container: containerRef.current,
          middlewareData,
          placement: computedPlacement,
          coordinates: { x, y },
          lowPPI: (targetDocument?.defaultView?.devicePixelRatio || 1) <= 1,
          strategy,
        });
      })
      .catch(err => {
        // https://github.com/floating-ui/floating-ui/issues/1845
        // FIXME for node > 14
        // node 15 introduces promise rejection which means that any components
        // tests need to be `it('', async () => {})` otherwise there can be race conditions with
        // JSDOM being torn down before this promise is resolved so globals like `window` and `document` don't exist
        // Unless all tests that ever use `usePositioning` are turned into async tests, any logging during testing
        // will actually be counter productive
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('[usePositioning]: Failed to calculate position', err);
        }
      });
  });

  const updatePosition = React.useState(() => debounce(forceUpdate))[0];

  const cleanupScrollListenersRef = React.useRef<() => void>(() => null);
  const handleRefUpdate = React.useCallback(() => {
    if (containerRef.current) {
      // When the container is first resolved, set position `fixed` to avoid scroll jumps.
      // Without this scroll jumps can occur when the element is rendered initially and receives focus
      Object.assign(containerRef.current.style, { position: 'fixed', left: 0, top: 0, margin: 0 });
    }

    cleanupScrollListenersRef.current();
    const scrollParents: Set<HTMLElement> = new Set<HTMLElement>();
    if (enabled && containerRef.current && targetRef.current) {
      // `getScrollParent` will cause reflow, running it when when enabled, container and target
      // are all correctly set will make sure that it is run as little as possible
      scrollParents.add(getScrollParent(containerRef.current));
      if (targetRef.current instanceof HTMLElement) {
        scrollParents.add(getScrollParent(targetRef.current));
      }

      scrollParents.forEach(scrollParent => {
        scrollParent.addEventListener('scroll', updatePosition);
      });

      cleanupScrollListenersRef.current = () => {
        scrollParents.forEach(scrollParent => {
          scrollParent.removeEventListener('scroll', updatePosition);
        });
      };
    }

    updatePosition();
  }, [enabled, updatePosition]);

  const overrideTarget = React.useCallback(
    (target: TargetType) => {
      targetRef.current = target;
      handleRefUpdate();
    },
    [handleRefUpdate],
  );

  React.useImperativeHandle(
    options.positioningRef,
    () => ({
      updatePosition,
      setTarget: (target: TargetType) => {
        if (options.target && process.env.NODE_ENV !== 'production') {
          const err = new Error();
          // eslint-disable-next-line no-console
          console.warn('Imperative setTarget should not be used at the same time as target option');
          // eslint-disable-next-line no-console
          console.warn(err.stack);
        }

        overrideTarget(target);
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
      overrideTarget(options.target);
    }
  }, [options.target, overrideTarget]);

  useIsomorphicLayoutEffect(() => {
    updatePosition();
  }, [enabled, resolvePositioningOptions, updatePosition]);

  // Add window resize and scroll listeners to update position
  useIsomorphicLayoutEffect(() => {
    const win = targetDocument?.defaultView;
    if (win) {
      win.addEventListener('resize', updatePosition);
      win.addEventListener('scroll', updatePosition);

      return () => {
        win.removeEventListener('resize', updatePosition);
        win.removeEventListener('scroll', updatePosition);
      };
    }
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

  const setTargetElement = useCallbackRef<TargetType>(null, target => {
    targetRef.current = target;
    handleRefUpdate();
  });
  const setContainerElement = useCallbackRef<HTMLElement | null>(null, container => {
    containerRef.current = container;
    handleRefUpdate();
  });
  const setArrowElement = useCallbackRef<HTMLElement | null>(null, arrow => {
    containerRef.current = arrow;
    handleRefUpdate();
  });

  // Users should consume callback refs so they can set them like 'standard' HTML refs
  return { targetRef: setTargetElement, containerRef: setContainerElement, arrowRef: setArrowElement };
}

function usePositioningOptions(options: PositioningOptions) {
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
    (container: HTMLElement | null, arrow: HTMLElement | null) => {
      const hasScrollableElement = hasScrollParent(container);

      const placement = toFloatingUIPlacement(align, position, isRtl);
      const middleware = [
        offset && offsetMiddleware(offset),
        coverTarget && coverTargetMiddleware(),
        !pinned && flipMiddleware({ container, flipBoundary, hasScrollableElement }),
        shiftMiddleware({ container, hasScrollableElement, overflowBoundary, disableTether }),
        autoSize && maxSizeMiddleware(autoSize),
        intersectingMiddleware(),
        arrow && arrowMiddleware({ element: arrow, padding: arrowPadding }),
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
