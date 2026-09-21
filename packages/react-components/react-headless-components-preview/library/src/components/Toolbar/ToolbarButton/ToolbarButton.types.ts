import type { ToolbarButtonBaseState } from '@fluentui/react-toolbar';

export type { ToolbarButtonBaseProps as ToolbarButtonProps } from '@fluentui/react-toolbar';

export type ToolbarButtonState = ToolbarButtonBaseState & {
  root: {
    /**
     * Data attribute set when the button is in a vertically oriented toolbar.
     */
    'data-vertical'?: string;

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
