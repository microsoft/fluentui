'use client';

import * as React from 'react';
import { useMergedRefs } from '@fluentui/react-utilities';
import {
  useMenu,
  useMenuContext,
  useMenuContextValues,
  useMenuDivider,
  useMenuGroup,
  useMenuGroupContextValues,
  useMenuGroupHeader,
  useMenuItem as useMenuItemBase,
  useMenuItemCheckbox as useMenuItemCheckboxBase,
  useMenuItemLink,
  useMenuItemRadio as useMenuItemRadioBase,
  useMenuItemSwitch as useMenuItemSwitchBase,
  useMenuList,
  useMenuListContextValues,
  useMenuPopover,
  useMenuSplitGroup as useMenuSplitGroupBase,
  useMenuSplitGroupContextValues,
  useMenuTrigger,
} from '@fluentui/react-headless-components-preview/menu';
import type {
  MenuItemCheckboxProps,
  MenuItemCheckboxState,
  MenuItemProps,
  MenuItemRadioProps,
  MenuItemRadioState,
  MenuItemState,
  MenuItemSwitchProps,
  MenuItemSwitchState,
} from './Menu.types';

export {
  useMenu,
  useMenuContext,
  useMenuContextValues,
  useMenuDivider,
  useMenuGroup,
  useMenuGroupContextValues,
  useMenuGroupHeader,
  useMenuItemLink,
  useMenuList,
  useMenuListContextValues,
  useMenuPopover,
  useMenuSplitGroupContextValues,
  useMenuTrigger,
};

const defaultIcon = (name: string): React.ReactElement => React.createElement('span', { [`data-${name}`]: '' });

export const useMenuItem = (props: MenuItemProps, ref: Parameters<typeof useMenuItemBase>[1]): MenuItemState => {
  const state = useMenuItemBase(props, ref);

  return {
    ...state,
    submenuIndicator: state.submenuIndicator && {
      ...state.submenuIndicator,
      children: state.submenuIndicator.children ?? defaultIcon('default-submenu-indicator'),
    },
  };
};

export const useMenuItemCheckbox = (
  props: MenuItemCheckboxProps,
  ref: Parameters<typeof useMenuItemCheckboxBase>[1],
): MenuItemCheckboxState => {
  const state = useMenuItemCheckboxBase(props, ref);
  return {
    ...state,
    checkmark: state.checkmark && {
      ...state.checkmark,
      children: state.checkmark.children ?? defaultIcon('default-checkmark'),
    },
  };
};

export const useMenuItemRadio = (
  props: MenuItemRadioProps,
  ref: Parameters<typeof useMenuItemRadioBase>[1],
): MenuItemRadioState => {
  const state = useMenuItemRadioBase(props, ref);
  return {
    ...state,
    checkmark: state.checkmark && {
      ...state.checkmark,
      children: state.checkmark.children ?? defaultIcon('default-checkmark'),
    },
  };
};

export const useMenuItemSwitch = (
  props: MenuItemSwitchProps,
  ref: Parameters<typeof useMenuItemSwitchBase>[1],
): MenuItemSwitchState => {
  const state = useMenuItemSwitchBase(props, ref);

  return {
    ...state,
    switchIndicator: state.switchIndicator && {
      ...state.switchIndicator,
      children: state.switchIndicator.children ?? defaultIcon('default-switch-thumb'),
    },
  };
};

export const useMenuSplitGroup = (
  props: Parameters<typeof useMenuSplitGroupBase>[0],
  ref: Parameters<typeof useMenuSplitGroupBase>[1],
): ReturnType<typeof useMenuSplitGroupBase> => {
  const [multiline] = React.useState(() => {
    let root: HTMLElement | null = null;
    let value = false;

    const apply = () => root?.toggleAttribute('data-multiline', value);

    return {
      ref: (node: HTMLElement | null) => {
        root = node;
        apply();
      },
      set: (nextValue: boolean) => {
        value = nextValue;
        apply();
      },
    };
  });
  const state = useMenuSplitGroupBase(props, useMergedRefs(ref, multiline.ref));

  return { ...state, setMultiline: multiline.set };
};
