import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ChatMessageLegacySlots = {
  author?: Slot<'div'>;

  avatar?: Slot<'div'>;

  body: NonNullable<Slot<'div'>>;

  /**
   * Can be used to customize the decoration icon next to the message
   */
  decorationIcon?: Slot<'div'>;

  /**
   * Decoration label on top of the message
   */
  decorationLabel?: Slot<'div'>;

  /**
   * Specifies additional info (for example if a message is edited/translated)
   * to the message on author name line
   */
  details?: Slot<'div'>;

  /**
   * Reactions on the message
   */
  reactions?: Slot<'div'>;

  root: NonNullable<Slot<'div'>>;

  timestamp?: Slot<'span', 'time'>;
};

/**
 * ChatMessageLegacy Props
 */
export type ChatMessageLegacyProps = Omit<
  ComponentProps<Partial<ChatMessageLegacySlots>, 'body'>,
  'className' | 'style' | 'ref' | 'id' | 'tabIndex'
> & {
  /**
   * Whether the bubble is on the top/center/bottom of a group of messages.
   * It is used to style message bubble border radius.
   */
  attached?: 'center' | 'top' | 'bottom';

  /**
   * Specifies the decoration to render pre-defined decoration icon next to the message
   */
  decoration?: 'important' | 'urgent' | 'mention' | 'mentionEveryone';

  /**
   * By default, timestamp is only visible on hover, and it appears next to the message bubble.
   * When set, show timestamp on top of message bubble, and make it always visible.
   * @default false
   */
  persistentTimestamp?: boolean;

  /**
   * Whether the message bubble has animation.
   * @default false
   */
  showAnimation?: boolean;
};

/**
 * State used in rendering ChatMessageLegacy
 */
export type ChatMessageLegacyState = ComponentState<ChatMessageLegacySlots> &
  Pick<ChatMessageLegacyProps, 'attached' | 'decoration' | 'persistentTimestamp' | 'showAnimation'> & {
    /**
     * CSS class for the wrapper container around author, timestamp and details
     */
    nameLineClassName?: string;
  };
