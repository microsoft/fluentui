import type { MenuItemRadioBaseState } from '@fluentui/react-menu';

export type { MenuItemRadioBaseProps as MenuItemRadioProps } from '@fluentui/react-menu';

export type MenuItemRadioState = MenuItemRadioBaseState & {
  root: {
    'data-disabled'?: string;
    'data-has-submenu'?: string;
    'data-submenu-open'?: string;
    'data-checked'?: string;
  };
};
