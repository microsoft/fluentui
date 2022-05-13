import { Button } from '@fluentui/react-button';

import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type AlertSlots = {
  /**
   * The root slot is the container for the alert component
   */
  root: NonNullable<Slot<'div'>>;
  /**
   * The icon slot renders the icon determined by the `icon` or `intent` prop
   */
  icon?: Slot<'span'>;
  /**
   * The content slot renders the text message in the alert component
   */
  content: NonNullable<Slot<'span'>>;
  /**
   * The action slot renders a button that prompts the user to take action on the alert
   */
  action?: Slot<typeof Button>;
};

/**
 * Alert Props
 */
export type AlertProps = ComponentProps<AlertSlots> & {
  /**
   * The intent prop, if present, determines the icon to be rendered in the icon slot. It
   * overrides the value of the icon prop
   */
  intent?: 'info' | 'success' | 'error' | 'warning';
};

/**
 * State used in rendering Alert
 */
export type AlertState = ComponentState<AlertSlots> & Pick<AlertProps, 'intent'>;
