import * as React from 'react';
import { getNativeElementProps, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import type { AccordionProps, AccordionState, AccordionToggleData, AccordionToggleEvent } from './Accordion.types';
import type { AccordionItemValue } from '../AccordionItem/AccordionItem.types';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';

/**
 * Returns the props and state required to render the component
 * @param props - Accordion properties
 * @param ref - reference to root HTMLElement of Accordion
 */
export const useAccordion_unstable = (props: AccordionProps, ref: React.Ref<HTMLElement>): AccordionState => {
  const {
    openItems: controlledOpenItems,
    defaultOpenItems,
    multiple = false,
    collapsible = false,
    onToggle,
    navigation,
  } = props;
  const [openItems, setOpenItems] = useControllableState({
    state: React.useMemo(() => normalizeValues(controlledOpenItems), [controlledOpenItems]),
    defaultState: () => initializeUncontrolledOpenItems({ defaultOpenItems, multiple }),
    initialState: [],
  });

  const arrowNavigationProps = useArrowNavigationGroup({
    circular: navigation === 'circular',
    tabbable: true,
  });

  const requestToggle = useEventCallback((event: AccordionToggleEvent, data: AccordionToggleData) => {
    onToggle?.(event, data);
    setOpenItems(previousOpenItems => updateOpenItems(data.value, previousOpenItems, multiple, collapsible));
  });

  return {
    collapsible,
    navigation,
    openItems,
    requestToggle,
    components: {
      root: 'div',
    },
    root: getNativeElementProps('div', {
      ...props,
      ...(navigation ? arrowNavigationProps : {}),
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
}: Pick<AccordionProps, 'defaultOpenItems' | 'multiple'>): AccordionItemValue[] {
  if (defaultOpenItems !== undefined) {
    if (Array.isArray(defaultOpenItems)) {
      return multiple ? defaultOpenItems : [defaultOpenItems[0]];
    }
    return [defaultOpenItems];
  }
  return [];
}

/**
 * Updates the list of open indexes based on an index that changes
 * @param value - the index that will change
 * @param previousOpenItems - list of current open indexes
 * @param multiple - if Accordion support multiple Panels opened at the same time
 * @param collapsible - if Accordion support multiple Panels closed at the same time
 */
function updateOpenItems(
  value: AccordionItemValue,
  previousOpenItems: AccordionItemValue[],
  multiple: boolean,
  collapsible: boolean,
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
