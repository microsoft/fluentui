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

export type AccordionHeaderShorthands = {
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

export interface AccordionHeaderProps
  extends ComponentProps<Partial<AccordionHeaderShorthands>>,
    Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * Size of spacing in the heading
   */
  size?: AccordionHeaderSize;
  /**
   * The position of the expand  icon slot in heading
   */
  expandIconPosition?: AccordionHeaderExpandIconPosition;
  /**
   * Indicates if the AccordionHeader should be rendered inline
   */
  inline?: boolean;
}

// export type AccordionHeaderDefaultedProps = 'size' | 'expandIconPosition' | 'inline' | 'button';

export interface AccordionHeaderState
  extends ComponentState<AccordionHeaderShorthands>,
    Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * Ref to the root slot
   */
  ref: React.Ref<HTMLElement>;
  context: AccordionHeaderContextValue;
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

export type UninitializedAccordionHeaderState = Omit<AccordionHeaderState, 'context'>;
