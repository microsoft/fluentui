import type {
  MessageBarProps as MessageBarHeadlessProps,
  MessageBarState as MessageBarHeadlessState,
} from '@fluentui/react-headless-components-preview/message-bar';

export type {
  MessageBarContextValues,
  MessageBarIntent,
  MessageBarSlots,
} from '@fluentui/react-headless-components-preview/message-bar';

/** Corner treatment of the MessageBar. */
export type MessageBarShape = 'rounded' | 'square';

/**
 * Windmod MessageBar props: the headless message bar plus the look prop the headless surface
 * deliberately omits (it exists purely to select styles).
 */
export type MessageBarProps = MessageBarHeadlessProps & {
  /** @default 'rounded' */
  shape?: MessageBarShape;
};

/** Windmod MessageBar state: headless state plus the resolved look prop. */
export type MessageBarState = MessageBarHeadlessState & Required<Pick<MessageBarProps, 'shape'>>;
