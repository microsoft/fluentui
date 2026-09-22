'use client';

import type * as React from 'react';
import { useDrawerBody as useDrawerBodyBase } from '@fluentui/react-headless-components-preview/drawer';
import type { DrawerBodyProps, DrawerBodyState } from './DrawerBody.types';

export const useDrawerBody = (props: DrawerBodyProps, ref: React.Ref<HTMLDivElement>): DrawerBodyState =>
  useDrawerBodyBase(props, ref);
