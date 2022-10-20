import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type InfoButtonSlots = {
  root: Slot<'div'>;
};

/**
 * InfoButton Props
 */
export type InfoButtonProps = ComponentProps<InfoButtonSlots> & {};

/**
 * State used in rendering InfoButton
 */
export type InfoButtonState = ComponentState<InfoButtonSlots>;
