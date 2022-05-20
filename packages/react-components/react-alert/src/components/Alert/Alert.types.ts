import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type AlertSlots = {
  root: Slot<'div'>;
};

/**
 * Alert Props
 */
export type AlertProps = ComponentProps<AlertSlots>;

/**
 * State used in rendering Alert
 */
export type AlertState = ComponentState<AlertSlots>;
