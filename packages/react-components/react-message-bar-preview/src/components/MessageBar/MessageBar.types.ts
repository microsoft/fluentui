import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type MessageBarSlots = {
  root: Slot<'div'>;
  icon?: Slot<'div'>;
  action?: Slot<'div'>;
  actions?: Slot<'div'>;
  body?: Slot<'div'>;
};

/**
 * MessageBar Props
 */
export type MessageBarProps = ComponentProps<MessageBarSlots> & {
  multiline?: boolean;
  intent?: 'info' | 'success' | 'warning' | 'error';
};

/**
 * State used in rendering MessageBar
 */
export type MessageBarState = ComponentState<MessageBarSlots> &
  Required<Pick<MessageBarProps, 'multiline' | 'body' | 'intent'>>;
