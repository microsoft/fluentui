import type {
  MessageBarProps as MessageBarBaseProps,
  MessageBarState as MessageBarBaseState,
} from '@fluentui/react-headless-components-preview/message-bar';

export type {
  MessageBarContextValues,
  MessageBarIntent,
  MessageBarSlots,
} from '@fluentui/react-headless-components-preview/message-bar';

export type MessageBarProps = MessageBarBaseProps & {
  /** @default 'rounded' */
  shape?: 'square' | 'rounded';
};

export type MessageBarState = MessageBarBaseState & {
  shape: NonNullable<MessageBarProps['shape']>;
  root: MessageBarBaseState['root'] & {
    'data-shape': NonNullable<MessageBarProps['shape']>;
  };
};
