import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type AccordionItemContextValue = Required<Pick<AccordionItemProps, 'disabled'>> & {
  onHeaderClick(ev: React.MouseEvent | React.KeyboardEvent): void;
  open: boolean;
};

export type AccordionItemContextValues = {
  accordionItem: AccordionItemContextValue;
};

export type AccordionItemSlots = {
  root: Slot<'div'>;
};

export type AccordionItemProps = ComponentProps<AccordionItemSlots> & {
  /**
   * Disables opening/closing of panel
   */
  disabled?: boolean;
  /**
   * required value that identifies this item inside an Accordion component
   */
  value: AccordionItemValue;
};

export type AccordionItemValue = unknown;

export type AccordionItemState = ComponentState<AccordionItemSlots> & AccordionItemContextValue;
