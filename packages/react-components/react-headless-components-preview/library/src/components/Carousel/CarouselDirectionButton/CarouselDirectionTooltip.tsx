'use client';

import * as React from 'react';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import {
  mergeCallbacks,
  slot,
  useEventCallback,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { getActiveElement } from '../../../hooks/top-layer/utils';
import { Tooltip } from '../../Tooltip';
import type { OnVisibleChangeData, TooltipProps } from '../../Tooltip';

/** Compose existing tooltip behavior, with immediate focus and boundary dismissal. */
export const CarouselDirectionTooltip = (props: {
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  content: TooltipProps['content'];
  position: 'before' | 'after';
  unavailable: boolean;
}): React.ReactElement => {
  const { targetDocument } = useFluent_unstable();
  const [visible, setVisible] = React.useState(false);
  const [trigger, setTrigger] = React.useState<HTMLElement | null>(null);
  const tooltip = React.useRef<HTMLDivElement | null>(null);
  const hovered = React.useRef(false);
  const content = slot.always(props.content, { elementType: 'div' });
  const contentRef = useMergedRefs(content.ref, tooltip);
  // Native autofocus may fire before a layout-effect-backed event callback is ready.
  const onFocus = (event: React.FocusEvent<HTMLElement>) => {
    props.children.props.onFocus?.(event);
    setTrigger(event.currentTarget);
    setVisible(true);
  };
  const onPointerEnter = useEventCallback((event: React.PointerEvent<HTMLElement>) => {
    setTrigger(event.currentTarget);
    hovered.current = true;
  });
  const onPointerLeave = useEventCallback(() => {
    hovered.current = false;
  });
  const onTooltipPointerEnter = useEventCallback(() => {
    hovered.current = true;
  });
  const onTooltipPointerLeave = useEventCallback(() => {
    hovered.current = false;
  });
  const onVisibleChange = useEventCallback(
    (event: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement> | undefined, data: OnVisibleChangeData) => {
      if (!data.visible && event && (hovered.current || (trigger && trigger === getActiveElement(trigger)))) {
        return;
      }
      setVisible(data.visible);
    },
  );
  useIsomorphicLayoutEffect(() => {
    const win = targetDocument?.defaultView;
    const element = tooltip.current;
    const button = trigger;
    if (!win || !element || !button || !visible || props.unavailable) {
      return;
    }
    const oldArea = element.style.getPropertyValue('position-area');
    if (win.CSS?.supports?.('position-area: self-inline-start')) {
      // Use the tooltip's direction, not the viewport's, for nested RTL collections.
      element.style.setProperty('position-area', props.position === 'before' ? 'self-inline-start' : 'self-inline-end');
      return () => element.style.setProperty('position-area', oldArea);
    }
    // Tooltip uses native CSS anchors. Older engines need placement, not a carousel-engine polyfill.
    const oldLeft = element.style.left;
    const oldTop = element.style.top;
    const oldAlignment = element.style.placeSelf;
    element.style.setProperty('position-area', 'none');
    element.style.placeSelf = 'start';
    let frame: number;
    const update = () => {
      const rect = button.getBoundingClientRect();
      const tip = element.getBoundingClientRect();
      const leading = (props.position === 'before') !== (win.getComputedStyle(button).direction === 'rtl');
      const left = `${leading ? rect.left - tip.width : rect.right}px`;
      const top = `${rect.top + (rect.height - tip.height) / 2}px`;
      if (element.style.left !== left || element.style.top !== top) {
        element.style.left = left;
        element.style.top = top;
      }
      // A sibling's reflow can move the trigger without resizing or scrolling anything.
      frame = win.requestAnimationFrame(update);
    };
    update();
    return () => {
      win.cancelAnimationFrame(frame);
      element.style.left = oldLeft;
      element.style.top = oldTop;
      element.style.placeSelf = oldAlignment;
      element.style.setProperty('position-area', oldArea);
    };
  }, [targetDocument, trigger, visible, props.unavailable, props.position]);
  return (
    <Tooltip
      relationship="label"
      positioning={{ position: props.position, pinned: true }}
      content={{
        ...content,
        ref: contentRef,
        onPointerEnter: mergeCallbacks(content.onPointerEnter, onTooltipPointerEnter),
        onPointerLeave: mergeCallbacks(content.onPointerLeave, onTooltipPointerLeave),
      }}
      visible={!props.unavailable && visible}
      onVisibleChange={onVisibleChange}
    >
      {React.cloneElement(props.children, {
        onPointerEnter: mergeCallbacks(props.children.props.onPointerEnter, onPointerEnter),
        onPointerLeave: mergeCallbacks(props.children.props.onPointerLeave, onPointerLeave),
        onFocus,
      })}
    </Tooltip>
  );
};
