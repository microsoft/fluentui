import type { ToolbarButtonBaseState } from '@fluentui/react-toolbar';

export type { ToolbarButtonBaseProps as ToolbarButtonProps } from '@fluentui/react-toolbar';

export type { ButtonSlots as ToolbarButtonSlots } from '@fluentui/react-button';

export type ToolbarButtonState = ToolbarButtonBaseState & {
  root: {
    /**
     * Data attribute with the component's orientation.
     */
    'data-orientation'?: 'vertical' | 'horizontal';

    /**
     * Data attribute set when the button is in a vertically oriented toolbar.
     * @deprecated Use `data-orientation` instead. Will be removed in a future release.
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
