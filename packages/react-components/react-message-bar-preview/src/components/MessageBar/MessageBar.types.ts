import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { MotionState } from '@fluentui/react-motion-preview';
import type { MessageBarContextValue } from '../../contexts/messageBarContext';

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
    visible?: boolean;
    animate?: 'exit-only' | 'both';
    onDismiss?: () => void;
  };

/**
 * State used in rendering MessageBar
 */
export type MessageBarState = ComponentState<MessageBarSlots> &
  Required<Pick<MessageBarProps, 'layout' | 'intent' | 'animate'>> & {
    motionState: MotionState;
  };
