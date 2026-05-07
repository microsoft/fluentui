import type {
  MessageBarActionsSlots as MessageBarActionsBaseSlots,
  MessageBarActionsProps as MessageBarActionsBaseProps,
  MessageBarActionsState as MessageBarActionsBaseState,
  MessageBarActionsContextValues as MessageBarActionsBaseContextValues,
} from '@fluentui/react-message-bar';

export type MessageBarActionsSlots = MessageBarActionsBaseSlots;

export type MessageBarActionsProps = MessageBarActionsBaseProps;

export type MessageBarActionsState = MessageBarActionsBaseState & {
  root: {
    /**
     * Data attribute reflecting the computed layout. Value is 'singleline' or 'multiline'.
     */
    'data-layout'?: string;

    /**
     * Data attribute set when actions content is present.
     */
    'data-has-actions'?: string;
  };
};

export type MessageBarActionsContextValues = MessageBarActionsBaseContextValues;
