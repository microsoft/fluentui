import type { ARIAButtonSlotProps } from '@fluentui/react-aria';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ButtonSlots = {
  /**
   * Root of the component that renders as either a `<button>` tag or an `<a>` tag.
   */
  root: NonNullable<Slot<ARIAButtonSlotProps>>;

  /**
   * Icon that renders either before or after the `children` as specified by the `iconPosition` prop.
   */
  icon?: Slot<'span'>;
};

export type ButtonCommons = {
  /**
   * A button can have its content and borders styled for greater emphasis or to be subtle.
   * - 'primary': Emphasizes the button as a primary action.
   * - 'outline': Removes background styling.
   * - 'subtle': Minimizes emphasis to blend into the background until hovered or focused.
   * - 'transparent': Removes background and border styling.
   */
  appearance?: 'primary' | 'outline' | 'subtle' | 'transparent';

  /**
   * A button can fill the width of its container.
   * @default false
   *
   * @deprecated - Use style overrides instead.
   */
  block: boolean;

  /**
   * When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it
   * is important to keep a consistent tab order for screen reader and keyboard users. The primary example of this
   * pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons.
   * @default false
   */
  disabledFocusable: boolean;

  /**
   * A button can show that it cannot be interacted with.
   * @default false
   */
  disabled: boolean;

  /**
   * A button can format its icon to appear before or after its content.
   * @default 'before'
   */
  iconPosition?: 'before' | 'after';

  /**
   * A button can be rounded, circular, or square.
   * @default 'rounded'
   */
  shape: 'rounded' | 'circular' | 'square';

  /**
   * A button supports different sizes.
   * @default 'medium'
   */
  size: 'small' | 'medium' | 'large';
};

export type ButtonProps = ComponentProps<ButtonSlots> & Partial<ButtonCommons>;

export type ButtonState = ComponentState<ButtonSlots> &
  ButtonCommons & {
    /**
     * A button can contain only an icon.
     * @default false
     */
    iconOnly: boolean;
  };
