'use client';

import * as React from 'react';
import { getIntrinsicElementProps, useMergedRefs, slot } from '@fluentui/react-utilities';
import { useFocusableGroup, useFocusFinders, useFocusWithin } from '@fluentui/react-tabster';

import type { CardBaseProps, CardBaseState, CardOnSelectionChangeEvent, CardProps, CardState } from './Card.types';
import { useCardSelectable } from './useCardSelectable';
import { cardContextDefaultValue } from './CardContext';

const focusMap = {
  off: undefined,
  'no-tab': 'limited-trap-focus',
  'tab-exit': 'limited',
  'tab-only': 'unlimited',
} as const;

const interactiveEventProps = [
  'onClick',
  'onDoubleClick',
  'onMouseUp',
  'onMouseDown',
  'onPointerUp',
  'onPointerDown',
  'onTouchStart',
  'onTouchEnd',
  'onDragStart',
  'onDragEnd',
] as (keyof React.HTMLAttributes<HTMLElement>)[];

/**
 * Compute whether a Card is interactive based on the presence of pointer/mouse
 * event props and the disabled flag. This intentionally does not depend on
 * focus management utilities so it can be used from headless contexts.
 */
const computeInteractive = (props: CardProps): boolean => {
  if (props.disabled) {
    return false;
  }

  return interactiveEventProps.some(prop => props[prop] !== undefined);
};

/**
 * Create the state required to render Card.
 *
 * The returned state can be modified with hooks such as useCardStyles_unstable,
 * before being passed to renderCard_unstable.
 *
 * @param props - props from this instance of Card
 * @param ref - reference to the root element of Card
 */
export const useCard_unstable = (props: CardProps, ref: React.Ref<HTMLDivElement>): CardState => {
  const { appearance = 'filled', orientation = 'vertical', size = 'medium', ...cardProps } = props;
  const { disabled = false, focusMode: focusModeProp } = props;

  // Focus-within ref drives the styled focus outline; merged with the user ref
  // before being passed down so the base hook does not depend on react-tabster.
  const focusWithinRef = useFocusWithin<HTMLDivElement>();
  const cardRef = useMergedRefs(focusWithinRef, ref);

  // Focus-aware predicate that prevents toggling the selection when the user
  // interacts with an inner focusable element.
  const { findAllFocusable } = useFocusFinders();
  const shouldRestrictTriggerAction = React.useCallback(
    (event: CardOnSelectionChangeEvent) => {
      if (!focusWithinRef.current) {
        return false;
      }

      const focusableElements = findAllFocusable(focusWithinRef.current);
      const target = event.target as HTMLElement;

      return focusableElements.some(element => element.contains(target));
    },
    [findAllFocusable, focusWithinRef],
  );

  const interactive = computeInteractive(props);
  const focusMode = focusModeProp ?? (interactive ? 'no-tab' : 'off');
  const groupperAttrs = useFocusableGroup({
    tabBehavior: focusMap[focusMode],
  });

  const state = useCardBase_unstable(
    {
      shouldRestrictTriggerAction,
      ...cardProps,
    },
    cardRef,
  );

  // Apply focusable-group attributes only when the card is not selectable, not
  // disabled and the focus mode is enabled.
  const shouldApplyFocusAttributes = !disabled && !state.selectable && focusMode !== 'off';
  if (shouldApplyFocusAttributes) {
    Object.assign(state.root, groupperAttrs, { tabIndex: 0 });
  }

  return {
    ...state,
    appearance,
    orientation,
    size,
  };
};

/**
 * Base hook for Card component, which manages state related to interactivity, selection,
 * ARIA attributes, and slot structure without design props or focus management.
 *
 * This hook is intentionally free of `@fluentui/react-tabster` so that it can be
 * consumed by headless component packages. Focus management (focusable group
 * attributes, focus-within, focus-restriction predicate) is layered on top in
 * `useCard_unstable`.
 *
 * @param props - props from this instance of Card
 * @param ref - reference to the root element of Card
 * @param options - optional behavior overrides such as a focus-aware restriction predicate
 */
export const useCardBase_unstable = (props: CardBaseProps, ref: React.Ref<HTMLDivElement>): CardBaseState => {
  const { disabled = false, ...restProps } = props;

  const [referenceId, setReferenceId] = React.useState(cardContextDefaultValue.selectableA11yProps.referenceId);
  const [referenceLabel, setReferenceLabel] = React.useState(cardContextDefaultValue.selectableA11yProps.referenceId);

  const { selectable, selected, selectableCardProps, selectFocused, checkboxSlot, floatingActionSlot } =
    useCardSelectable(props, { referenceId, referenceLabel });

  const interactive = computeInteractive(props);

  let cardRootProps = {
    ...restProps,
    ...selectableCardProps,
  };

  if (disabled) {
    cardRootProps = {
      ...restProps,
      'aria-disabled': true,
      onClick: undefined,
    };
  }

  return {
    interactive,
    selectable,
    selectFocused,
    selected,
    disabled,
    selectableA11yProps: {
      setReferenceId,
      referenceId,
      referenceLabel,
      setReferenceLabel,
    },

    components: {
      root: 'div',
      floatingAction: 'div',
      checkbox: 'input',
    },

    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        role: 'group',
        ...cardRootProps,
      }),
      { elementType: 'div' },
    ),

    floatingAction: floatingActionSlot,
    checkbox: checkboxSlot,
  };
};
