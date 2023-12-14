import type { ButtonProps, ButtonSlots, ButtonState } from '@fluentui/react-button';

/*
 * These buttons are the same as a default fluent v9 button
 * with overridden style/functionality based on Teaching Context
 */
export type TeachingPopoverButtonSlots = ButtonSlots;

export type TeachingPopoverButtonType = 'primary' | 'secondary';

export type TeachingPopoverButtonProps = ButtonProps & {
  /*
   * Button type, compulsory to be provided by user.
   */
  buttonType: TeachingPopoverButtonType;

  /*
   * Optional text shown when a primary button is on it's final step
   * OR when a secondary button is on it's first step
   */
  altStepText?: string;
};

export type TeachingPopoverButtonState = ButtonState &
  Required<
    Pick<
      TeachingPopoverButtonProps,
      'buttonType' | 'appearance' | 'disabledFocusable' | 'disabled' | 'iconPosition' | 'shape' | 'size'
    >
  >;
