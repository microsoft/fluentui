'use client';

import type * as React from 'react';
import { useDrawerHeaderNavigation as useDrawerHeaderNavigationBase } from '@fluentui/react-headless-components-preview/drawer';
import type { DrawerHeaderNavigationProps, DrawerHeaderNavigationState } from './DrawerHeaderNavigation.types';

export const useDrawerHeaderNavigation = (
  props: DrawerHeaderNavigationProps,
  ref: React.Ref<HTMLElement>,
): DrawerHeaderNavigationState => useDrawerHeaderNavigationBase(props, ref);
