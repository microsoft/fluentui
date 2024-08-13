import * as React from 'react';
import type {
  AccordionHeaderExpandIconPosition,
  AccordionHeaderSize,
} from '../components/AccordionHeader/AccordionHeader.types';

export type AccordionHeaderContextValue = {
  disabled: boolean;
  open: boolean;
  expandIconPosition: AccordionHeaderExpandIconPosition;
  size: AccordionHeaderSize;
};

const AccordionHeaderContext = React.createContext<AccordionHeaderContextValue | undefined>(
  undefined,
) as React.Context<AccordionHeaderContextValue>;

const accordionHeaderContextDefaultValue = {
  open: false,
  disabled: false,
  size: 'medium',
  expandIconPosition: 'start',
};

export const { Provider: AccordionHeaderProvider } = AccordionHeaderContext;

export const useAccordionHeaderContext_unstable = () =>
  React.useContext(AccordionHeaderContext) ?? accordionHeaderContextDefaultValue;
