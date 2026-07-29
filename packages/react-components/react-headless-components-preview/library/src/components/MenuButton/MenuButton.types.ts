import type { MenuButtonBaseState } from '@fluentui/react-button';

export type { MenuButtonBaseProps as MenuButtonProps, MenuButtonSlots } from '@fluentui/react-button';

/**
 * MenuButton component state
 */
export type MenuButtonState = MenuButtonBaseState & {
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
