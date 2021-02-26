import * as React from 'react';
import { ComponentProps, ShorthandProps } from '@fluentui/react-utilities';
import { ObjectShorthandProps } from '@fluentui/react-utilities';

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

    /**
     * Click handler for the button.
     */
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;

    // /**
    //  * A button can fill the width of its container.
    //  * @defaultvalue false
    //  */
    // block?: boolean;

    // /**
    //  * A button can have completely rounded corners.
    //  * @defaultvalue false
    //  */
    // circular?: boolean;

    /**
     * A button can show that it cannot be interacted with.
     * @defaultvalue false
     */
    disabled?: boolean;

    // /**
    //  * When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it
    //  * is important to keep a consistent tab order for screen reader and keyboard users.
    //  * @defaultvalue false
    //  */
    // disabledFocusable?: boolean;

    /**
     * A button can format its icon to appear before or after its content.
     * @defaultvalue 'before'
     */
    iconPosition?: 'before' | 'after';

    // /**
    //  * A button can show a loading indicator if it is waiting for another action to happen before allowing itself to
    //  * be interacted with.
    //  * @defaultvalue false
    //  */
    // loading?: boolean;

    // /**
    //  * A button can be styled such that it has no background styling and is just emphasized through the styling of
    //  * its content and borders.
    //  * @defaultvalue false
    //  */
    // outline?: boolean;

    /**
     * A button can be styled to emphasize that it represents the primary action.
     * @defaultvalue false
     */
    primary?: boolean;

    /**
     * A button supports different sizes.
     * @defaultvalue 'medium'
     */
    size?: 'small' | 'medium' | 'large';

    // /**
    //  * A button can be styled to blend into its background and become less emphasized.
    //  * @defaultvalue false
    //  */
    // subtle?: boolean;

    // /**
    //  * A button can be styled such that it has no background or border styling and is just emphasized through its
    //  * content styling.
    //  * @defaultvalue false
    //  */
    // transparent?: boolean;
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
