import * as React from 'react';

import { ContextualMenuItemType, Icon, IContextualMenuItem, IContextualMenuProps } from '@fluentui/react';
import {
  MenuItem,
  MenuDivider,
  MenuItemProps,
  MenuGroup,
  MenuGroupHeader,
  MenuGroupHeaderProps,
  MenuTrigger,
  Menu,
  MenuList,
  MenuPopover,
  MenuItemCheckbox,
  MenuItemCheckboxProps,
  MenuProps,
} from '@fluentui/react-components';

export const shimMenuProps = (props: IContextualMenuProps): Partial<MenuProps> => {
  return {
    hasIcons: props?.items.some(i => i.iconProps),
    hasCheckmarks: props?.items.some(i => i.canCheck || i.checked),
  };
};

export const shimMenuItemProps = (props: IContextualMenuItem): MenuItemProps => {
  //TODO: Handle menuItem.onRenderIcon
  const icon = props.iconProps ? <Icon {...props.iconProps} /> : undefined;

  return {
    ...props,
    'aria-label': props.ariaLabel,
    children: props.text,
    icon,
    secondaryContent: props.secondaryText,
  } as MenuItemProps;
};

const shimMenuItemCheckboxProps = (props: IContextualMenuItem): MenuItemCheckboxProps => {
  return {
    ...shimMenuItemProps(props),
    name: props.name || 'name',
    value: props.value || 'value',
  };
};

const shimMenuHeaderProps = (props: IContextualMenuItem): MenuGroupHeaderProps => {
  return {
    children: props.sectionProps?.title,
  };
};

export const MenuItemShim = (props: IContextualMenuItem) => {
  if (props.itemType === ContextualMenuItemType.Divider) {
    const shimProps = shimMenuItemProps(props);
    return <MenuDivider {...shimProps} />;
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
