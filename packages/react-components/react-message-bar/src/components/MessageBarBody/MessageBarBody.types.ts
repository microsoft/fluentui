import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type MessageBarBodySlots = {
  root: Slot<'div'>;
};

/**
 * MessageBarBody Props
 */
export type MessageBarBodyProps = ComponentProps<MessageBarBodySlots>;

/**
 * State used in rendering MessageBarBody
 */
export type MessageBarBodyState = ComponentState<MessageBarBodySlots>;
