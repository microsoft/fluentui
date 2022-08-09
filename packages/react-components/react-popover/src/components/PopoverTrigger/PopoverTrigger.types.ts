import { ARIAButtonResultProps, ARIAButtonType } from '@fluentui/react-aria';
import * as React from 'react';

/**
 * PopoverTrigger Props
 */
export type PopoverTriggerProps = {
  children:
    | (React.ReactElement & { ref?: React.Ref<unknown> })
    | ((props: PopoverTriggerChildProps) => React.ReactElement | null);
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
    onClick: React.MouseEventHandler;
    onKeyDown: React.KeyboardEventHandler;
    onMouseEnter: React.MouseEventHandler;
    onMouseLeave: React.MouseEventHandler;
    onContextMenu: React.MouseEventHandler;
  }
>;
