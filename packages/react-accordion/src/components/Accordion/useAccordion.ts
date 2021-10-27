import * as React from 'react';
import { getNativeElementProps, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import type {
  AccordionProps,
  AccordionSlots,
  AccordionState,
  AccordionToggleData,
  AccordionToggleEvent,
} from './Accordion.types';
import type { AccordionItemValue } from '../AccordionItem/AccordionItem.types';

export const accordionShorthandProps: Array<keyof AccordionSlots> = ['root'];

/**
 * Returns the props and state required to render the component
 * @param props - Accordion properties
 * @param ref - reference to root HTMLElement of Accordion
 */
export const useAccordion = (props: AccordionProps, ref: React.Ref<HTMLElement>): AccordionState => {
  const {
    openItems: controlledOpenItems,
    defaultOpenItems,
    multiple = false,
    collapsible = false,
    onToggle,
    navigable = false,
  } = props;
  const [openItems, setOpenItems] = useControllableState({
    state: React.useMemo(() => normalizeValues(controlledOpenItems), [controlledOpenItems]),
    defaultState: () => initializeUncontrolledOpenItems({ collapsible, defaultOpenItems, multiple }),
    initialState: [],
  });

  const requestToggle = useEventCallback((event: AccordionToggleEvent, data: AccordionToggleData) => {
    onToggle?.(event, data);
    setOpenItems(previousOpenItems => {
      return updateOpenItems(data.value, previousOpenItems, {
        collapsible,
        multiple,
      });
    });
  });

  return {
    multiple,
    collapsible,
    navigable,
    openItems,
    requestToggle,
    root: getNativeElementProps('div', {
      ...props,
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
  /**
   * TODO: since the dropping of descendants API due to performance issues,
   * the default behavior of Accordion has been compromised and [0] makes no sense
   * indexes are not used anymore to ensure the position of the element which should be opened by default
   */
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
