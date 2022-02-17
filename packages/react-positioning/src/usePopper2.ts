import { VirtualElement } from '@floating-ui/core';
import { computePosition, flip, shift, offset } from '@floating-ui/dom';
import { useFluent } from '@fluentui/react-shared-contexts/src';
import { canUseDOM, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useEventCallback } from '@fluentui/react-utilities/src';
import * as React from 'react';
import { PopperOptions, PositioningProps } from './types';
import { getBoundary } from './utils/getBoundary';
import { getPlacement } from './utils/positioningHelper';
import { useCallbackRef } from './utils/useCallbackRef';

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
    positionFixed,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    unstable_disableTether,
  } = options;

  const { dir } = useFluent();
  const isRtl = dir === 'rtl';

  return React.useCallback(
    (target: HTMLElement | VirtualElement | null, container: HTMLElement | null, arrow: HTMLElement | null) => {
      const placement = getPlacement(align, position, isRtl);

      return {
        placement,
      };
    },
    [isRtl, align, position],
  );
}

export function usePopper(options: PositioningProps) {
  const enabled = true;
  const resolvePopperOptions = usePopperOptions(options);
  const updatePosition = useEventCallback(() => {
    const target = overrideTargetRef.current ?? targetRef.current;
    if (!canUseDOM || !enabled || !target || !containerRef.current) {
      return;
    }

    const { placement } = resolvePopperOptions(target, containerRef.current, arrowRef.current);
    computePosition(target, containerRef.current, { placement }).then(({ x, y }) => {
      if (!containerRef.current) {
        return;
      }

      Object.assign(containerRef.current.style, {
        left: `${x}px`,
        top: `${y}px`,
        position: 'absolute',
      });
    });
  });

  const targetRef = useCallbackRef<HTMLElement | VirtualElement | null>(null, updatePosition, true);
  const containerRef = useCallbackRef<HTMLElement | null>(null, updatePosition, true);
  const arrowRef = useCallbackRef<HTMLElement | null>(null, updatePosition, true);
  const overrideTargetRef = useCallbackRef<HTMLElement | VirtualElement | null>(null, updatePosition, true);

  useIsomorphicLayoutEffect(() => {
    updatePosition();
  }, [updatePosition, enabled]);

  return { targetRef, containerRef, arrowRef };
}
