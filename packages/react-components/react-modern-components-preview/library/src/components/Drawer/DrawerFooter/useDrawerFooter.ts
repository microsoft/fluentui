'use client';

import type * as React from 'react';
import { useDrawerFooter as useDrawerFooterBase } from '@fluentui/react-headless-components-preview/drawer';
import type { DrawerFooterProps, DrawerFooterState } from './DrawerFooter.types';

export const useDrawerFooter = (props: DrawerFooterProps, ref: React.Ref<HTMLElement>): DrawerFooterState =>
  useDrawerFooterBase(props, ref);
