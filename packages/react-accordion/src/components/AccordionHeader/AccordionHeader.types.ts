import * as React from 'react';
import { ComponentPropsCompat, ComponentStateCompat, ShorthandPropsCompat } from '@fluentui/react-utilities';

export type AccordionHeaderSize = 'small' | 'medium' | 'large' | 'extra-large';
export type AccordionHeaderExpandIconPosition = 'start' | 'end';

export interface AccordionHeaderContextValue {
  disabled: boolean;
  open: boolean;
  expandIconPosition: AccordionHeaderExpandIconPosition;
  size: AccordionHeaderSize;
}

export interface AccordionHeaderProps extends ComponentPropsCompat, React.HTMLAttributes<HTMLElement> {
  /**
   * Size of spacing in the heading
   */
  size?: AccordionHeaderSize;
  /**
   * The component to be used as button in heading
   */
  button?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;
  /**
   * Expand icon slot rendered before (or after) children content in heading
   */
  expandIcon?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;
  /**
   * The position of the expand  icon slot in heading
   */
  expandIconPosition?: AccordionHeaderExpandIconPosition;
  /**
   * Expand icon slot rendered before (or after) children content in heading
   */
  icon?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;
  /**
   * Indicates if the AccordionHeader should be rendered inline
   */
  inline?: boolean;
  children?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;
}

export type AccordionHeaderShorthandPropsCompat = 'button' | 'expandIcon' | 'icon' | 'children';
export type AccordionHeaderDefaultedProps = 'size' | 'expandIconPosition' | 'inline' | 'button';

export interface AccordionHeaderState
  extends ComponentStateCompat<
    AccordionHeaderProps,
    AccordionHeaderShorthandPropsCompat,
    AccordionHeaderDefaultedProps
  > {
  /**
   * Ref to the root slot
   */
  ref: React.Ref<HTMLElement>;
  context: AccordionHeaderContextValue;
}
