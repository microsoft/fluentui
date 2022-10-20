import * as React from 'react';

import { ContextualMenuItemType } from '@fluentui/react';
import type { IContextualMenuItem } from '@fluentui/react';
import {
  MenuItem,
  MenuDivider,
  MenuGroup,
  MenuGroupHeader,
  MenuTrigger,
  Menu,
  MenuList,
  MenuPopover,
  MenuItemCheckbox,
  MenuDividerProps,
} from '@fluentui/react-components';

import { shimMenuHeaderProps, shimMenuItemCheckboxProps, shimMenuItemProps, shimMenuProps } from './shimMenuProps';

export const MenuItemShim = (props: IContextualMenuItem) => {
  if (props.itemType === ContextualMenuItemType.Divider) {
    const shimProps = shimMenuItemProps(props);
    return <MenuDivider {...(shimProps as MenuDividerProps)} />;
  }

  if (props.itemType === ContextualMenuItemType.Section) {
    const shimProps = shimMenuHeaderProps(props);
    return (
      <MenuGroup>
        <MenuGroupHeader>{shimProps.children}</MenuGroupHeader>
        {/* //TODO: sectionProps handling */}
        {props.subMenuProps?.items.map(item => (
          // key is added through item spread
          // eslint-disable-next-line react/jsx-key
          <MenuItemShim {...item} />
        ))}
      </MenuGroup>
    );
  }

  if (props.canCheck) {
    const shimProps = shimMenuItemCheckboxProps(props);
    return <MenuItemCheckbox {...shimProps} />;
  }

  // Nested Menu to handle submenus
  if (props.subMenuProps?.items && props.subMenuProps.items.length > 0) {
    const shimmedMenuProps = shimMenuProps(props.subMenuProps);
    const shimmedItemProps = shimMenuItemProps(props);

    return (
      <Menu {...shimmedMenuProps}>
        <MenuTrigger>
          <MenuItem {...shimmedItemProps} hasSubmenu />
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            {props.subMenuProps.items.map(item => (
              // key is added through item spread
              // eslint-disable-next-line react/jsx-key
              <MenuItemShim {...item} />
            ))}
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  }

  const shimProps = shimMenuItemProps(props);
  return <MenuItem {...shimProps} />;
};
