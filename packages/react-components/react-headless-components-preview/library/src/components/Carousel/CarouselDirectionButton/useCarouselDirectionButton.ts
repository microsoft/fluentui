'use client';

import * as React from 'react';
import {
  getIntrinsicElementProps,
  mergeCallbacks,
  SLOT_RENDER_FUNCTION_SYMBOL,
  slot,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { getActiveElement } from '../../../hooks/top-layer/utils';
import { Button } from '../../Button';
import { isControlDisabled, isControlHidden, useCarouselContext, useCarouselPart } from '../carouselContext';
import { focusCarouselPage } from '../focusCarouselPage';
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
  const present = !isControlHidden(props) && !isControlHidden(buttonSlot);
  const wrapperDisabled = isControlDisabled(rest);
  const enabled = !wrapperDisabled && !isControlDisabled(buttonSlot);
  const custom = !!buttonSlot[SLOT_RENDER_FUNCTION_SYMBOL] || typeof rest.children === 'function';
  const keepButtonMounted = custom && present && context.pageCount > 1;
  const boundaryHidden = kind === 'previous' ? context.previousHidden : context.nextHidden;
  const rendered = present && context.buttons;
  const [focused, setFocused] = React.useState(false);
  const retiring = focused && (!rendered || boundaryHidden);
  const showWrapper = rendered || retiring;
  const staging = keepButtonMounted && !showWrapper;
  const hidden = staging || (boundaryHidden && !retiring);
  const wrapper = React.useRef<HTMLDivElement>(null);
  const probe = React.useRef<HTMLTemplateElement>(null);
  const [nativeButton, setNativeButton] = React.useState<HTMLButtonElement | null>(null);
  const nativeLocation = React.useMemo(() => ({ current: nativeButton }), [nativeButton]);
  const buttonRef = useMergedRefs(buttonSlot.ref, setNativeButton);
  const probeRef = !custom && present && !showWrapper && context.pageCount > 1 ? probe : undefined;
  const location = keepButtonMounted ? nativeLocation : showWrapper ? wrapper : probeRef;
  useCarouselPart(kind, present && !!location, enabled, location);
  // A custom button is already mounted while staged. Honor its autofocus once, only when it becomes usable.
  const pendingAutoFocus = React.useRef(buttonSlot.autoFocus);
  useIsomorphicLayoutEffect(() => {
    if (keepButtonMounted && !hidden && nativeButton && pendingAutoFocus.current) {
      pendingAutoFocus.current = false;
      nativeButton.focus();
    }
  }, [keepButtonMounted, hidden, nativeButton]);
  useIsomorphicLayoutEffect(() => {
    if (retiring) {
      // Keep a retiring arrow mounted until this commit can check actual focus ownership.
      if (wrapper.current?.contains(getActiveElement(wrapper.current))) {
        const viewport = context.viewportRef.current;
        const page = viewport?.children[Math.min(context.activeIndex, viewport.children.length - 1)];
        if (page) {
          focusCarouselPage(page as HTMLElement);
        }
      }
      setFocused(false);
    }
  }, [retiring, context.activeIndex, context.viewportRef]);
  const inertRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      node?.toggleAttribute('inert', hidden);
    },
    [hidden],
  );
  const rootRef = useMergedRefs(staging ? undefined : ref, wrapper, inertRef);
  const tooltipSlot = slot.always(tooltip, {
    elementType: 'div',
    defaultProps: { children: kind === 'previous' ? 'Previous' : 'Next' },
  });
  const tooltipId = tooltipSlot.id ?? `${context.idPrefix}-${kind}-label`;
  return {
    components: { root: 'div', button: Button, tooltip: 'div' },
    root: Object.assign(
      slot.always(
        getIntrinsicElementProps('div', {
          ...(staging ? { children: rest.children, 'aria-hidden': true } : rest),
          ref: rootRef,
          hidden,
        }),
        { elementType: 'div' },
      ),
      { 'data-carousel-button': kind },
    ),
    button: Object.assign(buttonSlot, {
      'aria-controls': context.viewportId,
      'aria-labelledby': tooltipId,
      'aria-label': undefined,
      'aria-describedby': undefined,
      'aria-disabled': wrapperDisabled || buttonSlot['aria-disabled'],
      'data-carousel-action': kind,
      ref: keepButtonMounted ? buttonRef : buttonSlot.ref,
      autoFocus: keepButtonMounted ? undefined : buttonSlot.autoFocus,
      disabled: buttonSlot.disabled || unavailable || (keepButtonMounted && hidden),
      disabledFocusable: !hidden && (buttonSlot.disabledFocusable || (!buttonSlot.disabled && unavailable)),
      onFocus: mergeCallbacks(buttonSlot.onFocus, () => setFocused(true)),
      onBlur: mergeCallbacks(buttonSlot.onBlur, () => setFocused(false)),
      onClick: mergeCallbacks(buttonSlot.onClick, kind === 'previous' ? context.previous : context.next),
    }),
    tooltip: Object.assign(tooltipSlot, { id: tooltipId }),
    kind,
    rendered: showWrapper,
    probeRef,
    keepButtonMounted,
    hidden,
    unavailable,
  };
};
