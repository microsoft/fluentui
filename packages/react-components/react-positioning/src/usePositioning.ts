import { hide as hideMiddleware, arrow as arrowMiddleware } from '@floating-ui/dom';
import type { Middleware, Strategy } from '@floating-ui/dom';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { canUseDOM, useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import * as React from 'react';
import type {
  PositioningOptions,
  PositioningProps,
  PositionManager,
  TargetElement,
  UsePositioningReturn,
} from './types';
import { useCallbackRef, toFloatingUIPlacement, hasAutofocusFilter, hasScrollParent } from './utils';
import {
  shift as shiftMiddleware,
  flip as flipMiddleware,
  coverTarget as coverTargetMiddleware,
  maxSize as maxSizeMiddleware,
  offset as offsetMiddleware,
  intersecting as intersectingMiddleware,
} from './middleware';
import { createPositionManager } from './createPositionManager';

/**
 * @internal
 */
export function usePositioning(options: UsePositioningOptions): UsePositioningReturn {
  const managerRef = React.useRef<PositionManager | null>(null);
  const targetRef = React.useRef<TargetElement | null>(null);
  const overrideTargetRef = React.useRef<TargetElement | null>(null);
  const containerRef = React.useRef<HTMLElement | null>(null);
  const arrowRef = React.useRef<HTMLElement | null>(null);

  const { enabled = true } = options;
  const resolvePositioningOptions = usePositioningOptions(options);
  const updatePositionManager = React.useCallback(() => {
    if (managerRef.current) {
      managerRef.current.dispose();
    }
    managerRef.current = null;

    const target = overrideTargetRef.current ?? targetRef.current;

    if (enabled && canUseDOM() && target && containerRef.current) {
      managerRef.current = createPositionManager({
        container: containerRef.current,
        target,
        arrow: arrowRef.current,
        ...resolvePositioningOptions(containerRef.current, arrowRef.current),
      });
    }
  }, [enabled, resolvePositioningOptions]);

  const setOverrideTarget = useEventCallback((target: TargetElement | null) => {
    overrideTargetRef.current = target;
    updatePositionManager();
  });

  React.useImperativeHandle(
    options.positioningRef,
    () => ({
      updatePosition: () => managerRef.current?.updatePosition(),
      setTarget: (target: TargetElement) => {
        if (options.target && process.env.NODE_ENV !== 'production') {
          const err = new Error();
          // eslint-disable-next-line no-console
          console.warn('Imperative setTarget should not be used at the same time as target option');
          // eslint-disable-next-line no-console
          console.warn(err.stack);
        }

        setOverrideTarget(target);
      },
    }),
    [options.target, setOverrideTarget],
  );

  useIsomorphicLayoutEffect(() => {
    setOverrideTarget(options.target ?? null);
  }, [options.target, setOverrideTarget]);

  useIsomorphicLayoutEffect(() => {
    updatePositionManager();
  }, [updatePositionManager]);

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

  const setTarget = useCallbackRef<TargetElement>(null, target => {
    if (targetRef.current !== target) {
      targetRef.current = target;
      updatePositionManager();
    }
  });

  const setContainer = useCallbackRef<HTMLElement | null>(null, container => {
    if (containerRef.current !== container) {
      containerRef.current = container;
      updatePositionManager();
    }
  });

  const setArrow = useCallbackRef<HTMLElement | null>(null, arrow => {
    if (arrowRef.current !== arrow) {
      arrowRef.current = arrow;
      updatePositionManager();
    }
  });

  // Let users use callback refs so they feel like 'normal' DOM refs
  return { targetRef: setTarget, containerRef: setContainer, arrowRef: setArrow };
}

interface UsePositioningOptions extends PositioningProps, Pick<PositioningOptions, 'fallbackPositions' | 'pinned'> {
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
    overflowBoundaryPadding,
    fallbackPositions,
  } = options;

  const { dir } = useFluent();
  const isRtl = dir === 'rtl';
  const strategy: Strategy = positionFixed ? 'fixed' : 'absolute';

  return React.useCallback(
    (container: HTMLElement | null, arrow: HTMLElement | null) => {
      const hasScrollableElement = hasScrollParent(container);

      const middleware = [
        offset && offsetMiddleware(offset),
        coverTarget && coverTargetMiddleware(),
        !pinned && flipMiddleware({ container, flipBoundary, hasScrollableElement, isRtl, fallbackPositions }),
        shiftMiddleware({
          container,
          hasScrollableElement,
          overflowBoundary,
          disableTether,
          overflowBoundaryPadding,
          isRtl,
        }),
        autoSize && maxSizeMiddleware(autoSize, { container, overflowBoundary }),
        intersectingMiddleware(),
        arrow && arrowMiddleware({ element: arrow, padding: arrowPadding }),
        hideMiddleware({ strategy: 'referenceHidden' }),
        hideMiddleware({ strategy: 'escaped' }),
      ].filter(Boolean) as Middleware[];

      const placement = toFloatingUIPlacement(align, position, isRtl);

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
      overflowBoundaryPadding,
      fallbackPositions,
    ],
  );
}
