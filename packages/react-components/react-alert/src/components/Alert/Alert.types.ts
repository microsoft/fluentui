import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
// import { Avatar } from '@fluentui/react-avatar';
import { Button } from '@fluentui/react-button';

export type AlertSlots = {
  root: NonNullable<Slot<'div'>>;
  icon?: Slot<'span'>;
  content: NonNullable<Slot<'span'>>;
  action?: Slot<typeof Button>;
};

type AlertCommons = {
  /**
   * The intent for the alert
   */
  // intent?: 'info' | 'success' | 'error' | 'warning' | 'infoAvatar';
  intent?: 'info' | 'success' | 'error' | 'warning';

  // /**
  //  * Determines if the user can dimiss the alert using a close button
  //  */
  // dismissible?: boolean;
};

/**
 * Alert Props
 */
export type AlertProps = ComponentProps<AlertSlots> &
  AlertCommons & {
    /**
     * Callback for when the alert is shown/hidden
     */
    // onVisibleChange?: () => void;
    /**
     * The avatar component to render when intent is infoAvatar
     */
    // avatar?: typeof Avatar;
  };

/**
 * State used in rendering Alert
 */
export type AlertState = ComponentState<AlertSlots>;
