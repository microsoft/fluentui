import { ARIAButtonResultProps, ARIAButtonType } from '@fluentui/react-aria';
import type { TriggerProps } from '@fluentui/react-utilities';
import * as React from 'react';

export type ToastTriggerProps = TriggerProps<ToastTriggerChildProps> & {
  /**
   * Disables internal trigger mechanism that ensures a child provided will be a compliant ARIA button.
   * @default false
   */
  disableButtonEnhancement?: boolean;
};

/**
 * Props that are passed to the child of the ToastTrigger when cloned to ensure correct behaviour for the Toast
 */
export type ToastTriggerChildProps<Type extends ARIAButtonType = ARIAButtonType, Props = {}> = ARIAButtonResultProps<
  Type,
  Props
>;

export type ToastTriggerState = {
  children: React.ReactElement | null;
};
