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
import type { ForwardRefComponent, SlotRenderFunction } from '@fluentui/react-utilities';
import { getActiveElement } from '../../../hooks/top-layer/utils';
import { Tooltip } from '../../Tooltip';
import type { OnVisibleChangeData, TooltipProps } from '../../Tooltip';
import type { CarouselDirectionButtonState } from './CarouselDirectionButton.types';

type ButtonProps = CarouselDirectionButtonState['button'];
type TriggerProps = ButtonProps & {
  Component: React.ElementType<ButtonProps>;
  renderButton: SlotRenderFunction<ButtonProps>;
};

type Side = 'before' | 'after' | 'below' | 'above';
type Box = { left: number; top: number; right: number; bottom: number };

// Candidate sides in preference order: the declared side, the other side, then below and above the arrow.
const SIDES: Record<'before' | 'after', Side[]> = {
  before: ['before', 'after', 'below', 'above'],
  after: ['after', 'before', 'below', 'above'],
};
// [position-area, justify-self, align-self]. Self alignment sits the tooltip against its arrow in the tooltip's own
// direction instead of centering it over the arrow.
const NATIVE_AREAS: Record<Side, [string, string, string]> = {
  before: ['self-inline-start', 'self-end', 'anchor-center'],
  after: ['self-inline-end', 'self-start', 'anchor-center'],
  below: ['block-end', 'anchor-center', 'start'],
  above: ['block-start', 'anchor-center', 'end'],
};

const clamp = (value: number, max: number) => Math.max(0, Math.min(value, max));
const TOLERANCE = 0.5;
const isClear = (tip: Box, rect: Box) =>
  tip.right <= rect.left + TOLERANCE ||
  tip.left >= rect.right - TOLERANCE ||
  tip.bottom <= rect.top + TOLERANCE ||
  tip.top >= rect.bottom - TOLERANCE;
const isInside = (tip: Box, width: number, height: number) =>
  tip.left >= -TOLERANCE && tip.top >= -TOLERANCE && tip.right <= width + TOLERANCE && tip.bottom <= height + TOLERANCE;

// Tooltip must attach its trigger props and ref before the slot callback wraps the Button in arbitrary markup.
export const CustomTrigger: ForwardRefComponent<TriggerProps> = React.forwardRef(
  ({ Component, renderButton, ...props }, ref) => <>{renderButton(Component, { ...props, ref })}</>,
);

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
      const active = hovered.current || (trigger !== null && trigger === getActiveElement(trigger));
      if (props.unavailable || (event && data.visible !== active)) {
        return;
      }
      setVisible(data.visible);
    },
  );
  useIsomorphicLayoutEffect(() => {
    if (props.unavailable) {
      hovered.current = false;
      setVisible(false);
    }
  }, [props.unavailable]);
  useIsomorphicLayoutEffect(() => {
    const win = targetDocument?.defaultView;
    const element = tooltip.current;
    const button = trigger;
    if (!win || !element || !button || !visible || props.unavailable) {
      return;
    }
    const oldArea = element.style.getPropertyValue('position-area');
    const oldAlignment = element.style.placeSelf;
    const oldPlacement = element.getAttribute('data-placement');
    const native = !!win.CSS?.supports?.('position-area: self-inline-start');
    const sides = SIDES[props.position];
    const setPlacement = (side: Side) => {
      if (element.getAttribute('data-placement') !== side) {
        element.setAttribute('data-placement', side);
      }
    };
    // Anchor-centered alignment shifts an overflowing native tooltip back over its arrow instead of triggering
    // position-try fallbacks, so both paths measure each side: the first one clear of the arrow and inside the
    // viewport, else the first one clear of the arrow, else the declared side.
    const applyNative = (side: Side) => {
      const [area, justify, align] = NATIVE_AREAS[side];
      element.style.setProperty('position-area', area);
      element.style.justifySelf = justify;
      element.style.alignSelf = align;
    };
    const placeNative = (rect: DOMRect, width: number, height: number) => {
      let fallback: Side | undefined;
      for (const side of sides) {
        applyNative(side);
        const tip = element.getBoundingClientRect();
        if (isClear(tip, rect)) {
          if (isInside(tip, width, height)) {
            setPlacement(side);
            return;
          }
          fallback ??= side;
        }
      }
      const side = fallback ?? sides[0];
      applyNative(side);
      setPlacement(side);
    };
    // Engines without anchor positioning get fixed coordinates, clamped to the viewport.
    const placeManually = (rect: DOMRect, width: number, height: number) => {
      const tip = element.getBoundingClientRect();
      const rtl = win.getComputedStyle(button).direction === 'rtl';
      const inlineX = (side: Side) => ((side === 'before') !== rtl ? rect.left - tip.width : rect.right);
      const centerX = clamp(rect.left + (rect.width - tip.width) / 2, width - tip.width);
      const centerY = clamp(rect.top + (rect.height - tip.height) / 2, height - tip.height);
      const candidates = sides.map(side => {
        const [x, y] =
          side === 'below'
            ? [centerX, rect.bottom]
            : side === 'above'
            ? [centerX, rect.top - tip.height]
            : [inlineX(side), centerY];
        const left = clamp(x, width - tip.width);
        const top = clamp(y, height - tip.height);
        return { side, left, top, right: left + tip.width, bottom: top + tip.height };
      });
      const chosen = candidates.find(candidate => isClear(candidate, rect)) ?? candidates[0];
      const left = `${chosen.left}px`;
      const top = `${chosen.top}px`;
      if (element.style.left !== left || element.style.top !== top) {
        element.style.left = left;
        element.style.top = top;
      }
      setPlacement(chosen.side);
    };
    const oldLeft = element.style.left;
    const oldTop = element.style.top;
    if (!native) {
      element.style.setProperty('position-area', 'none');
      element.style.placeSelf = 'start';
    }
    let frame: number;
    let measured = '';
    // Logical sides resolve against the trigger's direction (manual) or the tooltip's own direction (native).
    const keyOf = (rect: DOMRect, tip: DOMRect, width: number, height: number) =>
      [
        rect.left,
        rect.top,
        rect.width,
        rect.height,
        tip.width,
        tip.height,
        width,
        height,
        win.getComputedStyle(button).direction,
        win.getComputedStyle(element).direction,
      ].join();
    const update = () => {
      // A sibling's reflow can move the trigger without resizing or scrolling anything, so check every frame and only
      // re-place when the trigger, the viewport, a direction or the tooltip's own size changed.
      const rect = button.getBoundingClientRect();
      const tip = element.getBoundingClientRect();
      const { clientWidth, clientHeight } = element.ownerDocument.documentElement;
      // An unmeasured tooltip would trivially pass the checks, so wait until it is laid out.
      if (tip.width && keyOf(rect, tip, clientWidth, clientHeight) !== measured) {
        (native ? placeNative : placeManually)(rect, clientWidth, clientHeight);
        measured = keyOf(rect, element.getBoundingClientRect(), clientWidth, clientHeight);
      }
      frame = win.requestAnimationFrame(update);
    };
    update();
    return () => {
      win.cancelAnimationFrame(frame);
      element.style.left = oldLeft;
      element.style.top = oldTop;
      element.style.placeSelf = oldAlignment;
      element.style.setProperty('position-area', oldArea);
      if (oldPlacement === null) {
        element.removeAttribute('data-placement');
      } else {
        element.setAttribute('data-placement', oldPlacement);
      }
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
