import * as React from 'react';

import { IButtonProps } from '@fluentui/react';
import { MenuButton, MenuButtonProps, Menu, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import { MenuItemShim, shimMenuProps } from '@fluentui/react-menu-shim-v8-v9';

import { shimButtonProps } from '../../shimButtonProps';

export const MenuButtonShim: React.ForwardRefExoticComponent<
  IButtonProps & React.RefAttributes<HTMLButtonElement>
> = React.forwardRef((props, _ref) => {
  const variantProps = {
    ...props,
    variantClassName: props.primary ? 'ms-Button--primary' : 'ms-Button--default',
  };

  const shimProps: MenuButtonProps = {
    ...shimButtonProps(variantProps),
  };

  const shimmedMenuProps = props.menuProps ? shimMenuProps(props.menuProps) : {};

  return (
    <Menu {...shimmedMenuProps}>
      <MenuTrigger>
        <MenuButton {...shimProps} />
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          {props.menuProps?.items.map(item => (
            // key is added through item spread
            // eslint-disable-next-line react/jsx-key
            <MenuItemShim {...item} />
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
});
