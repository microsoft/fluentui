import * as React from 'react';
import type { ComponentProps, ComponentState, ElementShorthandProps } from '@fluentui/react-utilities';

export interface AccordionItemContextValue {
  open: boolean;
  disabled: boolean;
  onHeaderClick(ev: React.MouseEvent | React.KeyboardEvent): void;
}

export interface AccordionItemContextValues {
  accordionItem: AccordionItemContextValue;
}

export type AccordionItemSlots = {
  root: ElementShorthandProps<'div'>;
};

export interface AccordionItemCommons {
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
    AccordionItemContextValue {}
