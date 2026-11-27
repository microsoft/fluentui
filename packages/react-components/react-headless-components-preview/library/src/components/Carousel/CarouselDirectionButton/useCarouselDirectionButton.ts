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
import {
  isControlDisabled,
  isControlHidden,
  useCarouselContext,
  useCarouselPartRegistration,
} from '../carouselContext';
import { useCarouselControlRef } from '../carouselControls';
import { focusSelectedPage } from '../focusCarouselPage';
import { useFieldsetRegistration } from '../useFieldsetRegistration';
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
  const stageRef = React.useRef<HTMLDivElement>(null);
  const register = useCarouselPartRegistration(kind, present, enabled);
  const track = useFieldsetRegistration(register);
  const probe = useMergedRefs<HTMLTemplateElement>(track);
  const buttonRef = useMergedRefs(buttonSlot.ref, keepButtonMounted ? track : undefined);
  const ownControlRef = useCarouselControlRef<HTMLButtonElement>(context.viewportRef, kind);
  const controlRef = useMergedRefs(keepButtonMounted ? buttonRef : buttonSlot.ref, ownControlRef);
  const probeRef = !custom && present && !showWrapper && context.pageCount > 1 ? probe : undefined;
  // A custom button is already mounted while staged. Honor its autofocus once, only when it becomes usable.
  const pendingAutoFocus = React.useRef(buttonSlot.autoFocus);
  useIsomorphicLayoutEffect(() => {
    if (keepButtonMounted && !hidden && buttonRef.current && pendingAutoFocus.current) {
      pendingAutoFocus.current = false;
      buttonRef.current.focus();
    }
  });
  useIsomorphicLayoutEffect(() => {
    if (retiring) {
      // Keep a retiring arrow mounted until this commit can check actual focus ownership. Staging also hides content
      // a root callback renders beside the forwarded root, and focus dropped since it was tracked was dropped from here.
      const owner = stageRef.current ?? wrapper.current;
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
  const rootRef = useMergedRefs(
    ref,
    wrapper,
    keepButtonMounted ? undefined : inertRef,
    keepButtonMounted ? undefined : track,
  );
  const tooltipSlot = slot.always(tooltip, {
    elementType: 'div',
    defaultProps: { children: kind === 'previous' ? 'Previous' : 'Next' },
  });
  const tooltipId = tooltipSlot.id ?? `${context.idPrefix}-${kind}-label`;
  const control = {
    ...buttonSlot,
    'aria-controls': context.viewportId,
    'aria-labelledby': tooltipId,
    'aria-label': undefined,
    'aria-describedby': undefined,
    'aria-disabled': wrapperDisabled || buttonSlot['aria-disabled'],
    'data-carousel-action': kind,
    ref: controlRef,
    autoFocus: keepButtonMounted ? undefined : buttonSlot.autoFocus,
    disabled: buttonSlot.disabled || (!keepButtonMounted && unavailable),
    disabledFocusable: buttonSlot.disabledFocusable || (!hidden && !buttonSlot.disabled && unavailable),
    onFocus: mergeCallbacks(buttonSlot.onFocus, () => setFocused(true)),
    onBlur: mergeCallbacks(buttonSlot.onBlur, () => setFocused(false)),
    onClick: mergeCallbacks(buttonSlot.onClick, kind === 'previous' ? context.previous : context.next),
  };
  return {
    components: { root: 'div', button: Button, tooltip: 'div' },
    root: Object.assign(
      slot.always(
        getIntrinsicElementProps('div', {
          ...rest,
          ref: rootRef,
          hidden: keepButtonMounted ? rest.hidden : hidden,
        }),
        { elementType: 'div' },
      ),
      { 'data-carousel-button': kind },
    ),
    button: control,
    tooltip: Object.assign(tooltipSlot, { id: tooltipId }),
    kind,
    rendered: showWrapper,
    probeRef,
    keepButtonMounted,
    stage: keepButtonMounted
      ? { ref: stageRef, onFocus: () => setFocused(true), onBlur: () => setFocused(false) }
      : undefined,
    hidden,
    unavailable,
  };
};
