import * as React from 'react';
import { ComponentProps, ObjectShorthandProps } from '@fluentui/react-utilities';
import { SizeValue } from '@fluentui/react-theme-provider/lib/compat/index';

export type ButtonProps = ComponentProps &
  React.ButtonHTMLAttributes<HTMLElement> & {
    /**
     * Shorthand icon. A shorthand prop can be a literal, object, or
     * JSX. The `children` prop of the object can be a render function,
     * taking in the original slot component and props.
     */
    icon?: ObjectShorthandProps;

    /** A button can appear circular. */
    circular?: boolean;

    /** A button can show that it cannot be interacted with. */
    disabled?: boolean;

    /**
     * When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it is
     * important to keep a consistent tab order for screen reader and keyboard users.
     * @defaultvalue false
     */
    disabledFocusable?: boolean;

    // TODO: remove unsupported props, all of them
    /** A button can fill the width of its container. */
    block?: boolean;

    /** A button can contain only an icon. */
    iconOnly?: boolean;

    /** An icon button can format its icon to appear before or after its content. */
    iconPosition?: 'before' | 'after';

    /** A button that inherits its background and has a subtle appearance. */
    inverted?: boolean;

    /** Opt in to a named variant which can be supplied by a theme. */
    variant?: string;

    /** A button can show a loading indicator. */
    loading?: boolean;

    /** A button can emphasize that it represents the primary action. */
    primary?: boolean;

    /** A button can emphasize that it represents an alternative action. */
    secondary?: boolean;

    /** A button can blend into its background to become less emphasized. */
    subtle?: boolean;

    /** A button can have no background styling and just be emphasized through its content styling. */
    transparent?: boolean;

    /** A button can be sized. */
    size?: SizeValue;
  };

/**
 * {@docCategory Button}
 */
export interface ButtonState extends ButtonProps {
  ref: React.RefObject<HTMLButtonElement>;

  children?: ObjectShorthandProps;
}

export type ButtonStyleSelectors = {
  iconOnly?: boolean;
  primary?: boolean;
  size?: string;
  textOnly?: boolean;
  textWithIcon?: boolean;
};

export type ButtonVariants =
  | 'base'
  | 'disabled'
  | 'iconOnly'
  | 'primary'
  | 'small'
  | 'large'
  // TODO: get rid of these combinations, use individual variants in matchers
  | 'primaryDisabled'
  | 'iconOnlySmall'
  | 'iconOnlyLarge';

export type ButtonTokens = {
  // TODO: these are not in the global/alias theme currently
  height: string;
  paddingX: string;
  paddingY: string;
  minWidth: string;
  maxWidth: string;

  fontSize: string;
  fontWeight: number;
  lineHeight: string;

  // TODO: what do we want to do with tokens for slots, just prefix them with slot name?
  iconWidth: string;
  iconHeight: string;
  iconSpacing: string;

  color: string;
  content2Color: string;

  background: string;
  backgroundHover: string;
  backgroundPressed: string;
  backgroundActive: string;

  borderColor: string;
  borderColorHover: string;
  borderColorActive: string;
  borderWidth: string;
  borderRadius: string;

  shadow: string;
  shadowPressed: string;
};

export type ButtonVariantTokens = {
  [variant in ButtonVariants]: Partial<ButtonTokens>;
};
