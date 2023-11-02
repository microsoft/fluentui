import type { ButtonProps, ButtonSlots, ButtonState } from '@fluentui/react-button';

/*
 * These buttons are the same as a default fluent v9 button
 * with overridden style/functionality based on Teaching Context
 */
export type TeachingBubbleButtonSlots = ButtonSlots;

export type TeachingBubbleButtonType = 'primary' | 'secondary';

export type TeachingBubbleButtonProps = ButtonProps & {
  /*
   * Button type, compulsory to be provided by user.
   */
  buttonType: TeachingBubbleButtonType;

  /*
   * Text shown when a primary button is on it's final step
   * OR when a secondary button is on it's first step
   */
  altStepText: string;
};

export type TeachingBubbleButtonState = ButtonState &
  Required<
    Pick<
      TeachingBubbleButtonProps,
      'buttonType' | 'appearance' | 'disabledFocusable' | 'disabled' | 'iconPosition' | 'shape' | 'size'
    >
  >;
