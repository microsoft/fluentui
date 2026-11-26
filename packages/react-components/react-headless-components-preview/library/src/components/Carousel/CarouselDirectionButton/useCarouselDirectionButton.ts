'use client';

import * as React from 'react';
import {
  getIntrinsicElementProps,
  mergeCallbacks,
  slot,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { getActiveElement } from '../../../hooks/top-layer/utils';
import { Button } from '../../Button';
import { isControlDisabled, useCarouselContext, useCarouselPart } from '../carouselContext';
import { useFocusCarouselPage } from '../useFocusCarouselPage';
import type { CarouselDirectionButtonProps, CarouselDirectionButtonState } from './CarouselDirectionButton.types';

/**
 * Create the state required to render CarouselPrevious or CarouselNext.
 *
 * @param kind - which direction the button navigates
 */
export const useCarouselDirectionButton = (
  props: CarouselDirectionButtonProps,
  ref: React.Ref<HTMLDivElement>,
  kind: 'previous' | 'next',
): CarouselDirectionButtonState => {
  const context = useCarouselContext();
  const { button, tooltip, ...rest } = props;
  const unavailable = kind === 'previous' ? context.previousUnavailable : context.nextUnavailable;
  const buttonSlot = slot.always(button, { elementType: Button });
  const present = !props.hidden && !buttonSlot.hidden;
  const wrapperDisabled = isControlDisabled(rest);
  useCarouselPart(kind, present, !wrapperDisabled && !isControlDisabled(buttonSlot));
  const boundaryHidden = kind === 'previous' ? context.previousHidden : context.nextHidden;
  const rendered = present && context.buttons;
  const [focused, setFocused] = React.useState(false);
  const retiring = focused && (!rendered || boundaryHidden);
  const hidden = boundaryHidden && !retiring;
  const wrapper = React.useRef<HTMLDivElement>(null);
  const focusPage = useFocusCarouselPage();
  useIsomorphicLayoutEffect(() => {
    if (retiring) {
      // Keep a retiring arrow mounted until this commit can check actual focus ownership.
      if (wrapper.current?.contains(getActiveElement(wrapper.current))) {
        const viewport = context.viewportRef.current;
        const page = viewport?.children[Math.min(context.activeIndex, viewport.children.length - 1)];
        if (page) {
          focusPage(page as HTMLElement);
        }
      }
      setFocused(false);
    }
  }, [retiring, context.activeIndex, context.viewportRef, focusPage]);
  const inertRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      node?.toggleAttribute('inert', hidden);
    },
    [hidden],
  );
  const rootRef = useMergedRefs(ref, wrapper, inertRef);
  const tooltipSlot = slot.always(tooltip, {
    elementType: 'div',
    defaultProps: { children: kind === 'previous' ? 'Previous' : 'Next' },
  });
  const tooltipId = tooltipSlot.id ?? `${context.idPrefix}-${kind}-label`;
  return {
    components: { root: 'div', button: Button, tooltip: 'div' },
    root: Object.assign(
      slot.always(getIntrinsicElementProps('div', { ...rest, ref: rootRef, hidden }), { elementType: 'div' }),
      { 'data-carousel-button': kind },
    ),
    button: Object.assign(buttonSlot, {
      'aria-controls': context.viewportId,
      'aria-labelledby': tooltipId,
      'aria-label': undefined,
      'aria-describedby': undefined,
      'aria-disabled': wrapperDisabled || buttonSlot['aria-disabled'],
      'data-carousel-action': kind,
      disabled: buttonSlot.disabled || unavailable,
      disabledFocusable: buttonSlot.disabledFocusable || (!buttonSlot.disabled && unavailable),
      onFocus: mergeCallbacks(buttonSlot.onFocus, () => setFocused(true)),
      onBlur: mergeCallbacks(buttonSlot.onBlur, () => setFocused(false)),
      onClick: mergeCallbacks(buttonSlot.onClick, kind === 'previous' ? context.previous : context.next),
    }),
    tooltip: Object.assign(tooltipSlot, { id: tooltipId }),
    kind,
    rendered: rendered || retiring,
    hidden,
    unavailable,
  };
};
