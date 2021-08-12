import * as React from 'react';
import { ComponentPropsCompat, ComponentStateCompat, ShorthandPropsCompat } from '@fluentui/react-utilities';

/**
 * {@docCategory Button}
 */
export type ButtonProps = ComponentPropsCompat &
  React.ButtonHTMLAttributes<HTMLElement> & {
    /**
     * Icon slot that, if specified, renders an icon either before or after the `children` as specified by the
     * `iconPosition` prop.
     */
    icon?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

    // /**
    //  * Loader slot that, if specified, renders a `loader` before the `icon` and `children` while the `loading` flag
    //  * is set to `true`.
    //  */
    // loader?: ShorthandPropsCompat<React.HTMLAttributes<HTMLSpanElement>>;

    /**
     * A button can fill the width of its container.
     * @default false
     */
    block?: boolean;

    /**
     * A button can have completely rounded corners.
     * @default false
     */
    circular?: boolean;

    /**
     * A button can show that it cannot be interacted with.
     * @default false
     */
    disabled?: boolean;

    /**
     * When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it
     * is important to keep a consistent tab order for screen reader and keyboard users. The primary example of this
     * pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons.
     * @default false
     */
    disabledFocusable?: boolean;

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

    /**
     * A button can be styled such that it has no background styling and is just emphasized through the styling of
     * its content and borders.
     * Mutually exclusive with `primary`, `subtle` and `transparent`.
     * @default false
     */
    outline?: boolean;

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
export type ButtonShorthandPropsCompat = 'icon';

/**
 * {@docCategory Button}
 */
export type ButtonDefaultedProps = 'icon' | 'size';

/**
 * {@docCategory Button}
 */
export interface ButtonState
  extends ComponentStateCompat<ButtonProps, ButtonShorthandPropsCompat, ButtonDefaultedProps> {
  /**
   * A button can contain only an icon.
   * @default false
   */
  iconOnly?: boolean;

  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
}
