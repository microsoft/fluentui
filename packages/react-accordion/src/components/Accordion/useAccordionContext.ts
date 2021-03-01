import * as React from 'react';
import { createDescendantContext, useDescendant, useDescendantsInit } from '@reach/descendants';
import { AccordionContext, AccordionDescendant, AccordionOpen, AccordionState } from './Accordion.types';

export const accordionDescendantContext = createDescendantContext<AccordionDescendant>('AccordionDescendantContext');

export const accordionContext = React.createContext<AccordionContext>(undefined!);

export function useCreateAccordionContext({ open, defaultOpen, multiple, collapsible, onToggle }: AccordionState) {
  const { current: isControlled } = React.useRef(typeof open !== 'undefined');
  const [descendants, setDescendants] = useDescendantsInit<AccordionDescendant>();
  const [openItems, setOpenItems] = React.useState<AccordionOpen>(() => {
    switch (true) {
      case isControlled:
        return open!;

      // If we have a defaultIndex, we need to do a few checks
      case defaultOpen !== undefined:
        /*
         * If multiple is set to true, we need to make sure the `defaultIndex`
         * is an array (and vice versa). We'll handle console warnings in
         * our propTypes, but this will at least keep the component from
         * blowing up.
         */
        if (multiple) {
          return Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen!];
        } else {
          return Array.isArray(defaultOpen) ? defaultOpen[0] ?? 0 : defaultOpen!;
        }

      /*
       * Collapsible accordions with no defaultIndex will start with all
       * panels collapsed. Otherwise the first panel will be our default.
       */
      case collapsible:
        return multiple ? [] : -1;
      default:
        return multiple ? [0] : 0;
    }
  });

  const requestToggle = React.useCallback(
    (index: number) => {
      onToggle?.(index);

      if (!isControlled) {
        setOpenItems(prevOpenPanels => {
          /*
           * If we're dealing with an uncontrolled component, the index arg
           * in selectChange will always be a number rather than an array.
           */
          index = index as number;
          // multiple allowed
          if (multiple) {
            // state will always be an array here
            prevOpenPanels = prevOpenPanels as number[];
            if (
              // User is clicking on an already-open button
              prevOpenPanels.includes(index as number)
            ) {
              // Other panels are open OR accordion is allowed to collapse
              if (prevOpenPanels.length > 1 || collapsible) {
                // Close the panel by filtering it from the array
                return prevOpenPanels.filter(i => i !== index);
              }
            } else {
              // Open the panel by adding it to the array.
              return [...prevOpenPanels, index].sort();
            }
          } else {
            prevOpenPanels = prevOpenPanels as number;
            return prevOpenPanels === index && collapsible ? -1 : index;
          }
          return prevOpenPanels;
        });
      }
    },
    [collapsible, isControlled, multiple, onToggle],
  );
  const context: AccordionContext = React.useMemo(
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
