import type { ARIAButtonSlotProps } from '@fluentui/react-aria';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ButtonSlots = {
  /**
   * Root of the component that renders as either a `<button>` tag or an `<a>` tag.
   */
  root: NonNullable<Slot<ARIAButtonSlotProps<'a'>>>;

  /**
   * Icon that renders either before or after the `children` as specified by the `iconPosition` prop.
   */
  icon?: Slot<'span'>;
};

/**
 * Button props. Behaviour only: the styled layer adds its design props on top.
 */
export type ButtonProps = ComponentProps<ButtonSlots> & {
  /**
   * When set, allows the button to be focusable even when it has been disabled. This is used in scenarios where it
   * is important to keep a consistent tab order for screen reader and keyboard users. The primary example of this
   * pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons.
   *
   * @default false
   */
  disabledFocusable?: boolean;

  /**
   * A button can show that it cannot be interacted with.
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * A button can format its icon to appear before or after its content.
   *
   * @default 'before'
   */
  iconPosition?: 'before' | 'after';
};

/**
 * Button state without the `data-*` contract. This is what `useButtonBase` returns and what the styled layer
 * builds on.
 */
export type ButtonBaseState = ComponentState<ButtonSlots> &
  Required<Pick<ButtonProps, 'disabledFocusable' | 'disabled' | 'iconPosition'>> & {
    /**
     * A button can contain only an icon.
     *
     * @default false
     */
    iconOnly: boolean;
  };

/**
 * Button component state
 */
export type ButtonState = ButtonBaseState & {
  root: {
    /**
     * Data attribute set when the button is disabled.
     */
    'data-disabled'?: string;

    /**
     * Data attribute set when the button is disabled but still focusable.
     */
    'data-disabled-focusable'?: string;

    /**
     * Data attribute set when the button renders only an icon.
     */
    'data-icon-only'?: string;

    /**
     * Data attribute reflecting the icon position when an icon slot is present.
     */
    'data-icon-position'?: ButtonBaseState['iconPosition'];
  };
};
