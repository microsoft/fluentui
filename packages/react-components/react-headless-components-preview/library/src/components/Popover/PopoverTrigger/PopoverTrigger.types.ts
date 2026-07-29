import type * as React from 'react';
import type { ARIAButtonType } from '@fluentui/react-aria';
import type { TriggerProps } from '@fluentui/react-utilities';
import type { PopoverTriggerChildProps as CanonicalPopoverTriggerChildProps } from '@fluentui/react-popover';

type HeadlessPopoverTriggerChildExtras = {
  'aria-haspopup'?: 'true';
  'aria-details'?: string;
  'data-open'?: string;
};

/**
 * Props that are merged onto the child of the PopoverTrigger when cloned.
 * Composes canonical {@link CanonicalPopoverTriggerChildProps} with the headless-specific extras.
 */
export type PopoverTriggerChildProps<Type extends ARIAButtonType = ARIAButtonType> = CanonicalPopoverTriggerChildProps<
  Type,
  HeadlessPopoverTriggerChildExtras
>;

/**
 * PopoverTrigger Props
 */
export type PopoverTriggerProps = Omit<TriggerProps<PopoverTriggerChildProps>, 'children'> & {
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
