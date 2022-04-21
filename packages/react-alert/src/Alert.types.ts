import * as React from 'react';
import type { ComponentProps, Slot } from '@fluentui/react-utilities';

export type AlertSlots = {
  root: NonNullable<Slot<'div'>>;
  icon: NonNullable<Slot<'span'>>;
  content: NonNullable<Slot<'span'>>;
  action: NonNullable<Slot<'button'>>;
};

/**
    Props
      - Content
      - Dismissible
      - onVisibleChange
      - Intent
      - Action
      - Avatar
    Slots
      - Icon
      - Content
      - action
 */

/**
 * Alert Props
 */
export type AlertProps = {
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
   * Callback for when the alert is shown/hidden
   */
  onVisibleChange?: () => void;

  /**
   * TODO - Should we just accept a button here? Or create a button using this
   * prop value?
   */
  action?: string;

  /**
   * TODO - How do I add the type for this prop to "Avatar" type
   */
  avatar?: string;
};
