import { ARIAButtonType } from '@fluentui/react-aria';
import type { TriggerProps } from '@fluentui/react-utilities';
import * as React from 'react';

/**
 * PopoverTrigger Props
 */
export type PopoverTriggerProps = TriggerProps<PopoverTriggerChildProps> & {
  /**
   * Disables internal trigger mechanism that ensures a child provided will be a compliant ARIA button.
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

/**
 * Props that are passed to the child of the DialogTrigger when cloned to ensure correct behaviour for the Dialog
 */
export type PopoverTriggerChildProps<Type extends ARIAButtonType = ARIAButtonType, Props = {}> = {
  'aria-expanded'?: 'true' | 'false';
  ref: React.Ref<HTMLElement>;
  /* eslint-disable @nx/workspace-consistent-callback-type -- can't change type of existing callback */
  onMouseEnter: React.MouseEventHandler<HTMLElement>;
  onMouseLeave: React.MouseEventHandler<HTMLElement>;
  onContextMenu: React.MouseEventHandler<HTMLElement>;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  /* eslint-enable @nx/workspace-consistent-callback-type */
};
