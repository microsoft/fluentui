import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';

export interface AccordionItemContextValue {
  open: boolean;
  disabled: boolean;
  onHeaderClick(ev: React.MouseEvent | React.KeyboardEvent): void;
}

export type AccordionItemSlots = {};

export interface AccordionItemCommons extends React.HTMLAttributes<HTMLElement> {
  /**
   * Disables opening/closing of panel
   */
  disabled: boolean;
}

export interface AccordionItemProps extends ComponentProps<AccordionItemSlots>, Partial<AccordionItemCommons> {
  /**
   * required value that identifies this item inside an Accordion component
   */
  value: AccordionItemValue;
}

export type AccordionItemValue = unknown;

export interface AccordionItemState
  extends ComponentState<AccordionItemSlots>,
    AccordionItemCommons,
    AccordionItemContextValue {
  /**
   * Ref to the root slot
   */
  ref: React.Ref<HTMLElement>;
}
