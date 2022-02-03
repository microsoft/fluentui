import * as React from 'react';
import type { ComponentProps, ComponentState, IntrinsicSlotProps } from '@fluentui/react-utilities';

export type AccordionItemContextValue = Omit<AccordionItemCommonsUnstable, 'value'> & {
  open: boolean;
  onHeaderClick(ev: React.MouseEvent | React.KeyboardEvent): void;
};

export type AccordionItemContextValues = {
  accordionItem: AccordionItemContextValue;
};

export type AccordionItemSlots = {
  root: IntrinsicSlotProps<'div'>;
};

export type AccordionItemCommonsUnstable = {
  /**
   * Disables opening/closing of panel
   */
  disabled: boolean;
  /**
   * required value that identifies this item inside an Accordion component
   */
  value: AccordionItemValue;
};

export type AccordionItemProps = ComponentProps<AccordionItemSlots> &
  Partial<AccordionItemCommonsUnstable> &
  Pick<AccordionItemCommonsUnstable, 'value'>;

export type AccordionItemValue = unknown;

export type AccordionItemState = ComponentState<AccordionItemSlots> &
  AccordionItemCommonsUnstable &
  AccordionItemContextValue;
