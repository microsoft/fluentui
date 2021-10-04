import * as React from 'react';
import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type AccordionItemContextValue = Omit<AccordionItemCommons, 'value'> & {
  open: boolean;
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
  /**
   * required value that identifies this item inside an Accordion component
   */
  value: AccordionItemValue;
};

export type AccordionItemProps = ComponentProps<AccordionItemSlots> &
  Partial<AccordionItemCommons> &
  Pick<AccordionItemCommons, 'value'>;

export type AccordionItemValue = unknown;

export type AccordionItemState = ComponentState<AccordionItemSlots> & AccordionItemCommons & AccordionItemContextValue;
