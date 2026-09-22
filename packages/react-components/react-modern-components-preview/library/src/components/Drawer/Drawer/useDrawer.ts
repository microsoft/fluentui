'use client';

import type * as React from 'react';
import { useDrawer as useDrawerBase } from '@fluentui/react-headless-components-preview/drawer';
import type { DrawerProps as DrawerBaseProps } from '@fluentui/react-headless-components-preview/drawer';
import { InlineDrawer } from '../InlineDrawer/InlineDrawer';
import { OverlayDrawer } from '../OverlayDrawer/OverlayDrawer';
import type { DrawerProps, DrawerState } from './Drawer.types';

export const useDrawer = (props: DrawerProps, ref: React.Ref<HTMLElement>): DrawerState => {
  const state = useDrawerBase(props as DrawerBaseProps, ref) as DrawerState;
  const rootComponent = props.type === 'inline' ? InlineDrawer : OverlayDrawer;

  return {
    ...state,
    components: {
      ...state.components,
      root: rootComponent as typeof state.components.root,
    },
  };
};
