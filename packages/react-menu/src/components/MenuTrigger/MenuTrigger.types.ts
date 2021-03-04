import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';

/**
 * {@docCategory MenuTrigger }
 */
export interface MenuTriggerProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {}

/**
 * {@docCategory MenuTrigger }
 */
export interface MenuTriggerState extends MenuTriggerProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;

  /**
   * Opens the popup
   */
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
