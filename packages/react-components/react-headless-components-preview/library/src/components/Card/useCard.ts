'use client';

import * as React from 'react';
import { useCardBase_unstable } from '@fluentui/react-card';
import type { CardOnSelectionChangeEvent } from '@fluentui/react-card';
import { useMergedRefs } from '@fluentui/react-utilities';

import type { CardContextValue, CardProps, CardState } from './Card.types';
import { toDataAttributeValue } from '../../utils/toDataAttributeValue';
import { findAllFocusable, useFocusableGroup } from '../../hooks/focus';
import type { UseFocusableGroupOptions } from '../../hooks/focus';

const focusMap: Record<NonNullable<CardProps['focusMode']>, UseFocusableGroupOptions['tabBehavior'] | undefined> = {
  off: undefined,
  'no-tab': 'limited-trap-focus',
  'tab-exit': 'limited',
  'tab-only': 'unlimited',
};

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
] as const;

const isInteractive = (props: CardProps): boolean =>
  !props.disabled && interactiveEventProps.some(prop => props[prop] !== undefined);

/**
 * Returns the state for a Card component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderCard`.
 */
export const useCard = (props: CardProps, ref: React.Ref<HTMLDivElement>): CardState => {
  const { focusMode: focusModeProp, disabled = false } = props;
  const cardRef = React.useRef<HTMLDivElement>(null);
  const mergedRef = useMergedRefs(cardRef, ref);

  // Interacting with an inner focusable element must not toggle the card's selection.
  const shouldRestrictTriggerAction = React.useCallback((event: CardOnSelectionChangeEvent) => {
    const target = event.target as HTMLElement;
    return !!cardRef.current && findAllFocusable(cardRef.current).some(element => element.contains(target));
  }, []);

  const focusMode = focusModeProp ?? (isInteractive(props) ? 'no-tab' : 'off');
  const focusableGroupAttributes = useFocusableGroup({ tabBehavior: focusMap[focusMode] });

  const state: CardState = useCardBase_unstable({ shouldRestrictTriggerAction, ...props }, mergedRef);

  if (!disabled && !state.selectable && focusMode !== 'off') {
    Object.assign(state.root, focusableGroupAttributes, { tabIndex: 0 });
  }

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-selected'] = toDataAttributeValue(state.selected);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = toDataAttributeValue(state.disabled);

  return state;
};

/**
 * Returns the context value provided by the nearest Card, enabling child components to
 * read card-level state such as the selectable accessibility properties.
 */
export { useCardContext_unstable as useCardContext } from '@fluentui/react-card';

/**
 * Maps Card state to the context value passed down to child components.
 */
export const useCardContextValue = ({ selectableA11yProps }: CardState): CardContextValue => {
  return { selectableA11yProps };
};
