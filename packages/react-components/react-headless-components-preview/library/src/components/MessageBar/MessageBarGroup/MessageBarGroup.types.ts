import type {
  MessageBarGroupSlots as MessageBarGroupBaseSlots,
  MessageBarGroupProps as MessageBarGroupBaseProps,
  MessageBarGroupState as MessageBarGroupBaseState,
} from '@fluentui/react-message-bar';

export type MessageBarGroupSlots = MessageBarGroupBaseSlots;

export type MessageBarGroupProps = MessageBarGroupBaseProps;

export type MessageBarGroupState = MessageBarGroupBaseState & {
  root: {
    /**
     * Data attribute reflecting the group's animation mode.
     */
    'data-animate'?: string;
  };
};
