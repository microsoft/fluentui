import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';

export interface AccordionItemContext {
  headingId: string;
  panelId: string;
  open: boolean;
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
}
