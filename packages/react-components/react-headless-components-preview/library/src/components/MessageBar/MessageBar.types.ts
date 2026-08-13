import type { MessageBarBaseState, MessageBarIntent } from '@fluentui/react-message-bar';

export type {
  MessageBarSlots,
  MessageBarBaseProps as MessageBarProps,
  MessageBarContextValues,
} from '@fluentui/react-message-bar';

export type MessageBarState = MessageBarBaseState & {
  root: {
    /**
     * Data attribute reflecting the computed layout. Value is 'singleline' or 'multiline'.
     */
    'data-layout'?: string;

    /**
     * Data attribute reflecting the current intent.
     */
    'data-intent'?: string;
  };
};

export type { MessageBarIntent };
