import type { ToolbarButtonBaseState } from '@fluentui/react-toolbar';

export type { ToolbarButtonBaseProps as ToolbarButtonProps } from '@fluentui/react-toolbar';

export type ToolbarButtonState = ToolbarButtonBaseState & {
  root: {
    /**
     * Present when the button is in a vertically oriented toolbar; omitted when it is in a horizontally oriented toolbar.
     */
    'data-vertical'?: string;

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
  };
};
