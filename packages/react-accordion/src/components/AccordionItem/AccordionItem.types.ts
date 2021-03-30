import * as React from 'react';
import { ComponentProps, Descendant } from '@fluentui/react-utilities';

export interface AccordionItemContext {
  open: boolean;
  disabled: boolean;
  onHeaderClick(ev: React.MouseEvent<HTMLElement>): void;
}

/**
 * {@docCategoryAccordionItem} */
export interface AccordionItemProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Disables opening/closing of panel
   */
  disabled?: boolean;
}

/**
 * {@docCategoryAccordionItem} */
export interface AccordionItemState extends AccordionItemProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
  context: AccordionItemContext;
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
