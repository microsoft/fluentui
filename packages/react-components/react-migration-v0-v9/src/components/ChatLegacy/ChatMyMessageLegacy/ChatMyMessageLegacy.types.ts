import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-components';

export type ChatMyMessageLegacySlots = {
  /**
   * Specifies additional actions next to the message
   */
  actions?: Slot<'div'>;

  /**
   * Invisible author name for screen reader
   */
  author?: Slot<'div'>;

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
   * to the message; displays on top of the message
   */
  details?: Slot<'div'>;

  /**
   * Reactions on the message
   */
  reactions?: Slot<'div'>;

  root: NonNullable<Slot<'div'>>;

  /**
   * Can be used to customize message status icon
   */
  statusIcon?: Slot<'div'>;

  /**
   * Displays message status on top of the message
   */
  statusMessage?: Slot<'div'>;

  /**
   * timestamp of the message
   */
  timestamp?: Slot<'span', 'time'>;
};

export type ChatMyMessageLegacyProps = Omit<
  ComponentProps<Partial<ChatMyMessageLegacySlots>, 'body'>,
  'className' | 'style' | 'ref' | 'id'
> & {
  decoration?: 'important' | 'urgent';
  status?: 'sending' | 'received' | 'read' | 'failed' | 'blocked' | 'scheduled';

  /**
   * Whether the bubble is on the top/center/bottom of a group of messages.
   * It is used to style message bubble border radius.
   */
  attached?: 'center' | 'top' | 'bottom';

  /**
   * Whether the message bubble has animation.
   * @default false
   */
  showAnimation?: boolean;
};

export type ChatMyMessageLegacyState = ComponentState<ChatMyMessageLegacySlots> &
  Pick<ChatMyMessageLegacyProps, 'status' | 'decoration' | 'attached' | 'showAnimation'> & {
    /**
     * CSS class for the wrapper container around author, timestamp and details
     */
    nameLineClassName?: string;
  };
