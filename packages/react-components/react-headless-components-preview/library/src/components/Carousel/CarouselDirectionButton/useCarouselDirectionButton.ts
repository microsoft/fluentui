'use client';

import * as React from 'react';
import { mergeCallbacks, slot, useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import { getActiveElement } from '../../../hooks/top-layer/utils';
import { Button } from '../../Button';
import {
  isControlDisabled,
  isControlHidden,
  useCarouselContext,
  useCarouselPartRegistration,
} from '../carouselContext';
import { useCarouselControlRef } from '../carouselControls';
import { focusSelectedPage } from '../focusCarouselPage';
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
  const { button, ...rest } = props;
  const unavailable = kind === 'previous' ? context.previousUnavailable : context.nextUnavailable;
  const buttonSlot = slot.always(button, { elementType: Button });
  const present = !isControlHidden(props) && !isControlHidden(buttonSlot);
  const wrapperDisabled = isControlDisabled(rest);
  const enabled = !wrapperDisabled && !isControlDisabled(buttonSlot);
  const boundaryHidden = kind === 'previous' ? context.previousHidden : context.nextHidden;
  const rendered = present && context.buttons;
  const [focused, setFocused] = React.useState(false);
  const retiring = focused && (!rendered || boundaryHidden);
  const showWrapper = rendered || retiring;
  const hidden = boundaryHidden && !retiring;
  const wrapper = React.useRef<HTMLDivElement>(null);
  // Arrows register from props, so a hidden or unmounted arrow still counts as a route.
  const register = useCarouselPartRegistration(kind, present, enabled);
  useIsomorphicLayoutEffect(() => register(true), [register]);
  const ownControlRef = useCarouselControlRef<HTMLButtonElement>(context.viewportRef, kind);
  const focusTarget = React.useRef<HTMLButtonElement | null>(null);
  const controlRef = useMergedRefs(buttonSlot.ref, ownControlRef, focusTarget);
  // The button remounts when it leaves a boundary, so native autofocus would fire again. Honor `autoFocus` once, from
  // an effect, when the arrow is shown.
  const pendingAutoFocus = React.useRef(buttonSlot.autoFocus);
  React.useEffect(() => {
    if (pendingAutoFocus.current && !hidden && focusTarget.current) {
      pendingAutoFocus.current = false;
      focusTarget.current.focus();
    }
  });
  useIsomorphicLayoutEffect(() => {
    if (retiring) {
      // Keep a retiring arrow mounted until this commit can check actual focus ownership; focus dropped since it was
      // tracked was dropped from here.
      const owner = wrapper.current;
      const active = owner && getActiveElement(owner);
      if (owner && (owner.contains(active) || !active || active === owner.ownerDocument.body)) {
        focusSelectedPage(context.viewportRef.current, context.activeIndex);
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
  const rootRef = useMergedRefs(ref, wrapper, inertRef);
  const named = !!buttonSlot['aria-label'] || !!buttonSlot['aria-labelledby'];
  const control = {
    ...buttonSlot,
    'aria-controls': context.viewportId,
    'aria-label': named ? buttonSlot['aria-label'] : kind === 'previous' ? 'Previous' : 'Next',
    'aria-disabled': wrapperDisabled || buttonSlot['aria-disabled'],
    'data-carousel-action': kind,
    ref: controlRef,
    autoFocus: undefined,
    disabled: buttonSlot.disabled || unavailable,
    // An unavailable arrow stays a focusable anchor until the transition settles; a render callback can read it.
    disabledFocusable: buttonSlot.disabledFocusable || (!buttonSlot.disabled && unavailable),
    onFocus: mergeCallbacks(buttonSlot.onFocus, () => setFocused(true)),
    onBlur: mergeCallbacks(buttonSlot.onBlur, () => setFocused(false)),
    onClick: mergeCallbacks(buttonSlot.onClick, kind === 'previous' ? context.previous : context.next),
  };
  return {
    components: { root: 'div', button: Button },
    root: Object.assign(
      slot.always(
        {
          ...rest,
          ref: rootRef,
          hidden,
        },
        { elementType: 'div' },
      ),
      { 'data-carousel-button': kind },
    ),
    button: control,
    kind,
    rendered: showWrapper,
    hidden,
    unavailable,
  };
};
