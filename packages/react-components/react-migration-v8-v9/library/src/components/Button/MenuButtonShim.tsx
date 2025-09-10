import * as React from 'react';

import type { IButtonProps } from '@fluentui/react';
import { MenuButton, Menu, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import type { MenuButtonProps } from '@fluentui/react-components';
import { MenuItemShim, shimMenuProps } from '../Menu/index';

import { shimButtonProps } from './shimButtonProps';

export const MenuButtonShim: React.ForwardRefExoticComponent<
  IButtonProps &
    // eslint-disable-next-line @typescript-eslint/no-restricted-types -- this is expected in order to be compatible with v8, as every v8 interface contains `React.RefAttributes` to accept ref as string
    React.RefAttributes<HTMLButtonElement>
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
