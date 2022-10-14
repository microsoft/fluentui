import { computePosition, hide as hideMiddleware, arrow as arrowMiddleware } from '@floating-ui/dom';
import type { Middleware, Strategy, Placement, Coords, MiddlewareData } from '@floating-ui/dom';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { canUseDOM, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import type { PositioningOptions, PositioningProps, PositioningVirtualElement } from './types';
import {
  useCallbackRef,
  toFloatingUIPlacement,
  toggleScrollListener,
  hasAutofocusFilter,
  debounce,
  hasScrollParent,
} from './utils';
import {
  shift as shiftMiddleware,
  flip as flipMiddleware,
  coverTarget as coverTargetMiddleware,
  maxSize as maxSizeMiddleware,
  offset as offsetMiddleware,
  intersecting as intersectingMiddleware,
} from './middleware';
import {
  DATA_POSITIONING_ESCAPED,
  DATA_POSITIONING_INTERSECTING,
  DATA_POSITIONING_HIDDEN,
  DATA_POSITIONING_PLACEMENT,
} from './constants';

/**
 * @internal
 */
export function usePositioning(
  options: UsePositioningOptions,
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
  const { enabled = true } = options;
  const resolvePositioningOptions = usePositioningOptions(options);

  const forceUpdate = useEventCallback(() => {
    const target = overrideTargetRef.current ?? targetRef.current;
    if (!canUseDOM || !enabled || !target || !containerRef.current) {
      return;
    }

    const { placement, middleware, strategy } = resolvePositioningOptions(
      target,
      containerRef.current,
      arrowRef.current,
    );

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

  const targetRef = useTargetRef(updatePosition);
  const overrideTargetRef = useTargetRef(updatePosition);
  const containerRef = useContainerRef(updatePosition, enabled);
  const arrowRef = useArrowRef(updatePosition);

  React.useImperativeHandle(
    options.positioningRef,
    () => ({
      updatePosition,
      setTarget: (target: HTMLElement | PositioningVirtualElement) => {
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
    overrideTargetRef.current = options.target ?? null;
  }, [options.target, overrideTargetRef, containerRef]);

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

  return { targetRef, containerRef, arrowRef };
}

interface UsePositioningOptions extends PositioningProps {
  /**
   * If false, does not position anything
   */
  enabled?: boolean;
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
    (
      target: HTMLElement | PositioningVirtualElement | null,
      container: HTMLElement | null,
      arrow: HTMLElement | null,
    ) => {
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

function useContainerRef(updatePosition: () => void, enabled: boolean) {
  return useCallbackRef<HTMLElement | null>(null, (container, prevContainer) => {
    if (container && enabled) {
      // When the container is first resolved, set position `fixed` to avoid scroll jumps.
      // Without this scroll jumps can occur when the element is rendered initially and receives focus
      Object.assign(container.style, { position: 'fixed', left: 0, top: 0, margin: 0 });
    }

    toggleScrollListener(container, prevContainer, updatePosition);

    updatePosition();
  });
}

function useTargetRef(updatePosition: () => void) {
  return useCallbackRef<HTMLElement | PositioningVirtualElement | null>(null, (target, prevTarget) => {
    toggleScrollListener(target, prevTarget, updatePosition);

    updatePosition();
  });
}

function useArrowRef(updatePosition: () => void) {
  return useCallbackRef<HTMLElement | null>(null, updatePosition);
}

/**
 * Writes all DOM element updates after position is computed
 */
function writeContainerUpdates(options: {
  container: HTMLElement | null;
  placement: Placement;
  middlewareData: MiddlewareData;
  /**
   * Layer acceleration can disable subpixel rendering which causes slightly
   * blurry text on low PPI displays, so we want to use 2D transforms
   * instead
   */
  lowPPI: boolean;
  strategy: Strategy;
  coordinates: Coords;
}) {
  const {
    container,
    placement,
    middlewareData,
    strategy,
    lowPPI,
    coordinates: { x, y },
  } = options;
  if (!container) {
    return;
  }
  container.setAttribute(DATA_POSITIONING_PLACEMENT, placement);
  container.removeAttribute(DATA_POSITIONING_INTERSECTING);
  if (middlewareData.intersectionObserver.intersecting) {
    container.setAttribute(DATA_POSITIONING_INTERSECTING, '');
  }

  container.removeAttribute(DATA_POSITIONING_ESCAPED);
  if (middlewareData.hide?.escaped) {
    container.setAttribute(DATA_POSITIONING_ESCAPED, '');
  }

  container.removeAttribute(DATA_POSITIONING_HIDDEN);
  if (middlewareData.hide?.referenceHidden) {
    container.setAttribute(DATA_POSITIONING_HIDDEN, '');
  }

  Object.assign(container.style, {
    transform: lowPPI ? `translate(${x}px, ${y}px)` : `translate3d(${x}px, ${y}px, 0)`,
    position: strategy,
  });
}

/**
 * Writes all DOM element updates after position is computed
 */
function writeArrowUpdates(options: { arrow: HTMLElement | null; middlewareData: MiddlewareData }) {
  const { arrow, middlewareData } = options;
  if (!middlewareData.arrow || !arrow) {
    return;
  }

  const { x: arrowX, y: arrowY } = middlewareData.arrow;

  Object.assign(arrow.style, {
    left: `${arrowX}px`,
    top: `${arrowY}px`,
  });
}
