import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type AccordionPanelSlots = {
  root: IntrinsicShorthandProps<'div'>;
};

export interface AccordionPanelProps extends ComponentProps<AccordionPanelSlots> {}

export interface AccordionPanelState extends ComponentState<AccordionPanelSlots> {
  /**
   * Internal open state, provided by context
   */
  open: boolean;
}
