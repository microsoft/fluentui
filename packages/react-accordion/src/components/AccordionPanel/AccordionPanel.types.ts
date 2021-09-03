import type { ComponentProps, ComponentState, ObjectShorthandPropsAs } from '@fluentui/react-utilities';

export type AccordionPanelSlots = {
  root: ObjectShorthandPropsAs<'div'>;
};

export interface AccordionPanelProps extends ComponentProps<AccordionPanelSlots> {}

export interface AccordionPanelState extends ComponentState<AccordionPanelSlots> {
  /**
   * Internal open state, provided by context
   */
  open: boolean;
}
