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
import { Tooltip } from '../../Tooltip';
import type { OnVisibleChangeData, TooltipProps } from '../../Tooltip';

/** Compose existing tooltip behavior, with immediate focus and boundary dismissal. */
export const CarouselDirectionTooltip = (props: {
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  content: TooltipProps['content'];
  position: 'before' | 'after';
  unavailable: boolean;
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  onPointerEnter?: React.PointerEventHandler<HTMLButtonElement>;
  onPointerLeave?: React.PointerEventHandler<HTMLButtonElement>;
}): React.ReactElement => {
  const { targetDocument } = useFluent_unstable();
  const [visible, setVisible] = React.useState(false);
  const trigger = React.useRef<HTMLElement | null>(null);
  const tooltip = React.useRef<HTMLDivElement | null>(null);
  const hovered = React.useRef(false);
  const content = slot.always(props.content, { elementType: 'div' });
  const contentRef = useMergedRefs(content.ref, tooltip);
  const onFocus = useEventCallback((event: React.FocusEvent<HTMLButtonElement>) => {
    props.onFocus?.(event);
    trigger.current = event.currentTarget;
    setVisible(true);
  });
  const onBlur = useEventCallback((event: React.FocusEvent<HTMLButtonElement>) => {
    props.onBlur?.(event);
  });
  const onPointerEnter = useEventCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    props.onPointerEnter?.(event);
    trigger.current = event.currentTarget;
    hovered.current = true;
  });
  const onPointerLeave = useEventCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    props.onPointerLeave?.(event);
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
      if (!data.visible && event && (hovered.current || trigger.current === targetDocument?.activeElement)) {
        return;
      }
      setVisible(data.visible);
    },
  );
  useIsomorphicLayoutEffect(() => {
    if (!targetDocument || !visible || props.unavailable) {
      return;
    }
    const dismiss = (event: KeyboardEvent) => {
      const element = tooltip.current;
      if (event.key === 'Escape' && !event.defaultPrevented && element?.matches(':popover-open')) {
        event.preventDefault();
        event.stopPropagation();
        // Unsupported hint popovers behave as manual, without native Escape dismissal.
        // Let Tooltip's native-close handler also cancel its pending hover timer.
        element.hidePopover();
      }
    };
    targetDocument.addEventListener('keydown', dismiss, true);
    return () => targetDocument.removeEventListener('keydown', dismiss, true);
  }, [targetDocument, visible, props.unavailable]);
  useIsomorphicLayoutEffect(() => {
    const win = targetDocument?.defaultView;
    const element = tooltip.current;
    const button = trigger.current;
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
    element.style.setProperty('position-area', 'none');
    const update = () => {
      const rect = button.getBoundingClientRect();
      const tip = element.getBoundingClientRect();
      const leading = (props.position === 'before') !== (win.getComputedStyle(button).direction === 'rtl');
      element.style.left = `${leading ? rect.left - tip.width : rect.right}px`;
      element.style.top = `${rect.top + (rect.height - tip.height) / 2}px`;
    };
    update();
    const observer = win.ResizeObserver ? new win.ResizeObserver(update) : undefined;
    observer?.observe(element);
    observer?.observe(button);
    win.addEventListener('resize', update);
    win.addEventListener('scroll', update, true);
    return () => {
      observer?.disconnect();
      win.removeEventListener('resize', update);
      win.removeEventListener('scroll', update, true);
      element.style.left = oldLeft;
      element.style.top = oldTop;
      element.style.setProperty('position-area', oldArea);
    };
  }, [targetDocument, visible, props.unavailable, props.position]);
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
        onFocus: mergeCallbacks(props.children.props.onFocus, onFocus),
        onBlur: mergeCallbacks(props.children.props.onBlur, onBlur),
      })}
    </Tooltip>
  );
};
