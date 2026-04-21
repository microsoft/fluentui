import type { ToolbarToggleButtonBaseProps, ToolbarToggleButtonBaseState } from '@fluentui/react-toolbar';

export type ToolbarToggleButtonProps = ToolbarToggleButtonBaseProps & {
  /**
   * Whether the toolbar toggle button is in a vertically oriented toolbar.
   */
  vertical?: boolean;
};

export type ToolbarToggleButtonState = ToolbarToggleButtonBaseState & {
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
     * Data attribute set when the button is in a checked (pressed) state.
     */
    'data-checked'?: string;
  };
};
