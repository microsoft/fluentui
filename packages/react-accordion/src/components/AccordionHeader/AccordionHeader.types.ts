import * as React from 'react';
import { ComponentProps, ObjectShorthandProps, ShorthandProps } from '@fluentui/react-utilities';

/**
 * {@docCategory AccordionHeader\}
 */
export interface AccordionHeaderProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Expand icon slot rendered before children content
   */
  expandIcon?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;
  /**
   * The position of the expand  icon slot
   */
  expandIconPosition?: AccordionHeaderExpandIconPosition;
}

export type AccordionHeaderExpandIconPosition = 'start' | 'end';

/**
 * {@docCategory AccordionHeader\}
 */
export interface AccordionHeaderState extends AccordionHeaderProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
  /**
   * Expand icon slot when processed by internal state
   */
  expandIcon?: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;
}
