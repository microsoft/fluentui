import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';

export interface AccordionPanelProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {}

export interface AccordionPanelState extends ComponentState<AccordionPanelProps> {
  /**
   * Ref to the root slot
   */
  ref: React.Ref<HTMLElement>;
  /**
   * Internal open state, provided by context
   */
  open: boolean;
}
