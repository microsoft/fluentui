import * as React from 'react';
import { ComponentProps, ComponentState, ObjectShorthandProps } from '@fluentui/react-utilities';

export type AccordionPanelSlots = {
  root: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
};

export interface AccordionPanelProps extends ComponentProps<AccordionPanelSlots> {}

export interface AccordionPanelState extends ComponentState<AccordionPanelSlots> {
  /**
   * Internal open state, provided by context
   */
  open: boolean;
}
