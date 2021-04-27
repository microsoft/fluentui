import { ButtonProps, ButtonState, ButtonStyleSelectors, ButtonTokens, ButtonVariants } from '../Button/Button.types';

/**
 * {@docCategory Button}
 */
export interface ToggleButtonProps extends ButtonProps {
  /**
   * Defines the controlled checked state of the `ToggleButton`.
   * Mutually exclusive to `defaultChecked`.
   * This should only be used if the checked state is to be controlled at a higher level and there is a plan to pass the
   * correct value based on handling `onClick` events and re-rendering.
   * @default false
   */
  checked?: boolean;

  /**
   * Defines whether the `ToggleButton` is inititally in a checked state or not when rendered.
   * Mutually exclusive to `checked`.
   * @default false
   */
  defaultChecked?: boolean;
}

/**
 * {@docCategory Button}
 */
export interface ToggleButtonState extends Omit<ToggleButtonProps, 'children' | 'icon'>, ButtonState {}

/**
 * {@docCategory Button}
 */
export type ToggleButtonStyleSelectors = ButtonStyleSelectors & { checked?: boolean };

/**
 * {@docCategory Button}
 */
export type ToggleButtonTokens = ButtonTokens;

/**
 * {@docCategory Button}
 */
export type ToggleButtonVariants =
  | ButtonVariants
  | 'checked'
  | 'checkedPrimary'
  | 'checkedSubtle'
  | 'checkedTransparent';

/**
 * {@docCategory Button}
 */
export type ToggleButtonVariantTokens = Partial<
  {
    [variant in ToggleButtonVariants]: Partial<ToggleButtonTokens>;
  }
>;
