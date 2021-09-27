import * as React from 'react';
import type { ComponentPropsCompat, ComponentStateCompat, ShorthandPropsCompat } from '@fluentui/react-utilities';

export type ButtonProps = ComponentPropsCompat &
  React.ButtonHTMLAttributes<HTMLElement> & {
    /**
     * A button can have its content and borders styled for greater emphasis or to be subtle.
     * - 'primary': Emphasizes the button as a primary action.
     * - 'outline': Removes background styling.
     * - 'subtle': Minimizes emphasis to blend into the background until hovered or focused.
     * - 'transparent': Removes background and border styling.
     */
    appearance?: 'primary' | 'outline' | 'subtle' | 'transparent';

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
     * A button can be rounded, circular, or square.
     * @default 'rounded'
     */
    shape?: 'rounded' | 'circular' | 'square';

    /**
     * A button supports different sizes.
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
  };

export type ButtonShorthandPropsCompat = 'icon';

export type ButtonDefaultedProps = 'icon' | 'size';

export type ButtonState = ComponentStateCompat<ButtonProps, ButtonShorthandPropsCompat, ButtonDefaultedProps> & {
  /**
   * A button can contain only an icon.
   * @default false
   */
  iconOnly?: boolean;

  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
};
