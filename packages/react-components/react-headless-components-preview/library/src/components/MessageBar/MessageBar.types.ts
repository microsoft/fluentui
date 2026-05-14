import type {
  MessageBarSlots as MessageBarBaseSlots,
  MessageBarBaseProps,
  MessageBarBaseState,
  MessageBarContextValues as MessageBarBaseContextValues,
  MessageBarIntent,
} from '@fluentui/react-message-bar';

export type MessageBarSlots = MessageBarBaseSlots;

export type MessageBarProps = MessageBarBaseProps;

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

export type MessageBarContextValues = MessageBarBaseContextValues;

export type { MessageBarIntent };
