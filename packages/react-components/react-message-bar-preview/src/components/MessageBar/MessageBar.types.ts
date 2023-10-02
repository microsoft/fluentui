import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { MessageBarContextValue } from '../../contexts/messageBarContext';

export type MessageBarSlots = {
  root: Slot<'div'>;
  icon?: Slot<'div'>;
};

export type MessageBarContextValues = {
  messageBar: MessageBarContextValue;
};

/**
 * MessageBar Props
 */
export type MessageBarProps = ComponentProps<MessageBarSlots> &
  Pick<MessageBarContextValue, 'layout'> & {
    intent?: 'info' | 'success' | 'warning' | 'error';
  };

/**
 * State used in rendering MessageBar
 */
export type MessageBarState = ComponentState<MessageBarSlots> & Required<Pick<MessageBarProps, 'layout' | 'intent'>>;
