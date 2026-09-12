import type { ButtonBaseState } from '@fluentui/react-button';

export type { ButtonSlots, ButtonBaseProps as ButtonProps } from '@fluentui/react-button';

/**
 * Button component state
 */
export type ButtonState = ButtonBaseState & {
  root: {
    /**
     * Present when disabled; omitted otherwise.
     */
    'data-disabled'?: string;

    /**
     * Present when disabled but still focusable; omitted otherwise.
     */
    'data-disabled-focusable'?: string;

    /**
     * Present when the button renders only an icon; omitted otherwise.
     */
    'data-icon-only'?: string;

    /**
     * Data attribute reflecting the icon position when an icon slot is present.
     */
    'data-icon-position'?: ButtonBaseState['iconPosition'];
  };
};
