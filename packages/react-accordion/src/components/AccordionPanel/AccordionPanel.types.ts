import * as React from 'react';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';

export type AccordionPanelSlots = {};

export interface AccordionPanelProps extends ComponentProps<AccordionPanelSlots>, React.HTMLAttributes<HTMLElement> {}

export interface AccordionPanelState extends ComponentState<AccordionPanelSlots>, React.HTMLAttributes<HTMLElement> {
  /**
   * Ref to the root slot
   */
  ref: React.Ref<HTMLElement>;
  /**
   * Internal open state, provided by context
   */
  open: boolean;
}
