import { canUseDOM, useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import * as React from 'react';

import { POSITIONING_END_EVENT } from './constants';
import { createPositionManager } from './createPositionManager';
import type {
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
  'use no memo';

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
      setTarget: (target: TargetElement | null) => {
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

  const setTarget = useCallbackRef<TargetElement>(null, target => {
    if (targetRef.current !== target) {
      targetRef.current = target;
      updatePositionManager();
    }
  });

  const onPositioningEnd = useEventCallback(() => options.onPositioningEnd?.());
  const setContainer = useCallbackRef<HTMLElement | null>(null, container => {
    if (containerRef.current !== container) {
      containerRef.current?.removeEventListener(POSITIONING_END_EVENT, onPositioningEnd);
      container?.addEventListener(POSITIONING_END_EVENT, onPositioningEnd);
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
