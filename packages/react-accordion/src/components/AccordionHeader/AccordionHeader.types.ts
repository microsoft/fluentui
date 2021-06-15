import * as React from 'react';
import { ComponentProps, ComponentState, ShorthandProps } from '@fluentui/react-utilities';

export type AccordionHeaderSize = 'small' | 'medium' | 'large' | 'extra-large';
export type AccordionHeaderExpandIconPosition = 'start' | 'end';

export interface AccordionHeaderContextValue {
  disabled: boolean;
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
  children?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;
}

export type AccordionHeaderShorthandProps = 'button' | 'expandIcon' | 'icon' | 'children';
export type AccordionHeaderDefaultedProps = 'size' | 'expandIconPosition' | 'inline' | 'button';

export interface AccordionHeaderState
  extends ComponentState<AccordionHeaderProps, AccordionHeaderShorthandProps, AccordionHeaderDefaultedProps> {
  /**
   * Ref to the root slot
   */
  ref: React.Ref<HTMLElement>;
  context: AccordionHeaderContextValue;
}
