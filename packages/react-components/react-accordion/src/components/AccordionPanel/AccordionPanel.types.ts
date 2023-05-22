import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type AccordionPanelSlots = {
  root: NonNullable<Slot<'div'>>;
};

export type AccordionPanelProps = ComponentProps<Partial<AccordionPanelSlots>>;

export type AccordionPanelState = ComponentState<AccordionPanelSlots> & {
  /**
   * Internal open state, provided by context.
   */
  open: boolean;
};
