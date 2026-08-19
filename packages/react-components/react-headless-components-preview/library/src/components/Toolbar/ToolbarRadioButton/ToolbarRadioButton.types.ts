import type { ToolbarRadioButtonBaseState } from '@fluentui/react-toolbar';

export type { ToolbarRadioButtonBaseProps as ToolbarRadioButtonProps } from '@fluentui/react-toolbar';

export type ToolbarRadioButtonState = ToolbarRadioButtonBaseState & {
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
     * Present when the button is checked (selected); omitted when it is unchecked.
     */
    'data-checked'?: string;
  };
};
