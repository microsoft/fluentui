import type { CompoundButtonBaseState } from '@fluentui/react-button';

export type { CompoundButtonBaseProps as CompoundButtonProps, CompoundButtonSlots } from '@fluentui/react-button';

/**
 * CompoundButton component state.
 */
export type CompoundButtonState = CompoundButtonBaseState & {
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
     * Data attribute set when secondary content is rendered.
     */
    'data-has-secondary-content'?: string;
  };
};
