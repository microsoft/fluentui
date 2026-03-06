import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type MessageBarTitleSlots = {
  root: Slot<'span'>;
};

/**
 * MessageBarTitle Props
 */
export type MessageBarTitleProps = ComponentProps<MessageBarTitleSlots>;

/**
 * MessageBarTitle base props
 */
export type MessageBarTitleBaseProps = MessageBarTitleProps;

/**
 * State used in rendering MessageBarTitle
 */
export type MessageBarTitleState = ComponentState<MessageBarTitleSlots>;

/**
 * MessageBarTitle base state
 */
export type MessageBarTitleBaseState = MessageBarTitleState;
