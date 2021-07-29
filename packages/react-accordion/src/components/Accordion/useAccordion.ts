import * as React from 'react';
import { useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { useDescendants } from '@fluentui/react-utilities';
import {
  AccordionIndex,
  AccordionProps,
  AccordionState,
  AccordionToggleData,
  AccordionToggleEvent,
} from './Accordion.types';

export const useAccordion = (
  { index, defaultIndex, multiple = false, collapsible = false, onToggle, navigable = false, ...rest }: AccordionProps,
  ref: React.Ref<HTMLElement>,
): AccordionState => {
  const [descendants, setDescendant] = useDescendants();

  const [openItems, setOpenItems] = useControllableState({
    state: React.useMemo(() => normalizeIndex(index), [index]),
    defaultState: () => initializeUncontrolledOpenItems({ collapsible, defaultIndex, multiple }),
    initialState: [],
  });

  const requestToggle = useEventCallback((ev: AccordionToggleEvent, data: AccordionToggleData) => {
    onToggle?.(ev, data);
    setOpenItems(previousOpenItems =>
      updateOpenItems(data.index, previousOpenItems, {
        collapsible,
        multiple,
      }),
    );
  });

  return {
    ...rest,
    ref,
    multiple,
    collapsible,
    navigable,
    openItems,
    requestToggle,
    descendants,
    setDescendant,
  };
};

/**
 * Initial value for the uncontrolled case of the list of open indexes
 */
function initializeUncontrolledOpenItems({
  defaultIndex,
  multiple,
  collapsible,
}: Pick<AccordionProps, 'defaultIndex' | 'multiple' | 'collapsible'>): number[] {
  if (defaultIndex !== undefined) {
    if (Array.isArray(defaultIndex)) {
      return multiple ? defaultIndex : [defaultIndex[0]];
    }
    return [defaultIndex];
  }
  return collapsible ? [] : [0];
}

/**
 * Updates the list of open indexes based on an index that changes
 * @param index - the index that will change
 * @param previousOpenItems - list of current open indexes
 * @param param2 - {multiple, collapsible}
 */
function updateOpenItems(
  index: number,
  previousOpenItems: number[],
  { multiple, collapsible }: Pick<AccordionState, 'multiple' | 'collapsible'>,
) {
  if (multiple) {
    if (previousOpenItems.includes(index)) {
      if (previousOpenItems.length > 1 || collapsible) {
        return previousOpenItems.filter(i => i !== index);
      }
    } else {
      return [...previousOpenItems, index].sort();
    }
  } else {
    return previousOpenItems[0] === index && collapsible ? [] : [index];
  }
  return previousOpenItems;
}

/**
 * Normalizes Accordion index into an array of indexes
 */
function normalizeIndex(index?: AccordionIndex): number[] | undefined {
  if (index === undefined) {
    return undefined;
  }
  return Array.isArray(index) ? index : [index];
}
