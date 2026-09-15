import type { ToolbarToggleButtonBaseState } from '@fluentui/react-toolbar';

export type { ToolbarToggleButtonBaseProps as ToolbarToggleButtonProps } from '@fluentui/react-toolbar';

export type ToolbarToggleButtonState = ToolbarToggleButtonBaseState & {
  root: {
    /**
     * Present when the button is disabled; omitted otherwise.
     */
    'data-disabled'?: string;

    /**
     * Present when the button is disabled but still focusable; omitted otherwise.
     */
    'data-disabled-focusable'?: string;

    /**
     * Present when the button renders only an icon; omitted otherwise.
     */
    'data-icon-only'?: string;

    /**
     * Present when the button is checked (pressed); omitted when it is unchecked.
     */
    'data-checked'?: string;
  };
};
