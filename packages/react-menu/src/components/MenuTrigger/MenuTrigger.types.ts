import * as React from 'react';

/**
 * {@docCategory MenuTrigger }
 */
export interface MenuTriggerProps {
  /**
   * Explicitly require single child
   */
  children: React.ReactElement;
}

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
