import * as React from 'react';
import { ComponentState, ShorthandProps } from '@fluentui/react-utilities';
import { ButtonDefaultedProps, ButtonProps, ButtonShorthandProps, ButtonState } from '../Button/Button.types';

/**
 * {@docCategory Button}
 */
export interface CompoundButtonProps extends ButtonProps {
  /**
   * Second line of text that describes the action this button takes.
   */
  secondaryContent?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;

  /**
   * Container that wraps the children and secondaryContent slots.
   */
  contentContainer?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;
}

/**
 * {@docCategory Button}
 */
export type CompoundButtonShorthandProps = ButtonShorthandProps | 'contentContainer' | 'secondaryContent';

/**
 * {@docCategory Button}
 */
export type CompoundButtonDefaultedProps = ButtonDefaultedProps | 'contentContainer' | 'secondaryContent';

/**
 * {@docCategory Button}
 */
export interface CompoundButtonState
  extends ButtonState,
    ComponentState<CompoundButtonProps, CompoundButtonShorthandProps, CompoundButtonDefaultedProps> {}
