import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
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
};

/**
 * Alert Props
 */
export type AlertProps = ComponentProps<AlertSlots> & AlertCommons;

/**
 * State used in rendering Alert
 */
export type AlertState = ComponentState<AlertSlots> & AlertCommons;
