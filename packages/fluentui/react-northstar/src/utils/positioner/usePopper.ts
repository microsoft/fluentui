import {
  useCallbackRef,
  useDeepMemo,
  useEventCallback,
  useFirstMount,
  useIsomorphicLayoutEffect,
} from '@fluentui/react-bindings';
import * as PopperJs from '@popperjs/core';
import * as React from 'react';

import { getReactFiberFromNode } from '../getReactFiberFromNode';
import { isBrowser } from '../isBrowser';
import { getBoundary } from './getBoundary';
import { getScrollParent } from './getScrollParent';
import { applyRtlToOffset, getPlacement } from './positioningHelper';
import { PopperInstance, PopperOptions } from './types';

//
// Dev utils to detect if nodes have "autoFocus" props.
//

/**
 * Detects if a passed HTML node has "autoFocus" prop on a React's fiber. Is needed as React handles autofocus behavior
 * in React DOM and will not pass "autoFocus" to an actual HTML.
 *
 * @param {Node} node
 * @returns {Boolean}
 */
function hasAutofocusProp(node: Node): boolean {
  // https://github.com/facebook/react/blob/848bb2426e44606e0a55dfe44c7b3ece33772485/packages/react-dom/src/client/ReactDOMHostConfig.js#L157-L166
  const isAutoFocusableElement =
    node.nodeName === 'BUTTON' ||
    node.nodeName === 'INPUT' ||
    node.nodeName === 'SELECT' ||
    node.nodeName === 'TEXTAREA';

  if (isAutoFocusableElement) {
    return !!getReactFiberFromNode(node).pendingProps.autoFocus;
  }

  return false;
}

