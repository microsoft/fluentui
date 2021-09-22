import * as React from 'react';
import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type AccordionItemContextValue = {
  open: boolean;
  disabled: boolean;
  onHeaderClick(ev: React.MouseEvent | React.KeyboardEvent): void;
};

export type AccordionItemContextValues = {
  accordionItem: AccordionItemContextValue;
};

export type AccordionItemSlots = {
  root: IntrinsicShorthandProps<'div'>;
};

export type AccordionItemCommons = {
  /**
   * Disables opening/closing of panel
   */
  disabled: boolean;
};

export type AccordionItemProps = ComponentProps<AccordionItemSlots> &
  Partial<AccordionItemCommons> & {
    /**
     * required value that identifies this item inside an Accordion component
     */
    value: AccordionItemValue;
  };

export type AccordionItemValue = unknown;

export type AccordionItemState = ComponentState<AccordionItemSlots> & AccordionItemCommons & AccordionItemContextValue;
