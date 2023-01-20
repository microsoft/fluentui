import { ARIAButtonResultProps, ARIAButtonType } from '@fluentui/react-aria';
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
export type PopoverTriggerChildProps<Type extends ARIAButtonType = ARIAButtonType, Props = {}> = ARIAButtonResultProps<
  Type,
  Props & {
    'aria-expanded'?: 'true' | 'false';
    ref: React.Ref<unknown>;
    onMouseEnter: React.MouseEventHandler<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>;
    onMouseLeave: React.MouseEventHandler<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>;
    onContextMenu: React.MouseEventHandler<HTMLButtonElement & HTMLAnchorElement & HTMLDivElement>;
  }
>;
