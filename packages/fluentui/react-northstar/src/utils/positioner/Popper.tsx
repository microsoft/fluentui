import { useIsomorphicLayoutEffect } from '@fluentui/react-bindings';
import { Ref, isRefObject } from '@fluentui/react-component-ref';
import * as _ from 'lodash';
import PopperJS, * as _PopperJS from 'popper.js';
import * as React from 'react';

import isBrowser from '../isBrowser';
import getScrollParent from './getScrollParent';
import { getPlacement, applyRtlToOffset } from './positioningHelper';
import { PopperProps } from './types';

/**
 * Memoize a result using deep equality. This hook has two advantages over
 * React.useMemo: it uses deep equality to compare memo keys, and it guarantees
 * that the memo function will only be called if the keys are unequal.
 * React.useMemo cannot be relied on to do this, since it is only a performance
 * optimization (see https://reactjs.org/docs/hooks-reference.html#usememo).
 *
 * Copied from https://github.com/apollographql/react-apollo/blob/master/packages/hooks/src/utils/useDeepMemo.ts.
 */
function useDeepMemo<TKey, TValue>(memoFn: () => TValue, key: TKey): TValue {
  const ref = React.useRef<{ key: TKey; value: TValue }>();

  if (!ref.current || !_.isEqual(key, ref.current.key)) {
    ref.current = { key, value: memoFn() };
  }

  return ref.current.value;
}

// `popper.js` has a UMD build without `.default`, it breaks CJS builds:
// https://github.com/rollup/rollup/issues/1267#issuecomment-446681320
const createPopper = (
  reference: Element | _PopperJS.ReferenceObject,
  popper: HTMLElement,
  options?: PopperJS.PopperOptions,
): PopperJS => {
  const instance = new ((_PopperJS as any).default || _PopperJS)(reference, popper, {
    ...options,
    eventsEnabled: false,
  });

  const originalUpdate = instance.update;
  instance.update = () => {
    // Fix Popper.js initial positioning display issue
    // https://github.com/popperjs/popper.js/issues/457#issuecomment-367692177
    popper.style.left = '0';
    popper.style.top = '0';

    originalUpdate();
  };

  const actualWindow = popper.ownerDocument.defaultView;
  instance.scheduleUpdate = () => actualWindow.requestAnimationFrame(instance.update);
  instance.enableEventListeners();

  return instance;
};

/**
 * Popper relies on the 3rd party library [Popper.js](https://github.com/FezVrasta/popper.js) for positioning.
 */
