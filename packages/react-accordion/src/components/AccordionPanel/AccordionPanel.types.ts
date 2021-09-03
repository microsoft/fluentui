import type { ComponentProps, ComponentState, ElementShorthandProps } from '@fluentui/react-utilities';

export type AccordionPanelSlots = {
  root: ElementShorthandProps<'div'>;
};

export interface AccordionPanelProps extends ComponentProps<AccordionPanelSlots> {}

export interface AccordionPanelState extends ComponentState<AccordionPanelSlots> {
  /**
   * Internal open state, provided by context
   */
  open: boolean;
}
