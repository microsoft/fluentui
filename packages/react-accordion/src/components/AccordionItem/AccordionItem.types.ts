import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type AccordionItemContextValue = {
  disabled: boolean;
  open: boolean;
  onHeaderClick(ev: React.MouseEvent | React.KeyboardEvent): void;
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
