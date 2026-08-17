import type {
  MenuItemCheckboxProps as MenuItemCheckboxBaseProps,
  MenuItemCheckboxState as MenuItemCheckboxBaseState,
} from '@fluentui/react-menu';

export type MenuItemCheckboxProps = MenuItemCheckboxBaseProps;

export type MenuItemCheckboxState = MenuItemCheckboxBaseState & {
  root: {
    'data-disabled'?: string;
    'data-has-submenu'?: string;
    'data-submenu-open'?: string;
    'data-checked'?: string;
  };
};
