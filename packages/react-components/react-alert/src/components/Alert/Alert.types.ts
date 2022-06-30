import { Avatar } from '@fluentui/react-avatar';
import { Button } from '@fluentui/react-button';

import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type AlertSlots = {
  /**
   * The root slot is the top level container for the alert component
   */
  root: NonNullable<Slot<'div'>>;
  /**
   * The icon slot renders the icon determined by the `icon` or `intent` prop
   */
  icon?: Slot<'span'>;
  /**
   * The action slot renders a button that prompts the user to take action on the alert
   */
  action?: Slot<typeof Button>;
  /**
   * The avatar slot renders the Avatar component passed in as a prop
   */
  avatar?: Slot<typeof Avatar>;
};

/**
 * Alert Props
 */
export type AlertProps = ComponentProps<AlertSlots> & {
  /**
   * The intent prop, if present, determines the icon to be rendered in the icon slot. The icon prop
   * overrides the intent prop
   */
  intent?: 'info' | 'success' | 'error' | 'warning';
  /**
   * The appearance of the Alert.
   * @default 'primary'
   */
  appearance?: 'primary' | 'inverted';
};

/**
 * State used in rendering Alert
 */
export type AlertState = ComponentState<AlertSlots> & Pick<AlertProps, 'appearance' | 'intent'>;
