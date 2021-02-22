import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';

/**
 * {@docCategory AccordionItem\}
 */
export interface AccordionItemProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {}

/**
 * {@docCategory AccordionItem\}
 */
export interface AccordionItemState extends AccordionItemProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
}
