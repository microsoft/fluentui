import * as React from 'react';

import { Icon } from '@fluentui/react';
import type { IContextualMenuItem, IContextualMenuProps } from '@fluentui/react';
import type { MenuItemProps, MenuGroupHeaderProps, MenuItemCheckboxProps, MenuProps } from '@fluentui/react-menu';

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

export const shimMenuItemCheckboxProps = (props: IContextualMenuItem): MenuItemCheckboxProps => {
  return {
    ...shimMenuItemProps(props),
    name: props.text || 'name',
    value: props.value || 'value',
  };
};

export const shimMenuHeaderProps = (props: IContextualMenuItem): MenuGroupHeaderProps => {
  return {
    children: props.sectionProps?.title,
  };
};
