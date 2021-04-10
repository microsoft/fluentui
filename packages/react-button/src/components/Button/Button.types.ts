import * as React from 'react';
import { ComponentProps, ShorthandProps } from '@fluentui/react-utilities';
import { ObjectShorthandProps } from '@fluentui/react-utilities';

/**
 * {@docCategory Button}
 */
export type ButtonProps = ComponentProps &
  React.ButtonHTMLAttributes<HTMLElement> & {
    /**
     * Icon slot that, if specified, renders an icon either before or after the `children` as specified by the
     * `iconPosition` prop.
     */
    icon?: ShorthandProps<React.HTMLAttributes<HTMLSpanElement>>;

    // /**
    //  * Loader slot that, if specified, renders a `loader` before the `icon` and `children` while the `loading` flag
    //  * is set to `true`.
    //  */
    // loader?: ShorthandProps<React.HTMLAttributes<HTMLSpanElement>>;

    // /**
    //  * A button can fill the width of its container.
    //  * @default false
    //  */
    // block?: boolean;

    // /**
    //  * A button can have completely rounded corners.
    //  * @default false
    //  */
    // circular?: boolean;

    /**
     * A button can show that it cannot be interacted with.
     * @default false
     */
    disabled?: boolean;

    // /**
    //  * When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it
    //  * is important to keep a consistent tab order for screen reader and keyboard users.
    //  * @default false
    //  */
    // disabledFocusable?: boolean;

    /**
     * A button can contain only an icon.
     * @default false
     */
    iconOnly?: boolean;

    /**
     * A button can format its icon to appear before or after its content.
     * @default 'before'
     */
    iconPosition?: 'before' | 'after';

    // /**
    //  * A button can show a loading indicator if it is waiting for another action to happen before allowing itself to
    //  * be interacted with.
    //  * @default false
    //  */
    // loading?: boolean;

    // /**
    //  * A button can be styled such that it has no background styling and is just emphasized through the styling of
    //  * its content and borders.
    //  * Mutually exclusive with `primary`, `subtle` and `transparent`.
    //  * @default false
    //  */
    // outline?: boolean;

    /**
     * A button can be styled to emphasize that it represents the primary action.
     * Mutually exclusive with `outline`, `subtle` and `transparent`.
     * @default false
     */
    primary?: boolean;

    /**
     * A button supports different sizes.
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';

    /**
     * A button can be styled to blend into its background and become less emphasized.
     * @default false
     * Mutually exclusive with `outline`, `primary` and `transparent`.
     */
    subtle?: boolean;

    /**
     * A button can be styled such that it has no background or border styling and is just emphasized through its
     * content styling.
     * Mutually exclusive with `outline`, `primary` and `subtle`.
     * @default false
     */
    transparent?: boolean;
  };

/**
 * {@docCategory Button}
 */
export interface ButtonState extends ButtonProps {
  ref: React.Ref<HTMLElement>;

  icon?: ObjectShorthandProps<React.HTMLAttributes<HTMLSpanElement>>;
  children?: ObjectShorthandProps<React.HTMLAttributes<HTMLSpanElement>>;
}

/**
 * {@docCategory Button}
 */
export type ButtonStyleSelectors = {
  disabled?: boolean;
  iconOnly?: boolean;
  primary?: boolean;
  size?: string;
  subtle?: boolean;
  transparent?: boolean;
};

/**
 * {@docCategory Button}
 */
export type ButtonTokens = {
  height: string;
  maxWidth: string;
  minWidth: string;
  paddingX: string;
  paddingY: string;

  fontSize: string;
  fontWeight: number;
  lineHeight: string;

  iconFontSize: string;
  iconHeight: string;
  iconSpacing: string;
  iconWidth: string;

  background: string;
  color: string;

  borderColor: string;
  borderRadius: string;
  borderWidth: string;

  shadow: string;

  hovered: Partial<{
    background: string;
    borderColor: string;
    color: string;
    shadow: string;
  }>;

  pressed: Partial<{
    background: string;
    borderColor: string;
    color: string;
    shadow: string;
  }>;
};

/**
 * {@docCategory Button}
 */
export type ButtonVariants =
  | 'base'
  | 'disabled'
  | 'iconOnly'
  | 'primary'
  | 'subtle'
  | 'transparent'
  | 'small'
  | 'large'
  // TODO: get rid of these combinations, use individual variants in matchers
  | 'disabledPrimary'
  | 'disabledSubtle'
  | 'disabledTransparent'
  | 'iconOnlySmall'
  | 'iconOnlyLarge';

/**
 * {@docCategory Button}
 */
export type ButtonVariantTokens = {
  [variant in ButtonVariants]: Partial<ButtonTokens>;
};
