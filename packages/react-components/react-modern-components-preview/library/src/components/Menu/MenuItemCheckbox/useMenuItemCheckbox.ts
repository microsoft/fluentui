'use client';

import * as React from 'react';
import { useMenuItemCheckbox as useMenuItemCheckboxBase } from '@fluentui/react-headless-components-preview/menu';
import type { MenuItemCheckboxProps, MenuItemCheckboxState } from './MenuItemCheckbox.types';

const defaultIcon = (name: string): React.ReactElement => React.createElement('span', { [`data-${name}`]: '' });

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
