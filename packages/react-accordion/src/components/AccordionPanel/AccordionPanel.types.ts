import * as React from 'react';
import { ComponentProps, ComponentState } from '@fluentui/react-utilities';

export type AccordionPanelShorthands = {};

export interface AccordionPanelProps
  extends ComponentProps<AccordionPanelShorthands>,
    React.HTMLAttributes<HTMLElement> {}

export interface AccordionPanelState
  extends ComponentState<AccordionPanelShorthands>,
    React.HTMLAttributes<HTMLElement> {
  /**
   * Ref to the root slot
   */
  ref: React.Ref<HTMLElement>;
  /**
   * Internal open state, provided by context
   */
  open: boolean;
}
