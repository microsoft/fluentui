import { ShorthandProps } from '@fluentui/react-utils';
import { ButtonProps, ButtonState, ButtonTokens, ButtonVariants } from '../Button/Button.types';

/**
 * {@docCategory Button}
 */
export interface CompoundButtonProps extends ButtonProps {
  /**
   * Second line of text that describes the action this button takes.
   */
  secondaryContent?: ShorthandProps;

  /**
   * Container that wraps the children and secondaryContent slots.
   */
  contentContainer?: ShorthandProps;
}

/**
 * {@docCategory Button}
 */
export interface CompoundButtonState extends CompoundButtonProps, ButtonState {}

/**
 * {@docCategory Button}
 */
export type CompoundButtonTokens = ButtonTokens & {
  secondaryContentColor?: string;
  secondaryContentFontSize?: string;
  secondaryContentFontWeight?: string;
  secondaryContentGap?: string;
};

/**
 * {@docCategory Button}
 */
export type CompoundButtonVariants = ButtonVariants<CompoundButtonTokens>;
