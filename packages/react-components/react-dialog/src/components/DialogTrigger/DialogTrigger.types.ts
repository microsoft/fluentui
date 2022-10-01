import { ARIAButtonResultProps, ARIAButtonType } from '@fluentui/react-aria';
import type { TriggerProps } from '@fluentui/react-utilities';
import * as React from 'react';

export type DialogTriggerAction = 'open' | 'close';

export type DialogTriggerProps = TriggerProps<DialogTriggerChildProps> & {
  /**
   * Explicitly declare if the trigger is responsible for opening or
   * closing a Dialog visibility state.
   * @default 'open' // if it's outside DialogSurface
   * @default 'close' // if it's inside DialogSurface
   */
  action?: DialogTriggerAction;
};

/**
 * Props that are passed to the child of the DialogTrigger when cloned to ensure correct behaviour for the Dialog
 */
export type DialogTriggerChildProps<Type extends ARIAButtonType = ARIAButtonType, Props = {}> = ARIAButtonResultProps<
  Type,
  Props & {
    'aria-haspopup'?: 'dialog';
  }
>;

export type DialogTriggerState = {
  children: React.ReactElement | null;
};
