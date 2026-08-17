import type { MenuItemRadioBaseProps, MenuItemRadioBaseState } from '@fluentui/react-menu';

export type MenuItemRadioProps = MenuItemRadioBaseProps;

export type MenuItemRadioState = MenuItemRadioBaseState & {
  root: {
    'data-disabled'?: string;
    'data-has-submenu'?: string;
    'data-submenu-open'?: string;
    'data-checked'?: string;
  };
};
