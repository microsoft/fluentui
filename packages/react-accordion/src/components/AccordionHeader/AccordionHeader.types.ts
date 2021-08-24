import * as React from 'react';
import { ComponentProps, ComponentState, ObjectShorthandProps } from '@fluentui/react-utilities';
import { AccordionHeaderExpandIconProps } from './AccordionHeaderExpandIcon';
import { ARIAButtonShorthandProps } from '@fluentui/react-aria';

export type AccordionHeaderSize = 'small' | 'medium' | 'large' | 'extra-large';
export type AccordionHeaderExpandIconPosition = 'start' | 'end';

export interface AccordionHeaderContextValue {
  disabled: boolean;
  open: boolean;
  expandIconPosition: AccordionHeaderExpandIconPosition;
  size: AccordionHeaderSize;
}

export interface AccordionHeaderContextValues {
  accordionHeader: AccordionHeaderContextValue;
}

export type AccordionHeaderSlots = {
  root: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  /**
   * The component to be used as button in heading
   */
  button: ARIAButtonShorthandProps;
  /**
   * Expand icon slot rendered before (or after) children content in heading
   */
  expandIcon: AccordionHeaderExpandIconProps;
  /**
   * Expand icon slot rendered before (or after) children content in heading
   */
  icon?: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  children: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
};

export interface AccordionHeaderCommons {
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

export interface AccordionHeaderProps extends ComponentProps<AccordionHeaderSlots>, Partial<AccordionHeaderCommons> {}

export interface AccordionHeaderState
  extends ComponentState<AccordionHeaderSlots>,
    AccordionHeaderCommons,
    AccordionHeaderContextValue {}
