import type { ComponentProps, ComponentState, IntrinsicSlotProps } from '@fluentui/react-utilities';

export type AccordionPanelSlots = {
  root: IntrinsicSlotProps<'div'>;
};

export type AccordionPanelProps = ComponentProps<AccordionPanelSlots>;

export type AccordionPanelState = ComponentState<AccordionPanelSlots> & {
  /**
   * Internal open state, provided by context
   */
  open: boolean;
};
