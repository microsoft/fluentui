import * as React from 'react';
import { createDescendantContext, useDescendant, useDescendantsInit } from '@reach/descendants';
import { useConst } from '@fluentui/react-utilities';
import { AccordionContext, AccordionDescendant } from './Accordion.types';

export const accordionDescendantContext = createDescendantContext<AccordionDescendant>('AccordionDescendantContext');

export const accordionContext = React.createContext<AccordionContext>(undefined!);

export function useCreateAccordionContext() {
  const [descendants, setDescendants] = useDescendantsInit();
  const context = useConst<AccordionContext>({});
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
