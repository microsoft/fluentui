import { useEventCallback, useIsomorphicLayoutEffect, useFirstMount, canUseDOM } from '@fluentui/react-utilities';
import { useFluent } from '@fluentui/react-shared-contexts';
import * as PopperJs from '@popperjs/core';
import * as React from 'react';

import { isIntersectingModifier } from './isIntersectingModifier';
import {
  getScrollParent,
  applyRtlToOffset,
  getPlacement,
  getReactFiberFromNode,
  getBoundary,
  useCallbackRef,
  getBasePlacement,
} from './utils/index';
import type { PopperVirtualElement, PopperOptions, PositioningProps } from './types';

type PopperInstance = PopperJs.Instance & { isFirstRun?: boolean };

interface UsePopperOptions extends PositioningProps {
  /**
   * If false, delays Popper's creation.
   * @default true
   */
  enabled?: boolean;
}

//
// Dev utils to detect if nodes have "autoFocus" props.
//

/**
 * Detects if a passed HTML node has "autoFocus" prop on a React's fiber. Is needed as React handles autofocus behavior
 * in React DOM and will not pass "autoFocus" to an actual HTML.
 */
function hasAutofocusProp(node: Node): boolean {
  // https://github.com/facebook/react/blob/848bb2426e44606e0a55dfe44c7b3ece33772485/packages/react-dom/src/client/ReactDOMHostConfig.js#L157-L166
  const isAutoFocusableElement =
    node.nodeName === 'BUTTON' ||
    node.nodeName === 'INPUT' ||
    node.nodeName === 'SELECT' ||
    node.nodeName === 'TEXTAREA';

  if (isAutoFocusableElement) {
    return !!getReactFiberFromNode(node)?.pendingProps.autoFocus;
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
 */
function usePopperOptions(options: PopperOptions, popperOriginalPositionRef: React.MutableRefObject<string>) {
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
    positionFixed,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_disableTether,
  } = options;

  const isRtl = useFluent().dir === 'rtl';
  const placement = getPlacement(align, position, isRtl);
  const strategy = positionFixed ? 'fixed' : 'absolute';

  const offsetModifier = React.useMemo(
    () =>
      offset
        ? {
            name: 'offset',
            options: { offset: isRtl ? applyRtlToOffset(offset) : offset },
          }
        : null,
    [offset, isRtl],
  );

  return React.useCallback(
    (
      target: HTMLElement | PopperJs.VirtualElement | null,
      container: HTMLElement | null,
      arrow: HTMLElement | null,
    ): PopperJs.Options => {
      const scrollParentElement: HTMLElement = getScrollParent(container);
      const hasScrollableElement = scrollParentElement
        ? scrollParentElement !== scrollParentElement.ownerDocument?.body
        : false;

      const modifiers: PopperJs.Options['modifiers'] = [
        isIntersectingModifier,

        /**
         * We are setting the position to `fixed` in the first effect to prevent scroll jumps in case of the content
         * with managed focus. Modifier sets the position to `fixed` before all other modifier effects. Another part of
         * a patch modifies ".forceUpdate()" directly after a Popper will be created.
         */
        {
          name: 'positionStyleFix',
          enabled: true,
          phase: 'afterWrite' as PopperJs.ModifierPhases,
          effect: ({ state, instance }: { state: PopperJs.State; instance: PopperInstance }) => {
            // ".isFirstRun" is a part of our patch, on a first evaluation it will "undefined"
            // should be disabled for subsequent runs as it breaks positioning for them
            if (instance.isFirstRun !== false) {
              popperOriginalPositionRef.current = state.elements.popper.style.position;
              state.elements.popper.style.position = 'fixed';
            }

            return () => undefined;
          },
          requires: [],
        },

        { name: 'flip', options: { flipVariations: true } },

        /**
         * pinned disables the flip modifier by setting flip.enabled to false; this
         * disables automatic repositioning of the popper box; it will always be placed according to
         * the values of `align` and `position` props, regardless of the size of the component, the
         * reference element or the viewport.
         */
        pinned && { name: 'flip', enabled: false },

        /**
         * When the popper box is placed in the context of a scrollable element, we need to set
         * preventOverflow.escapeWithReference to true and flip.boundariesElement to 'scrollParent'
         * (default is 'viewport') so that the popper box will stick with the targetRef when we
         * scroll targetRef out of the viewport.
         */
        hasScrollableElement && { name: 'flip', options: { boundary: 'clippingParents' } },
        hasScrollableElement && { name: 'preventOverflow', options: { boundary: 'clippingParents' } },

        offsetModifier,

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
          // Similar code as popper-maxsize-modifier: https://github.com/atomiks/popper.js/blob/master/src/modifiers/maxSize.js
          // popper-maxsize-modifier only calculates the max sizes.
          // This modifier can apply max sizes always, or apply the max sizes only when overflow is detected
          name: 'applyMaxSize',
          enabled: !!autoSize,
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
            const basePlacement = getBasePlacement(state.placement);

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
          options: { element: arrow, padding: arrowPadding },
        },

        /**
         * Modifies popper offsets to cover the reference rect, but still keep edge alignment
         */
        {
          name: 'coverTarget',
          enabled: !!coverTarget,
          phase: 'main',
          requiresIfExists: ['offset', 'preventOverflow', 'flip'],
          fn({ state }: PopperJs.ModifierArguments<{}>) {
            const basePlacement = getBasePlacement(state.placement);
            switch (basePlacement) {
              case 'bottom':
                state.modifiersData.popperOffsets!.y -= state.rects.reference.height;
                break;
              case 'top':
                state.modifiersData.popperOffsets!.y += state.rects.reference.height;
                break;
              case 'left':
                state.modifiersData.popperOffsets!.x += state.rects.reference.width;
                break;
              case 'right':
                state.modifiersData.popperOffsets!.x -= state.rects.reference.width;
                break;
            }
          },
        },
      ].filter(Boolean) as PopperJs.Options['modifiers']; // filter boolean conditional spreading values

      const popperOptions: PopperJs.Options = {
        modifiers,

        placement,
        strategy,
      };

      return popperOptions;
    },
    [
      arrowPadding,
      autoSize,
      coverTarget,
      flipBoundary,
      offsetModifier,
      overflowBoundary,
      placement,
      strategy,
      unstable_disableTether,
      pinned,

      // These can be skipped from deps as they will not ever change
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
 */
export function usePopper(
  options: UsePopperOptions = {},
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
  const { enabled = true } = options;
  const isFirstMount = useFirstMount();

  const popperOriginalPositionRef = React.useRef<string>('absolute');
  const resolvePopperOptions = usePopperOptions(options, popperOriginalPositionRef);

  const popperInstanceRef = React.useRef<PopperInstance | null>(null);

  const handlePopperUpdate = useEventCallback(() => {
    popperInstanceRef.current?.destroy();
    popperInstanceRef.current = null;

    const target = overrideTargetRef.current ?? targetRef.current;

    let popperInstance: PopperInstance | null = null;

    if (canUseDOM() && enabled) {
      if (target && containerRef.current) {
        popperInstance = PopperJs.createPopper(
          target,
          containerRef.current,
          resolvePopperOptions(target, containerRef.current, arrowRef.current),
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
        if (popperInstance?.isFirstRun) {
          popperInstance.state.elements.popper.style.position = popperOriginalPositionRef.current;
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

  // Stores external target from options.target or setTarget
  const overrideTargetRef = useCallbackRef<HTMLElement | PopperVirtualElement | null>(null, handlePopperUpdate, true);

  React.useImperativeHandle(
    options.popperRef,
    () => ({
      updatePosition: () => {
        popperInstanceRef.current?.update();
      },
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
    // targetRef - Stable between renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useIsomorphicLayoutEffect(() => {
    if (options.target) {
      overrideTargetRef.current = options.target;
    }
  }, [options.target, overrideTargetRef]);
  useIsomorphicLayoutEffect(() => {
    handlePopperUpdate();

    return () => {
      popperInstanceRef.current?.destroy();
      popperInstanceRef.current = null;
    };
  }, [handlePopperUpdate, options.enabled]);
  useIsomorphicLayoutEffect(
    () => {
      if (!isFirstMount) {
        popperInstanceRef.current?.setOptions(
          resolvePopperOptions(overrideTargetRef.current ?? targetRef.current, containerRef.current, arrowRef.current),
        );
      }
    },
    // Missing deps:
    // isFirstMount - Should never change after mount
    // arrowRef, containerRef, targetRef - Stable between renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [resolvePopperOptions],
  );

  if (process.env.NODE_ENV !== 'production') {
    // This checked should run only in development mode
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (containerRef.current) {
        const contentNode = containerRef.current;
        const treeWalker = contentNode.ownerDocument?.createTreeWalker(contentNode, NodeFilter.SHOW_ELEMENT, {
          acceptNode: hasAutofocusFilter,
        });

        while (treeWalker?.nextNode()) {
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
