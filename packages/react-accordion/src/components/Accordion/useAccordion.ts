import * as React from 'react';
import { AccordionItemValue } from '../AccordionItem/AccordionItem.types';
import { useControllableState, useEventCallback, getNativeElementProps } from '@fluentui/react-utilities';
import {
  AccordionProps,
  AccordionSlots,
  AccordionState,
  AccordionToggleData,
  AccordionToggleEvent,
} from './Accordion.types';

export const accordionShorthandProps: Array<keyof AccordionSlots> = ['root'];

export const useAccordion = (
  {
    openItems: controlledOpenItems,
    defaultOpenItems,
    multiple = false,
    collapsible = false,
    onToggle,
    navigable = false,
    ...rest
  }: AccordionProps,
  ref: React.Ref<HTMLElement>,
): AccordionState => {
  const [openItems, setOpenItems] = useControllableState({
    state: React.useMemo(() => normalizeValues(controlledOpenItems), [controlledOpenItems]),
    defaultState: () => initializeUncontrolledOpenItems({ collapsible, defaultOpenItems, multiple }),
    initialState: [],
  });

  const requestToggle = useEventCallback((ev: AccordionToggleEvent, data: AccordionToggleData) => {
    onToggle?.(ev, data);
    setOpenItems(previousOpenItems =>
      updateOpenItems(data.value, previousOpenItems, {
        collapsible,
        multiple,
      }),
    );
  });

  return {
    multiple,
    collapsible,
    navigable,
    openItems,
    requestToggle,
    root: getNativeElementProps('div', {
      ...rest,
      ref,
    }),
  };
};

/**
 * Initial value for the uncontrolled case of the list of open indexes
 */
function initializeUncontrolledOpenItems({
  defaultOpenItems,
  multiple,
  collapsible,
}: Pick<AccordionProps, 'defaultOpenItems' | 'multiple' | 'collapsible'>): AccordionItemValue[] {
  if (defaultOpenItems !== undefined) {
    if (Array.isArray(defaultOpenItems)) {
      return multiple ? defaultOpenItems : [defaultOpenItems[0]];
    }
    return [defaultOpenItems];
  }
  return collapsible ? [] : [0];
}

/**
 * Updates the list of open indexes based on an index that changes
 * @param value - the index that will change
 * @param previousOpenItems - list of current open indexes
 * @param param2 - {multiple, collapsible}
 */
function updateOpenItems(
  value: AccordionItemValue,
  previousOpenItems: AccordionItemValue[],
  { multiple, collapsible }: Pick<AccordionState, 'multiple' | 'collapsible'>,
) {
  if (multiple) {
    if (previousOpenItems.includes(value)) {
      if (previousOpenItems.length > 1 || collapsible) {
        return previousOpenItems.filter(i => i !== value);
      }
    } else {
      return [...previousOpenItems, value].sort();
    }
  } else {
    return previousOpenItems[0] === value && collapsible ? [] : [value];
  }
  return previousOpenItems;
}

/**
 * Normalizes Accordion index into an array of indexes
 */
function normalizeValues(index?: AccordionItemValue | AccordionItemValue[]): AccordionItemValue[] | undefined {
  if (index === undefined) {
    return undefined;
  }
  return Array.isArray(index) ? index : [index];
}
