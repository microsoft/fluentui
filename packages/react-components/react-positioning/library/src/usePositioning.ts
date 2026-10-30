'use client';

import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import * as React from 'react';

import { POSITIONING_END_EVENT } from './constants';
import { createPositionManager } from './createPositionManager';
import type {
  OnPositioningEndEvent,
  PositioningOptions,
  PositioningProps,
  PositionManager,
  TargetElement,
  UsePositioningReturn,
} from './types';
import { usePositioningOptions } from './usePositioningOptions';
import { useCallbackRef, hasAutofocusFilter } from './utils';

/**
 * @internal
 */
export function usePositioning(options: PositioningProps & PositioningOptions): UsePositioningReturn {
  const managerRef = React.useRef<PositionManager | null>(null);
  // The latest elements, an imperatively set target overrides the target ref
  const elementsRef = React.useRef<
    Partial<Record<'target' | 'override', TargetElement | null>> & {
      container?: HTMLElement | null;
      arrow?: HTMLElement | null;
    }
  >({});

  const { enabled = true } = options;
  const resolvePositioningOptions = usePositioningOptions(options);
  const updatePositionManager = React.useCallback(() => {
    if (managerRef.current) {
      managerRef.current.dispose();
    }
    managerRef.current = null;

    const { override, target, container, arrow = null } = elementsRef.current;
    const positioningTarget = override || target;

    // Elements only exist in the DOM, so this also guards server rendering
    if (enabled && positioningTarget && container) {
      managerRef.current = createPositionManager({
        container,
        target: positioningTarget,
        arrow,
        ...resolvePositioningOptions(container, arrow),
      });
    }
  }, [enabled, resolvePositioningOptions]);

  const setOverrideTarget = useEventCallback((target: TargetElement | null) => {
    elementsRef.current.override = target;
    updatePositionManager();
  });

  React.useImperativeHandle(
    options.positioningRef,
    () => ({
      updatePosition: () => managerRef.current && managerRef.current.updatePosition(),
      setTarget:
        process.env.NODE_ENV === 'production'
          ? setOverrideTarget
          : (target: TargetElement | null) => {
              if (options.target) {
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
    setOverrideTarget(options.target || null);
  }, [options.target, setOverrideTarget]);

  useIsomorphicLayoutEffect(() => {
    updatePositionManager();
  }, [updatePositionManager]);

  if (process.env.NODE_ENV !== 'production') {
    // This checked should run only in development mode
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (elementsRef.current.container) {
        const contentNode = elementsRef.current.container;
        const treeWalker = contentNode.ownerDocument?.createTreeWalker(contentNode, NodeFilter.SHOW_ELEMENT, {
          acceptNode: hasAutofocusFilter,
        });

        while (treeWalker.nextNode()) {
          const node = treeWalker.currentNode;
          // eslint-disable-next-line no-console
          console.warn('usePositioning():', node);
          // eslint-disable-next-line no-console
          console.warn(
            [
              'usePositioning(): ^ this node contains "autoFocus" prop on a React element. This can break the initial',
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
    }, []);
  }

  // Callback refs only fire when their value changes
  const targetRef = useCallbackRef<TargetElement>(null, target => {
    elementsRef.current.target = target;
    updatePositionManager();
  });

  const onPositioningEnd = useEventCallback(
    (e: OnPositioningEndEvent) => options.onPositioningEnd && options.onPositioningEnd(e),
  );
  const containerRef = useCallbackRef<HTMLElement>(null, (container, previousContainer) => {
    // Cast because CustomEvent<OnPositioningEndEventDetail> is not assignable to EventListener
    previousContainer?.removeEventListener(POSITIONING_END_EVENT, onPositioningEnd as EventListener);
    container?.addEventListener(POSITIONING_END_EVENT, onPositioningEnd as EventListener);
    elementsRef.current.container = container;
    updatePositionManager();
  });

  const arrowRef = useCallbackRef<HTMLElement>(null, arrow => {
    elementsRef.current.arrow = arrow;
    updatePositionManager();
  });

  // Let users use callback refs so they feel like 'normal' DOM refs
  return { targetRef, containerRef, arrowRef };
}
