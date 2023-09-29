import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { MessageBarContextValue } from '../../contexts/messageBarContext';

export type MessageBarActionsSlots = {
  root: Slot<'div'>;
  containerAction?: Slot<'div'>;
};

/**
 * MessageBarActions Props
 */
export type MessageBarActionsProps = ComponentProps<MessageBarActionsSlots> & {};

/**
 * State used in rendering MessageBarActions
 */
export type MessageBarActionsState = ComponentState<MessageBarActionsSlots> &
  Pick<Required<MessageBarContextValue>, 'layout'>;
