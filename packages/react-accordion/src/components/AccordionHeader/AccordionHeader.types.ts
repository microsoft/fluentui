import * as React from 'react';
import { ComponentProps, ObjectShorthandProps, ShorthandProps } from '@fluentui/react-utilities';

export type AccordionHeaderSize = 'small' | 'medium' | 'large' | 'extra-large';
export type AccordionHeaderExpandIconPosition = 'start' | 'end';

/**
 * {@docCategory AccordionHeader\}
 */
export interface AccordionHeaderExpandIconProps extends React.HTMLAttributes<HTMLElement> {
  open: boolean;
}

/**
 * {@docCategory AccordionHeader\}
 */
export interface AccordionHeaderProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   *  Size of spacing in the heading
   */
  size?: AccordionHeaderSize;
  /**
   * The component to be used as button
   */
  button?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;
  /**
   * Expand icon slot rendered before children content
   */
  expandIcon?: ShorthandProps<AccordionHeaderExpandIconProps>;
  /**
   * The position of the expand  icon slot
   */
  expandIconPosition?: AccordionHeaderExpandIconPosition;
}

/**
 * {@docCategory AccordionHeader\}
 */
export interface AccordionHeaderState extends AccordionHeaderProps {
  size: AccordionHeaderSize;
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;
  /**
   * Expand icon slot when processed by internal state
   */
  expandIcon?: ObjectShorthandProps<AccordionHeaderExpandIconProps>;
  /**
   * The component to be used as button
   */
  button: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;
  children?: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;
}