const Popper: React.FunctionComponent<PopperProps> = props => {
  const {
    align,
    children,
    enabled,
    flipBoundary,
    modifiers: userModifiers,
    offset,
    overflowBoundary,
    pointerTargetRef,
    position,
    positionFixed,
    positioningDependencies = [],
    rtl,
    targetRef,
    unstable_pinned,
  } = props;

  const proposedPlacement = getPlacement({ align, position, rtl });

  const popperRef = React.useRef<PopperJS>();
  const contentRef = React.useRef<HTMLElement>(null);

  const latestPlacement = React.useRef<PopperJS.Placement>(proposedPlacement);
  const [computedPlacement, setComputedPlacement] = React.useState<PopperJS.Placement>(proposedPlacement);

  const hasDocument = isBrowser();
  const hasScrollableElement = React.useMemo(() => {
    if (hasDocument) {
      const scrollParentElement = getScrollParent(contentRef.current);

      return scrollParentElement !== scrollParentElement.ownerDocument.body;
    }

    return false;
  }, [contentRef, hasDocument]);
  // Is a broken dependency and can cause potential bugs, we should rethink this as all other refs
  // in this component.

  const computedModifiers: PopperJS.Modifiers = useDeepMemo(
    () =>
      _.merge(
        /**
         * This prevents blurrines in chrome, when the coordinates are odd numbers alternative
         * would be to use `fn` and manipulate the computed style or ask popper to fix it but
         * since there is presumably only handful of poppers displayed on the page, the
         * performance impact should be minimal.
         */
        { computeStyle: { gpuAcceleration: false } },

        { flip: { padding: 0, flipVariationsByContent: true } },
        { preventOverflow: { padding: 0 } },

        offset && {
          offset: { offset: rtl ? applyRtlToOffset(offset, position) : offset },
          keepTogether: { enabled: false },
        },

        /**
         * When the popper box is placed in the context of a scrollable element, we need to set
         * preventOverflow.escapeWithReference to true and flip.boundariesElement to 'scrollParent'
         * (default is 'viewport') so that the popper box will stick with the targetRef when we
         * scroll targetRef out of the viewport.
         */
        hasScrollableElement && {
          preventOverflow: { escapeWithReference: true },
          flip: { boundariesElement: 'scrollParent' },
        },

        flipBoundary && { flip: { boundariesElement: flipBoundary } },
        overflowBoundary && { preventOverflow: { boundariesElement: overflowBoundary } },

        userModifiers,

        /**
         * unstable_pinned disables the flip modifier by setting flip.enabled to false; this
         * disables automatic repositioning of the popper box; it will always be placed according to
         * the values of `align` and `position` props, regardless of the size of the component, the
         * reference element or the viewport.
         */
        unstable_pinned && { flip: { enabled: false } },
      ),
    [hasScrollableElement, position, offset, rtl, unstable_pinned, userModifiers],
  );

  const scheduleUpdate = React.useCallback(() => {
    if (popperRef.current) {
      popperRef.current.scheduleUpdate();
    }
  }, []);

  const destroyInstance = React.useCallback(() => {
    if (popperRef.current) {
      popperRef.current.destroy();
      if (popperRef.current.popper) {
        // Popper keeps a reference to the DOM node, which needs to be cleaned up
        // temporarily fix it here until fixed properly in popper
        popperRef.current.popper = null;
      }
      popperRef.current = null;
    }
  }, []);

  const createInstance = React.useCallback(() => {
    destroyInstance();

    const reference =
      targetRef && isRefObject(targetRef)
        ? (targetRef as React.RefObject<Element>).current
        : (targetRef as _PopperJS.ReferenceObject);

    if (!enabled || !reference || !contentRef.current) {
      return;
    }

    const hasPointer = !!(pointerTargetRef && pointerTargetRef.current);
    const handleUpdate = (data: PopperJS.Data) => {
      // PopperJS performs computations that might update the computed placement: auto positioning, flipping the
      // placement in case the popper box should be rendered at the edge of the viewport and does not fit
      if (data.placement !== latestPlacement.current) {
        latestPlacement.current = data.placement;
        setComputedPlacement(data.placement);
      }
    };

    const options: PopperJS.PopperOptions = {
      placement: proposedPlacement,
      positionFixed,
      modifiers: {
        ...computedModifiers,

        /**
         * This modifier is necessary in order to render the pointer. Refs are resolved in effects, so it can't be
         * placed under computed modifiers. Deep merge is not required as this modifier has only these properties.
         * `arrow` modifier also requires `keepTogether`.
         */
        keepTogether: { enabled: hasPointer },
        arrow: {
          enabled: hasPointer,
          element: pointerTargetRef && pointerTargetRef.current,
        },
      },
      onCreate: handleUpdate,
      onUpdate: handleUpdate,
    };

    popperRef.current = createPopper(reference, contentRef.current, options);
  }, [
    // TODO review dependencies for popperHasScrollableParent
    enabled,
    computedModifiers,
    pointerTargetRef,
    positionFixed,
    proposedPlacement,
    targetRef,
    unstable_pinned,
  ]);

  useIsomorphicLayoutEffect(() => {
    createInstance();
    return destroyInstance;
  }, [createInstance]);

  React.useEffect(scheduleUpdate, [...positioningDependencies, computedPlacement]);

  const child =
    typeof children === 'function'
      ? children({ placement: computedPlacement, scheduleUpdate })
      : (children as React.ReactElement);

  return child ? <Ref innerRef={contentRef}>{React.Children.only(child)}</Ref> : null;
};

Popper.defaultProps = {
  enabled: true,
  positionFixed: false,
  positioningDependencies: [],
};

export default Popper;
