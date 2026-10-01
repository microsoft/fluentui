'use client';

import * as React from 'react';
import { useMenuItemRadio as useMenuItemRadioBase } from '@fluentui/react-headless-components-preview/menu';
import type { MenuItemRadioProps, MenuItemRadioState } from './MenuItemRadio.types';

const defaultIcon = (name: string): React.ReactElement => React.createElement('span', { [`data-${name}`]: '' });

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
