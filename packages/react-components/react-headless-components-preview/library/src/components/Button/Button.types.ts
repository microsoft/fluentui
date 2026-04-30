import type { ButtonSlots as ButtonBaseSlots, ButtonBaseProps, ButtonBaseState } from '@fluentui/react-button';

/**
 * Button component slots
 */
export type ButtonSlots = ButtonBaseSlots;

/**
 * Button component props
 */
export type ButtonProps = ButtonBaseProps;

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
  };
};