function hasAutofocusFilter(node: Node) {
  return hasAutofocusProp(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
}

/**
 * Provides a callback to resolve Popper options, it's stable and should be used as a dependency to trigger updates
 * of Popper options.
 *
 * A callback is used there intentionally as some of Popper.js modifiers require DOM nodes (targer, container, arrow)
 * that can't be resolved properly during an initial rendering.
 *
 * @param {PopperOptions} options
 * @param {React.MutableRefObject} popperOriginalPositionRef
 *
 * @returns {Function}
 */
function usePopperOptions(options: PopperOptions, popperOriginalPositionRef: React.MutableRefObject<string>) {
  const {
    autoSize,
    flipBoundary,
    offset,
    onStateUpdate,
    overflowBoundary,
    rtl,
    unstable_disableTether,
    unstable_pinned,
  } = options;

  const placement = getPlacement(options.align, options.position, options.rtl);
  const strategy = options.positionFixed ? 'fixed' : 'absolute';

  const handleStateUpdate = useEventCallback(({ state }: { state: Partial<PopperJs.State> }) => {
    if (onStateUpdate) {
      onStateUpdate(state);
    }
  });

  const offsetModifier = React.useMemo(
    () =>
      offset
        ? {
            name: 'offset',
            options: { offset: rtl ? applyRtlToOffset(offset) : offset },
          }
        : null,
    [offset, rtl],
  );
  const userModifiers = useDeepMemo(() => options.modifiers, options.modifiers);

  return React.useCallback(
    (
      target: HTMLElement | PopperJs.VirtualElement,
      container: HTMLElement,
      arrow: HTMLElement | null,
    ): PopperJs.Options => {
      const scrollParentElement: HTMLElement = getScrollParent(container);
      const hasScrollableElement = scrollParentElement
        ? scrollParentElement !== scrollParentElement.ownerDocument.body
        : false;

      const modifiers: PopperJs.Options['modifiers'] = [
        /**
         * We are setting the position to `fixed` in the first effect to prevent scroll jumps in case of the content
         * with managed focus. Modifier sets the position to `fixed` before all other modifier effects. Another part of
         * a patch modifies ".forceUpdate()" directly after a Popper will be created.
         */
        {
          name: 'positionStyleFix',
          enabled: true,
          phase: 'afterWrite' as PopperJs.ModifierPhases,
          effect: ({ state, instance }: { state: Partial<PopperJs.State>; instance: PopperInstance }) => {
            // ".isFirstRun" is a part of our patch, on a first evaluation it will "undefined"
            // should be disabled for subsequent runs as it breaks positioning for them
            if (instance.isFirstRun !== false) {
              popperOriginalPositionRef.current = state.elements.popper.style['position'];
              state.elements.popper.style['position'] = 'fixed';
            }

            return () => {};
          },
          requires: [],
        },

        { name: 'flip', options: { flipVariations: true } },

        /**
         * unstable_pinned disables the flip modifier by setting flip.enabled to false; this
         * disables automatic repositioning of the popper box; it will always be placed according to
         * the values of `align` and `position` props, regardless of the size of the component, the
         * reference element or the viewport.
         */
        unstable_pinned && { name: 'flip', enabled: false },

        /**
         * When the popper box is placed in the context of a scrollable element, we need to set
         * preventOverflow.escapeWithReference to true and flip.boundariesElement to 'scrollParent'
         * (default is 'viewport') so that the popper box will stick with the targetRef when we
         * scroll targetRef out of the viewport.
         */
        hasScrollableElement && { name: 'flip', options: { boundary: 'clippingParents' } },
        hasScrollableElement && { name: 'preventOverflow', options: { boundary: 'clippingParents' } },

        offsetModifier,

        ...(typeof userModifiers === 'function' ? userModifiers(target, container, arrow) : userModifiers),

        /**
         * This modifier is necessary to retain behaviour from popper v1 where untethered poppers are allowed by
         * default. i.e. popper is still rendered fully in the viewport even if anchor element is no longer in the
         * viewport.
         */
        unstable_disableTether && {
          name: 'preventOverflow',
          options: { altAxis: unstable_disableTether === 'all', tether: false },
        },

        flipBoundary && {
          name: 'flip',
          options: {
            altBoundary: true,
            boundary: getBoundary(container, flipBoundary),
          },
        },
        overflowBoundary && {
          name: 'preventOverflow',
          options: {
            altBoundary: true,
            boundary: getBoundary(container, overflowBoundary),
          },
        },

        {
          name: 'onUpdate',
          enabled: true,
          phase: 'afterWrite' as PopperJs.ModifierPhases,
          fn: handleStateUpdate,
        },

        autoSize && {
          // Similar code as popper-maxsize-modifier: https://github.com/atomiks/popper.js/blob/master/src/modifiers/maxSize.js
          // popper-maxsize-modifier only calculates the max sizes.
          // This modifier can apply max sizes always, or apply the max sizes only when overflow is detected
          name: 'applyMaxSize',
          enabled: true,
          phase: 'beforeWrite' as PopperJs.ModifierPhases,
          requiresIfExists: ['offset', 'preventOverflow', 'flip'],
          options: {
            altBoundary: true,
            boundary: getBoundary(container, overflowBoundary),
          },
          fn({ state, options: modifierOptions }: PopperJs.ModifierArguments<{}>) {
            const overflow = PopperJs.detectOverflow(state, modifierOptions);
            const { x, y } = state.modifiersData.preventOverflow || { x: 0, y: 0 };
            const { width, height } = state.rects.popper;
            const [basePlacement] = state.placement.split('-');

            const widthProp: keyof PopperJs.SideObject = basePlacement === 'left' ? 'left' : 'right';
            const heightProp: keyof PopperJs.SideObject = basePlacement === 'top' ? 'top' : 'bottom';

            const applyMaxWidth =
              autoSize === 'always' ||
              autoSize === 'width-always' ||
              (overflow[widthProp] > 0 && (autoSize === true || autoSize === 'width'));
            const applyMaxHeight =
              autoSize === 'always' ||
              autoSize === 'height-always' ||
              (overflow[heightProp] > 0 && (autoSize === true || autoSize === 'height'));

            if (applyMaxWidth) {
              state.styles.popper.maxWidth = `${width - overflow[widthProp] - x}px`;
            }
            if (applyMaxHeight) {
              state.styles.popper.maxHeight = `${height - overflow[heightProp] - y}px`;
            }
          },
        },

        /**
         * This modifier is necessary in order to render the pointer. Refs are resolved in effects, so it can't be
         * placed under computed modifiers. Deep merge is not required as this modifier has only these properties.
         */
        {
          name: 'arrow',
          enabled: !!arrow,
          options: { element: arrow },
        },
      ].filter(Boolean);

      const popperOptions: PopperJs.Options = {
        modifiers,

        placement,
        strategy,
        onFirstUpdate: state => handleStateUpdate({ state }),
      };

      return popperOptions;
    },
    [
      autoSize,
      flipBoundary,
      offsetModifier,
      overflowBoundary,
      placement,
      strategy,
      unstable_disableTether,
      unstable_pinned,
      userModifiers,

      // These can be skipped from deps as they will not ever change
      handleStateUpdate,
      popperOriginalPositionRef,
    ],
  );
}

/**
 * Exposes Popper positioning API via React hook. Contains few important differences between an official "react-popper"
 * package:
 * - style attributes are applied directly on DOM to avoid re-renders
 * - refs changes and resolution is handled properly without re-renders
 * - contains a specific to React fix related to initial positioning when containers have components with managed focus
 *   to avoid focus jumps
 *
 * @param {PopperOptions} options
 */
export function usePopper(
  options: PopperOptions = {},
): {
  // React refs are supposed to be contravariant (allows a more general type to be passed rather than a more specific one)
  // However, Typescript currently can't infer that fact for refs
  // See https://github.com/microsoft/TypeScript/issues/30748 for more information
  targetRef: React.MutableRefObject<any>;
  containerRef: React.MutableRefObject<any>;
  arrowRef: React.MutableRefObject<any>;
} {
  const { enabled = true } = options;
  const isFirstMount = useFirstMount();

  const popperOriginalPositionRef = React.useRef<string>('absolute');
  const resolvePopperOptions = usePopperOptions(options, popperOriginalPositionRef);

  const popperInstanceRef = React.useRef<PopperInstance | null>(null);

  const handlePopperUpdate = useEventCallback(() => {
    popperInstanceRef.current?.destroy();
    popperInstanceRef.current = null;

    let popperInstance: PopperInstance | null = null;

    if (isBrowser() && enabled) {
      if (targetRef.current && containerRef.current) {
        popperInstance = PopperJs.createPopper(
          targetRef.current,
          containerRef.current,
          resolvePopperOptions(targetRef.current, containerRef.current, arrowRef.current),
        );
      }
    }

    if (popperInstance) {
      /**
       * The patch updates `.forceUpdate()` Popper function which restores the original position before the first
       * forceUpdate() call. See also "positionStyleFix" modifier in usePopperOptions().
       */
      const originalForceUpdate = popperInstance.forceUpdate;

      popperInstance.isFirstRun = true;
      popperInstance.forceUpdate = () => {
        if (popperInstance.isFirstRun) {
          popperInstance.state.elements.popper.style['position'] = popperOriginalPositionRef.current;
          popperInstance.isFirstRun = false;
        }

        originalForceUpdate();
      };
    }

    popperInstanceRef.current = popperInstance;
  });

  // Refs are managed by useCallbackRef() to handle ref updates scenarios.
  //
  // The first scenario are updates for a targetRef, we can handle it properly only via callback refs, but it causes
  // re-renders (we would like to avoid them).
  //
  // The second problem is related to refs resolution on React's layer: refs are resolved in the same order as effects
  // that causes an issue when you have a container inside a target, for example: a menu in ChatMessage.
  //
  // function ChatMessage(props) {
  //   <div className="message" ref={targetRef}> // 3) ref will be resolved only now, but it's too late already
  //     <Popper target={targetRef}> // 2) create a popper instance
  //       <div className="menu" /> // 1) capture ref from this element
  //     </Popper>
  //   </div>
  // }
  //
  // Check a demo on CodeSandbox: https://codesandbox.io/s/popper-refs-emy60.
  //
  // This again can be solved with callback refs. It's not a huge issue as with hooks we are moving popper's creation
  // to ChatMessage itself, however, without `useCallback()` refs it's still a Pandora box.
  const targetRef = useCallbackRef<HTMLElement | PopperJs.VirtualElement | null>(null, handlePopperUpdate, true);
  const containerRef = useCallbackRef<HTMLElement | null>(null, handlePopperUpdate, true);
  const arrowRef = useCallbackRef<HTMLElement | null>(null, handlePopperUpdate, true);

  React.useImperativeHandle(
    options.popperRef,
    () => ({
      updatePosition: () => {
        popperInstanceRef.current?.update();
      },
    }),
    [],
  );

  useIsomorphicLayoutEffect(() => {
    handlePopperUpdate();

    return () => {
      popperInstanceRef.current?.destroy();
      popperInstanceRef.current = null;
    };
  }, [options.enabled]);
  useIsomorphicLayoutEffect(() => {
    if (!isFirstMount) {
      popperInstanceRef.current?.setOptions(
        resolvePopperOptions(targetRef.current, containerRef.current, arrowRef.current),
      );
    }
  }, [resolvePopperOptions]);

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
