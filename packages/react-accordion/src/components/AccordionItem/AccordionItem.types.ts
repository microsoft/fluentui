import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';

export interface AccordionItemContext {
  headingId: string;
  panelId: string;
  open: boolean;
  onAccordionHeaderClick(ev: React.MouseEvent<HTMLElement>): void;
}

/**
 * {@docCategory AccordionItem\}
 */
export interface AccordionItemProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Disables opening/closing of panel
   */
  disabled?: boolean;
  onToggle?(ev: React.MouseEvent<HTMLElement>, open: boolean): void;
}

/**
 * {@docCategory AccordionItem\}
 */
export interface AccordionItemState extends AccordionItemProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
  context: AccordionItemContext;
}
