import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type MessageBarBodyContextValues = {
  link: {
    inline?: boolean;
  };
};

export type MessageBarBodySlots = {
  root: Slot<'div'>;
};

/**
 * MessageBarBody Props
 */
export type MessageBarBodyProps = ComponentProps<MessageBarBodySlots>;

/**
 * MessageBarBody base props
 */
export type MessageBarBodyBaseProps = ComponentProps<MessageBarBodySlots>;

/**
 * State used in rendering MessageBarBody
 */
export type MessageBarBodyState = ComponentState<MessageBarBodySlots>;

/**
 * MessageBarBody base state
 */
export type MessageBarBodyBaseState = ComponentState<MessageBarBodySlots>;
