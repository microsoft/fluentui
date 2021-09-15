import type { ComponentProps, IntrinsicShorthandProps, ComponentState } from '@fluentui/react-utilities';
import { ARIAButtonShorthandProps } from '@fluentui/react-aria';

export type ButtonSlots = {
  root: ARIAButtonShorthandProps;
  icon?: IntrinsicShorthandProps<'span'>;
};

export interface ButtonCommons {
  // /**
  //  * Loader slot that, if specified, renders a `loader` before the `icon` and `children` while the `loading` flag
  //  * is set to `true`.
  //  */
  // loader?: ShorthandPropsCompat<React.HTMLAttributes<HTMLSpanElement>>;

  /**
   * A button can fill the width of its container.
   * @default false
   */
  block: boolean;

  /**
   * A button can have completely rounded corners.
   * @default false
   */
  circular: boolean;

  /**
   * When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it
   * is important to keep a consistent tab order for screen reader and keyboard users. The primary example of this
   * pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons.
   * @default false
   */
  disabledFocusable: boolean;

  /**
   * A button can format its icon to appear before or after its content.
   * @default 'before'
   */
  iconPosition: 'before' | 'after';

  // /**
  //  * A button can show a loading indicator if it is waiting for another action to happen before allowing itself to
  //  * be interacted with.
  //  * @default false
  //  */
  // loading?: boolean;

  /**
   * A button can be styled such that it has no background styling and is just emphasized through the styling of
   * its content and borders.
   * Mutually exclusive with `primary`, `subtle` and `transparent`.
   * @default false
   */
  outline: boolean;

  /**
   * A button can be styled to emphasize that it represents the primary action.
   * Mutually exclusive with `outline`, `subtle` and `transparent`.
   * @default false
   */
  primary: boolean;

  /**
   * A button supports different sizes.
   * @default 'medium'
   */
  size: 'small' | 'medium' | 'large';

  /**
   * A button can be styled to blend into its background and become less emphasized.
   * @default false
   * Mutually exclusive with `outline`, `primary` and `transparent`.
   */
  subtle: boolean;

  /**
   * A button can be styled such that it has no background or border styling and is just emphasized through its
   * content styling.
   * Mutually exclusive with `outline`, `primary` and `subtle`.
   * @default false
   */
  transparent: boolean;
}

export type ButtonProps = ComponentProps<ButtonSlots> &
  Partial<ButtonCommons> & {
    disabled?: boolean;
  };

export interface ButtonState extends ComponentState<ButtonSlots>, ButtonCommons {
  /**
   * A button can contain only an icon.
   * @default false
   */
  iconOnly: boolean;
}
