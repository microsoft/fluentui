import { useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-bindings';
import { Ref, isRefObject } from '@fluentui/react-component-ref';
import type { Placement as PopperJsPlacement, VirtualElement as PopperJsVirtualElement } from '@popperjs/core';
import * as React from 'react';

import { getPlacement } from './positioningHelper';
import { PopperChildrenFn, PopperProps, PopperRefHandle } from './types';
import { usePopper } from './usePopper';

/**
 * Popper relies on the 3rd party library [Popper.js](https://github.com/FezVrasta/popper.js) for positioning.
 *
 * @deprecated Please use "usePopper()" hook instead.
 */
export const Popper: React.FunctionComponent<PopperProps> = props => {
  const usesRenderProps: boolean = typeof props.children === 'function';

  const proposedPlacement = getPlacement(props.align, props.position, props.rtl);
  const latestPlacement = React.useRef<PopperJsPlacement>(proposedPlacement);
  const [computedPlacement, setComputedPlacement] = React.useState<PopperJsPlacement>(proposedPlacement);

  const popperRef = React.useRef<PopperRefHandle | null>(null);
  const { targetRef, containerRef, arrowRef } = usePopper({
    ...props,

    popperRef: useMergedRefs(props.popperRef, popperRef),
    onStateUpdate: state => {
      // PopperJS performs computations that might update the computed placement: auto positioning, flipping the
      // placement in case the popper box should be rendered at the edge of the viewport and does not fit
      if (state.placement !== latestPlacement.current) {
        latestPlacement.current = state.placement;

        // A state change has sense only if renderProps are passed, otherwise a state value is unused
        if (usesRenderProps) {
          setComputedPlacement(state.placement);
        }
      }
    },
  });

  useIsomorphicLayoutEffect(() => {
    // A way to sync refs, is needed as Popper component accepts refs as params
    // Does not make anything worse as Popper component does not have proper handing for ref updates ¯\_(ツ)_/¯
    targetRef.current = isRefObject(props.targetRef)
      ? (props.targetRef as React.RefObject<Element>).current
      : (props.targetRef as PopperJsVirtualElement);
    arrowRef.current = props.pointerTargetRef?.current as HTMLElement;
  });

  const scheduleUpdate = React.useCallback(() => {
    popperRef.current?.updatePosition();
  }, []);

  const child = usesRenderProps
    ? (props.children as PopperChildrenFn)({
        placement: computedPlacement,
        scheduleUpdate,
      })
    : (props.children as React.ReactElement);

  return child ? <Ref innerRef={containerRef}>{React.Children.only(child)}</Ref> : null;
};

Popper.defaultProps = {
  enabled: true,
  modifiers: [],
  positionFixed: false,
  positioningDependencies: [],
};
