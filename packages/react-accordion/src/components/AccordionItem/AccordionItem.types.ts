import * as React from 'react';
import { ComponentProps, ComponentState, Descendant } from '@fluentui/react-utilities';

export interface AccordionItemContextValue {
  open: boolean;
  disabled: boolean;
  onHeaderClick(ev: React.MouseEvent | React.KeyboardEvent): void;
}

export interface AccordionItemProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Disables opening/closing of panel
   */
  disabled?: boolean;
}

export interface AccordionItemState extends ComponentState<AccordionItemProps> {
  /**
   * Ref to the root slot
   */
  ref: React.Ref<HTMLElement>;
  context: AccordionItemContextValue;
  /**
   * Internal Context used by AccordionHeader and AccordionPanel communication
   */
  descendants: AccordionItemDescendant[];
  /**
   * Internal Context used by Accordion and AccordionItem communication
   */
  setDescendants: React.Dispatch<React.SetStateAction<AccordionItemDescendant[]>>;
}

export interface AccordionItemDescendant<ElementType = HTMLElement> extends Descendant<ElementType> {
  id: string;
}
