import * as React from 'react';
import type { ComponentStateCompat, ShorthandPropsCompat } from '@fluentui/react-utilities';
import type {
  ButtonDefaultedProps,
  ButtonProps,
  ButtonShorthandPropsCompat,
  ButtonState,
} from '../Button/Button.types';

export type CompoundButtonProps = ButtonProps & {
  /**
   * Second line of text that describes the action this button takes.
   */
  secondaryContent?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * Container that wraps the children and secondaryContent slots.
   */
  contentContainer?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;
};

export type CompoundButtonShorthandPropsCompat = ButtonShorthandPropsCompat | 'contentContainer' | 'secondaryContent';

export type CompoundButtonDefaultedProps = ButtonDefaultedProps | 'contentContainer' | 'secondaryContent';

export type CompoundButtonState = ButtonState &
  ComponentStateCompat<CompoundButtonProps, CompoundButtonShorthandPropsCompat, CompoundButtonDefaultedProps>;
