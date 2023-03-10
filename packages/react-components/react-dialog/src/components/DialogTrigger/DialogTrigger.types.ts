import { ARIAButtonResultProps, ARIAButtonType } from '@fluentui/react-aria';
import type { TriggerProps } from '@fluentui/react-utilities';
import * as React from 'react';

export type DialogTriggerAction = 'open' | 'close';

export type DialogTriggerProps = TriggerProps<DialogTriggerChildProps> & {
  /**
   * Explicitly declare if the trigger is responsible for opening or
   * closing a Dialog visibility state.
   *
   * If `DialogTrigger` is outside `DialogSurface` then it'll be `open` by default
   *
   * If `DialogTrigger` is inside `DialogSurface` then it'll be `close` by default
   */
  action?: DialogTriggerAction;
  /**
   * Disables internal trigger mechanism that ensures a child provided will be a compliant ARIA button.
   * @default false
   */
  disableButtonEnhancement?: boolean;
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
