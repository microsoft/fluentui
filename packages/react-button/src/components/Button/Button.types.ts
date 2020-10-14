import * as React from 'react';
import { ComponentProps, ShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { ColorTokens, RecursivePartial, SizeValue, FontTokens } from '@fluentui/theme';

export type ButtonProps = ComponentProps &
  React.HTMLAttributes<HTMLElement> & {
    /**
     * Shorthand icon. A shorthand prop can be a literal, object, or
     * JSX. The `children` prop of the object can be a render function,
     * taking in the original slot component and props.
     */
    icon?: ShorthandProps;

    /**
     * Shorthand loader content within the button.
     */
    loader?: ShorthandProps;

    /**
     * Shorthand children content within the button.
     */
    content?: ShorthandProps;

    /**
     * Defines the href to navigate to. If applied, will render the button as an anchor
     * element by default, unless `as` specifies otherwise. Note that specifying an href
     * and a non-anchor as the render type will prevent the Button from behaving like a
     * hyperlink and opening the href on click.
     */
    href?: string;

    /**
     * Defines the target window to open the href in. Only is applied if the button renders
     * as an anchor tag, which is the default behavior if href is provided.
     */
    target?: string;

    /** A button can appear circular. */
    circular?: boolean;

    /** A button can show that it cannot be interacted with. */
    disabled?: boolean;

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

    /**
     * Called after a user clicks the button.
     * @param event - React's original SyntheticEvent.
     * @param data - All props.
     */
    // onClick?: ComponentEventHandler<ButtonProps>;

    /**
     * Called after a user focuses the button.
     * @param event - React's original SyntheticEvent.
     * @param data - All props.
     */
    // onFocus?: ComponentEventHandler<ButtonProps>;

    /** A button can emphasize that it represents the primary action. */
    primary?: boolean;

    /** A button can emphasize that it represents an alternative action. */
    secondary?: boolean;

    /** A button can blend into its background to become less emphasized. */
    ghost?: boolean;

    /** A button can have no background styling and just be emphasized through its content styling. */
    transparent?: boolean;

    /** A button can be sized. */
    size?: SizeValue;

    // TODO: Deprecate or rename to textOnly for alignment with iconOnly?
    /** A button can be formatted to show only text in order to indicate a less-pronounced action. */
    // text?: boolean;

    tokens?: RecursivePartial<ButtonTokens>;
  };

export interface ButtonState extends ButtonProps {
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

export type ButtonTokens = ColorTokens &
  FontTokens & {
    /* sizing */
    paddingLeft?: string;
    paddingRight?: string;
    paddingTop?: string;
    paddingBottom?: string;
    margin?: string;
    height?: string;
    minWidth?: string;
    maxWidth?: string;
    minHeight?: string;
    contentGap?: string;
    iconSize?: string;
    borderRadius?: string;
    borderTopLeftRadius?: string;
    borderTopRightRadius?: string;
    borderBottomLeftRadius?: string;
    borderBottomRightRadius?: string;
    borderWidth?: string;
    boxShadow?: string;
    width?: string;

    transform?: string;
    transition?: string;

    size?: {
      smallest?: string;
      smaller?: string;
      small?: string;
      regular?: string;
      large?: string;
      larger?: string;
      largest?: string;
    };

    pressed?: {
      transform?: string;
      transition?: string;
    };
  };

export type ButtonVariants<TTokens = ButtonTokens> = {
  base?: TTokens;
  primary?: TTokens;
  iconOnly?: TTokens;
  circular?: TTokens;
  block?: TTokens;
};
