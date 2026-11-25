import type { MessageBarActionsState as MessageBarActionsBaseState } from '@fluentui/react-message-bar';

export type {
  MessageBarActionsSlots,
  MessageBarActionsProps,
  MessageBarActionsContextValues,
} from '@fluentui/react-message-bar';

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
