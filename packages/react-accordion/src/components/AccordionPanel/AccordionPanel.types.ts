import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type AccordionPanelSlots = {
  root: IntrinsicShorthandProps<'div'>;
};

export type AccordionPanelProps = ComponentProps<AccordionPanelSlots>;

export type AccordionPanelState = ComponentState<AccordionPanelSlots> & {
  /**
   * Internal open state, provided by context
   */
  open: boolean;
};
