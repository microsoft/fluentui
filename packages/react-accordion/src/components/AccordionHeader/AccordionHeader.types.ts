import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { AccordionHeaderExpandIconProps } from './AccordionHeaderExpandIcon';

export type AccordionHeaderSize = 'small' | 'medium' | 'large' | 'extra-large';
export type AccordionHeaderExpandIconPosition = 'start' | 'end';

export interface AccordionHeaderContextValue {
  disabled: boolean;
  open: boolean;
  expandIconPosition: AccordionHeaderExpandIconPosition;
  size: AccordionHeaderSize;
}

export type AccordionHeaderSlots = {
  /**
   * The component to be used as button in heading
   */
  button: React.ButtonHTMLAttributes<HTMLElement>;
  /**
   * Expand icon slot rendered before (or after) children content in heading
   */
  expandIcon: AccordionHeaderExpandIconProps;
  /**
   * Expand icon slot rendered before (or after) children content in heading
   */
  icon: React.HTMLAttributes<HTMLElement>;
  children: React.HTMLAttributes<HTMLElement>;
};

export interface AccordionHeaderCommons extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * Size of spacing in the heading
   */
  size: AccordionHeaderSize;
  /**
   * The position of the expand  icon slot in heading
   */
  expandIconPosition: AccordionHeaderExpandIconPosition;
  /**
   * Indicates if the AccordionHeader should be rendered inline
   */
  inline: boolean;
}

export interface AccordionHeaderProps
  extends ComponentProps<Partial<AccordionHeaderSlots>>,
    Partial<AccordionHeaderCommons> {}

export interface AccordionHeaderState extends ComponentState<AccordionHeaderSlots>, AccordionHeaderCommons {
  /**
   * Ref to the root slot
   */
  ref: React.Ref<HTMLElement>;
  context: AccordionHeaderContextValue;
}
