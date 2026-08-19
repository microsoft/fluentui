import type { MenuButtonBaseState } from '@fluentui/react-button';

export type { MenuButtonBaseProps as MenuButtonProps, MenuButtonSlots } from '@fluentui/react-button';

/**
 * MenuButton component state
 */
export type MenuButtonState = MenuButtonBaseState & {
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
     * Data attribute set when the menu is open.
     */
    'data-open'?: string;
  };
};
