import type { ButtonBaseState } from '@fluentui/react-button';

export type { ButtonSlots, ButtonBaseProps as ButtonProps } from '@fluentui/react-button';

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
