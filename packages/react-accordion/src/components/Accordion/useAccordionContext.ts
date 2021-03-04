import * as React from 'react';
import { createDescendantContext, useDescendant, useDescendantsInit } from '@reach/descendants';
import { AccordionContext, AccordionDescendant, AccordionIndex, AccordionState } from './Accordion.types';
import { useConst, useControllableValue, useEventCallback } from '@fluentui/react-utilities';

export const accordionDescendantContext = createDescendantContext<AccordionDescendant>('AccordionDescendantContext');

export const accordionContext = React.createContext<AccordionContext>({
  openItems: -1,
  requestToggle() {
    /* noop */
  },
});

export function useCreateAccordionContext(state: AccordionState) {
  const { index: open, multiple, collapsible, onToggle } = state;
  const isControlled = useConst(typeof open !== 'undefined');
  const [descendants, setDescendants] = useDescendantsInit<AccordionDescendant>();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialDefaultIndex = React.useMemo(() => initializeOpenItems(state), []);
  const [openItems, setOpenItems] = useControllableValue(open, initialDefaultIndex);

  const requestToggle = useEventCallback((ev: React.MouseEvent<HTMLElement>, index: number) => {
    onToggle?.(ev, index);
    setOpenItems(previousOpenItems =>
      updateOpenItems(index, previousOpenItems!, {
        collapsible,
        multiple,
      }),
    );
  });
  const context = React.useMemo<AccordionContext>(
    () => ({
      openItems: isControlled ? open! : openItems!,
      requestToggle,
    }),
    [isControlled, open, openItems, requestToggle],
  );
  return [context, descendants, setDescendants] as const;
}

export const useAccordionContext = () => React.useContext(accordionContext);

export function useAccordionDescendant(accordionDescendant: Omit<AccordionDescendant, 'index'>) {
  return useDescendant<AccordionDescendant>(accordionDescendant, accordionDescendantContext);
}

function initializeOpenItems({ index, defaultIndex, multiple, collapsible }: AccordionState) {
  const isControlled = typeof index !== 'undefined';
  switch (true) {
    case isControlled:
      return index!;
    case defaultIndex !== undefined: {
      if (multiple) {
        return Array.isArray(defaultIndex) ? defaultIndex : [defaultIndex!];
      } else {
        return Array.isArray(defaultIndex) ? defaultIndex[0] ?? 0 : defaultIndex!;
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
        return openItems.filter(i => i !== index);
      }
    } else {
      return [...openItems, index].sort();
    }
  } else {
    return openItems === index && collapsible ? -1 : index;
  }
  return openItems;
}
