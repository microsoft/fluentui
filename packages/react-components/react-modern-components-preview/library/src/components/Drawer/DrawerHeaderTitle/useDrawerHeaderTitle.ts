'use client';

import type * as React from 'react';
import { useDrawerHeaderTitle as useDrawerHeaderTitleBase } from '@fluentui/react-headless-components-preview/drawer';
import type { DrawerHeaderTitleProps, DrawerHeaderTitleState } from './DrawerHeaderTitle.types';

export const useDrawerHeaderTitle = (
  props: DrawerHeaderTitleProps,
  ref: React.Ref<HTMLDivElement>,
): DrawerHeaderTitleState => useDrawerHeaderTitleBase(props, ref);
