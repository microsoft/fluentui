import * as React from 'react';
import { ComponentStateCompat, ShorthandPropsCompat } from '@fluentui/react-utilities';
import { ButtonDefaultedProps, ButtonProps, ButtonShorthandPropsCompat, ButtonState } from '../Button/Button.types';

/**
 * {@docCategory Button}
 */
export interface CompoundButtonProps extends ButtonProps {
  /**
   * Second line of text that describes the action this button takes.
   */
  secondaryContent?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * Container that wraps the children and secondaryContent slots.
   */
  contentContainer?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;
}

/**
 * {@docCategory Button}
 */
export type CompoundButtonShorthandPropsCompat = ButtonShorthandPropsCompat | 'contentContainer' | 'secondaryContent';

/**
 * {@docCategory Button}
 */
export type CompoundButtonDefaultedProps = ButtonDefaultedProps | 'contentContainer' | 'secondaryContent';

/**
 * {@docCategory Button}
 */
export interface CompoundButtonState
  extends ButtonState,
    ComponentStateCompat<CompoundButtonProps, CompoundButtonShorthandPropsCompat, CompoundButtonDefaultedProps> {}
