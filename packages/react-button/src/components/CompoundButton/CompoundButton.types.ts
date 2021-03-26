import * as React from 'react';
import { ObjectShorthandProps, ShorthandProps } from '@fluentui/react-utilities';
import { ButtonProps, ButtonState, ButtonStyleSelectors, ButtonTokens, ButtonVariants } from '../Button/Button.types';

/**
 * {@docCategory Button}
 */
export interface CompoundButtonProps extends ButtonProps {
  /**
   * Second line of text that describes the action this button takes.
   */
  secondaryContent?: ShorthandProps<React.HTMLAttributes<HTMLSpanElement>>;

  /**
   * Container that wraps the children and secondaryContent slots.
   */
  contentContainer?: ShorthandProps<React.HTMLAttributes<HTMLSpanElement>>;
}

/**
 * {@docCategory Button}
 */
export interface CompoundButtonState extends Omit<CompoundButtonProps, 'children' | 'icon'>, ButtonState {
  contentContainer?: ObjectShorthandProps<React.HTMLAttributes<HTMLSpanElement>>;
  secondaryContent?: ObjectShorthandProps<React.HTMLAttributes<HTMLSpanElement>>;
}

/**
 * {@docCategory Button}
 */
export type CompoundButtonStyleSelectors = ButtonStyleSelectors;

type CompoundButtonBaseTokens = {
  secondaryContentColor: string;
  secondaryContentFontSize: string;
  secondaryContentFontWeight: string | number;
  secondaryContentGap: string;
};

/**
 * {@docCategory Button}
 */
export type CompoundButtonTokens = ButtonTokens &
  CompoundButtonBaseTokens & {
    hovered: Partial<CompoundButtonBaseTokens>;
    pressed: Partial<CompoundButtonBaseTokens>;
  };

/**
 * {@docCategory Button}
 */
export type CompoundButtonVariants = ButtonVariants;

/**
 * {@docCategory Button}
 */
export type CompoundButtonVariantTokens = Partial<
  {
    [variant in CompoundButtonVariants]: Partial<CompoundButtonTokens>;
  }
>;
