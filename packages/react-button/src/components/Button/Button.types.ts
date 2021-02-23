import * as React from 'react';
import { ComponentProps, ShorthandProps } from '@fluentui/react-utilities';
import { SizeValue } from '@fluentui/react-theme-provider/lib/compat/index';
import { ObjectShorthandProps } from '@fluentui/react-utilities';

export type ButtonProps = ComponentProps &
  React.ButtonHTMLAttributes<HTMLElement> & {
    /**
     * Shorthand icon. A shorthand prop can be a literal, object, or
     * JSX. The `children` prop of the object can be a render function,
     * taking in the original slot component and props.
     */
    icon?: ShorthandProps<React.HTMLAttributes<HTMLSpanElement>>;

    // TODO: children needs a new typing to handle render functions along with hook updates for children functionality
    // children?: ???;

    // /** A button can appear circular. */
    // circular?: boolean;

    /** A button can show that it cannot be interacted with. */
    disabled?: boolean;

    // /**
    // eslint-disable-next-line @fluentui/max-len
    //  * When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it is
    //  * important to keep a consistent tab order for screen reader and keyboard users.
    //  * @defaultvalue false
    //  */
    // disabledFocusable?: boolean;

    // /** A button can fill the width of its container. */
    // block?: boolean;

    /** A button can contain only an icon. */
    iconOnly?: boolean;

    /** An icon button can format its icon to appear before or after its content. */
    iconPosition?: 'before' | 'after';

    // /** A button can show a loading indicator. */
    // loading?: boolean;

    /** A button can emphasize that it represents the primary action. */
    primary?: boolean;

    // /** A button can blend into its background to become less emphasized. */
    // subtle?: boolean;

    // /** A button can have no background styling and just be emphasized through its content styling. */
    // transparent?: boolean;

    /** A button can be sized. */
    size?: SizeValue;
  };

/**
 * {@docCategory Button}
 */
export interface ButtonState extends ButtonProps {
  ref: React.RefObject<HTMLButtonElement>;

  icon?: ObjectShorthandProps<React.HTMLAttributes<HTMLSpanElement>>;
  children?: ObjectShorthandProps<React.HTMLAttributes<HTMLSpanElement>>;
}

export type ButtonStyleSelectors = {
  disabled?: boolean;
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
  height: string;
  paddingX: string;
  paddingY: string;
  minWidth: string;
  maxWidth: string;

  fontSize: string;
  fontWeight: number;
  lineHeight: string;

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
