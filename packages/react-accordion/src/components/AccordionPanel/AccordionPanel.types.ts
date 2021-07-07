import * as React from 'react';
import { ComponentPropsCompat, ComponentStateCompat } from '@fluentui/react-utilities';

export interface AccordionPanelProps extends ComponentPropsCompat, React.HTMLAttributes<HTMLElement> {}

export interface AccordionPanelState extends ComponentStateCompat<AccordionPanelProps> {
  /**
   * Ref to the root slot
   */
  ref: React.Ref<HTMLElement>;
  /**
   * Internal open state, provided by context
   */
  open: boolean;
}
