import type { ToolbarRadioButtonBaseProps, ToolbarRadioButtonBaseState } from '@fluentui/react-toolbar';

export type ToolbarRadioButtonProps = ToolbarRadioButtonBaseProps;

export type ToolbarRadioButtonState = ToolbarRadioButtonBaseState & {
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
     * Data attribute set when the button is in a checked (selected) state.
     */
    'data-checked'?: string;
  };
};
