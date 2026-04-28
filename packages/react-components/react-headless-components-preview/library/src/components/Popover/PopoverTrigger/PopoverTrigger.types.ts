import type * as React from 'react';

/**
 * PopoverTrigger Props
 */
export type PopoverTriggerProps = {
  children: React.ReactElement;
  /**
   * Disable ARIA button enhancement on the trigger.
   * @default false
   */
  disableButtonEnhancement?: boolean;
};

/**
 * PopoverTrigger State
 */
export type PopoverTriggerState = {
  children: React.ReactElement | null;
};
