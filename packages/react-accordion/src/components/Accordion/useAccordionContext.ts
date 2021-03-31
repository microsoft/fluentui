import * as React from 'react';
import {
  createDescendantContext,
  useDescendant,
  useDescendantsInit,
  useControllableValue,
  useEventCallback,
} from '@fluentui/react-utilities';
import { AccordionContext, AccordionDescendant, AccordionIndex, AccordionState } from './Accordion.types';
import { createContext } from '@fluentui/react-context-selector';

export const accordionDescendantContext = createDescendantContext<AccordionDescendant>('AccordionDescendantContext');

export const accordionContext = createContext<AccordionContext>({
  openItems: [],
  requestToggle() {
    /* noop */
  },
});

/**
 * Creates the context to be provided for AccordionItem components
 */
export function useCreateAccordionContext(state: AccordionState) {
  const { index, multiple, collapsible, onToggle, size, inline, icon, expandIcon, expandIconPosition, button } = state;
  const [descendants, setDescendants] = useDescendantsInit<AccordionDescendant>();
  const normalizedIndex = React.useMemo(() => (index !== undefined ? normalizeIndex(index) : undefined), [index]);
  const [openItems, setOpenItems] = useControllableValue<number[], HTMLElement>(normalizedIndex!, () =>
    initializeUncontrolledOpenItems(state),
  );

  const requestToggle = useEventCallback((ev: React.MouseEvent<HTMLElement>, i: number) => {
    if (descendants[i]?.disabled === true) {
      return;
    }
    onToggle?.(ev, i);
    setOpenItems(previousOpenItems =>
      updateOpenItems(i, previousOpenItems!, {
        collapsible,
        multiple,
      }),
    );
  });
  const context: AccordionContext = {
    inline,
    icon,
    openItems,
    requestToggle,
    size,
    expandIconPosition,
    expandIcon,
    button,
  };
  return [context, descendants, setDescendants] as const;
}

/**
 * Registers an descendant in the accordion descendants context
 */
export function useAccordionDescendant(accordionDescendant: Omit<AccordionDescendant, 'index'>) {
  return useDescendant<AccordionDescendant>(accordionDescendant, accordionDescendantContext);
}

/**
 * Initial value for the uncontrolled case of the list of open indexes
 */
function initializeUncontrolledOpenItems({ defaultIndex, multiple, collapsible }: AccordionState) {
  switch (true) {
    case defaultIndex !== undefined: {
      if (multiple) {
        return Array.isArray(defaultIndex) ? defaultIndex : [defaultIndex!];
      } else {
        return Array.isArray(defaultIndex) ? [defaultIndex[0]] ?? [0] : [defaultIndex!];
      }
    }
    case collapsible:
      return [];
    default:
      return [0];
  }
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
function normalizeIndex(index: AccordionIndex) {
  return Array.isArray(index) ? index : [index];
}
