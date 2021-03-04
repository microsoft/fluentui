import * as React from 'react';
import { createDescendantContext, useDescendant, useDescendantsInit } from '@reach/descendants';
import { AccordionContext, AccordionDescendant, AccordionIndex, AccordionState } from './Accordion.types';
import { useConst } from '@fluentui/react-utilities';

export const accordionDescendantContext = createDescendantContext<AccordionDescendant>('AccordionDescendantContext');

export const accordionContext = React.createContext<AccordionContext>(undefined!);

export function useCreateAccordionContext(state: AccordionState) {
  const { index: open, multiple, collapsible, onToggle } = state;
  const isControlled = useConst(typeof open !== 'undefined');
  const [descendants, setDescendants] = useDescendantsInit<AccordionDescendant>();
  const [openItems, setOpenItems] = React.useState<AccordionIndex>(() => initializeOpenItems(state));

  const requestToggle = useEventCallback((index: number) => {
    onToggle?.(index);
    if (!isControlled) {
      setOpenItems((previousOpenItems) =>
        updateOpenItems(index, previousOpenItems, {
          collapsible,
          multiple,
        }),
      );
    }
  });
  const context = React.useMemo<AccordionContext>(
    () => ({
      openItems: isControlled ? open! : openItems,
      requestToggle,
    }),
    [isControlled, open, openItems, requestToggle],
  );
  return [context, descendants, setDescendants] as const;
}

export function useAccordionContext() {
  const context = React.useContext(accordionContext);
  if (context === undefined) {
    throw new Error(`${useAccordionContext.name} should be used inside an Accordion element`);
  }
  return context;
}

export function useAccordionDescendant(accordionDescendant: Omit<AccordionDescendant, 'index'>) {
  return useDescendant<AccordionDescendant>(accordionDescendant, accordionDescendantContext);
}

function initializeOpenItems({ index: open, defaultIndex: defaultOpen, multiple, collapsible }: AccordionState) {
  const isControlled = typeof open !== 'undefined';
  switch (true) {
    case isControlled:
      return open!;
    case defaultOpen !== undefined: {
      if (multiple) {
        return Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen!];
      } else {
        return Array.isArray(defaultOpen) ? defaultOpen[0] ?? 0 : defaultOpen!;
      }
    }
    case collapsible:
      return multiple ? [] : -1;
    default:
      return multiple ? [0] : 0;
  }
}

function isMultiple(open: AccordionIndex, multiple: boolean): open is number[] {
  return Array.isArray(open) && multiple;
}

function updateOpenItems(
  index: number,
  openItems: AccordionIndex,
  { multiple, collapsible }: Pick<AccordionState, 'multiple' | 'collapsible'>,
) {
  if (isMultiple(openItems, multiple)) {
    if (openItems.includes(index)) {
      if (openItems.length > 1 || collapsible) {
        return openItems.filter((i) => i !== index);
      }
    } else {
      return [...openItems, index].sort();
    }
  } else {
    return openItems === index && collapsible ? -1 : index;
  }
  return openItems;
}
