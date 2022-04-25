import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Avatar } from '@fluentui/react-avatar';

export type AlertSlots = {
  root: NonNullable<Slot<'div'>>;
  icon: NonNullable<Slot<'span'>>;
  content: NonNullable<Slot<'span'>>;
  action: NonNullable<Slot<'span'>>;
};

type AlertCommons = {
  /**
   * The intent for the alert
   */
  intent?: 'info' | 'success' | 'error' | 'warning' | 'infoAvatar';

  /**
   * The text string to be displayed in the alert
   */
  content?: string;

  /**
   * Determines if the user can dimiss the alert using a close button
   */
  dismissible?: boolean;

  /**
   * TODO - Should we just accept a button here? Or create a button using this
   * prop value?
   */
  action?: string;
};

/**
 * Alert Props
 */
export type AlertProps = ComponentProps<AlertSlots> &
  AlertCommons & {
    /**
     * Callback for when the alert is shown/hidden
     */
    onVisibleChange?: () => void;

    /**
     * The avatar component to render when intent is infoAvatar
     */
    avatar?: typeof Avatar;
  };

/**
 * State used in rendering Alert
 */
export type AlertState = ComponentState<AlertSlots> & AlertCommons;
