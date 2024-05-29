import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ButtonContextValue } from '@fluentui/react-button';
import type { MessageBarContextValue } from '../../contexts/messageBarContext';

export type MessageBarActionsSlots = {
  root: Slot<'div'>;
  /**
   * Generally the 'Dismiss' button for the MessageBar
   */
  containerAction?: Slot<'div'>;
};

export type MessageBarActionsContextValues = {
  button: ButtonContextValue;
};

/**
 * MessageBarActions Props
 */
export type MessageBarActionsProps = ComponentProps<MessageBarActionsSlots>;

/**
 * State used in rendering MessageBarActions
 */
export type MessageBarActionsState = ComponentState<MessageBarActionsSlots> &
  Pick<Required<MessageBarContextValue>, 'layout'> & {
    /**
     * Whether there are actions as children of this component
     */
    hasActions: boolean;
  };
