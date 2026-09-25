'use client';

import type * as React from 'react';
import { useDrawerHeader as useDrawerHeaderBase } from '@fluentui/react-headless-components-preview/drawer';
import type { DrawerHeaderProps, DrawerHeaderState } from './DrawerHeader.types';

export const useDrawerHeader = (props: DrawerHeaderProps, ref: React.Ref<HTMLElement>): DrawerHeaderState =>
  useDrawerHeaderBase(props, ref);
