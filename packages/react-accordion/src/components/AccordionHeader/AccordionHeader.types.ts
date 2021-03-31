import * as React from 'react';
import { ComponentProps, ObjectShorthandProps, ShorthandProps } from '@fluentui/react-utilities';

export type AccordionHeaderSize = 'small' | 'medium' | 'large' | 'extra-large';
export type AccordionHeaderExpandIconPosition = 'start' | 'end';

export interface AccordionHeaderContextValue {
  open: boolean;
  expandIconPosition: AccordionHeaderExpandIconPosition;
  size: AccordionHeaderSize;
}

export interface AccordionHeaderProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Size of spacing in the heading
   */
  size?: AccordionHeaderSize;
  /**
   * The component to be used as button in heading
   */
  button?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;
  /**
   * Expand icon slot rendered before (or after) children content in heading
   */
  expandIcon?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;
  /**
   * The position of the expand  icon slot in heading
   */
  expandIconPosition?: AccordionHeaderExpandIconPosition;
  /**
   * Expand icon slot rendered before (or after) children content in heading
   */
  icon?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;
  /**
   * Indicates if the AccordionHeader should be rendered inline
   */
  inline?: boolean;
}

export interface AccordionHeaderState extends AccordionHeaderProps {
  size: AccordionHeaderSize;
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
  /**
   * Expand icon slot when processed by internal state
   */
  expandIcon: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;
  expandIconPosition: AccordionHeaderExpandIconPosition;
  icon?: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;
  /**
   * The component to be used as button
   */
  button: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;
  children?: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;
  context: AccordionHeaderContextValue;
  inline: boolean;
}
