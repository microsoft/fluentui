import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { AccordionItemContextValue } from '../../contexts/accordionItem';

export type AccordionItemContextValues<Value = AccordionItemValue> = {
  accordionItem: AccordionItemContextValue<Value>;
};

export type AccordionItemSlots = {
  root: NonNullable<Slot<'div'>>;
};

export type AccordionItemProps<Value = AccordionItemValue> = ComponentProps<AccordionItemSlots> & {
  /**
   * Disables opening/closing of panel.
   */
  disabled?: boolean;
  /**
   * Required value that identifies this item inside an Accordion component.
   */
  value: Value;
};

export type AccordionItemValue = unknown;

export type AccordionItemState<Value = AccordionItemValue> = ComponentState<AccordionItemSlots> &
  AccordionItemContextValue<Value>;
