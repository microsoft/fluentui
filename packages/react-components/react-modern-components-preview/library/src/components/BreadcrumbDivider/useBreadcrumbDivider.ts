'use client';

import * as React from 'react';
import {
  useBreadcrumbContext,
  useBreadcrumbDivider as useBreadcrumbDividerBase,
} from '@fluentui/react-headless-components-preview/breadcrumb';
import type { BreadcrumbDividerProps, BreadcrumbDividerState } from './BreadcrumbDivider.types';

export const useBreadcrumbDivider = (
  props: BreadcrumbDividerProps,
  ref: React.Ref<HTMLLIElement>,
): BreadcrumbDividerState => {
  const { size = 'medium' } = useBreadcrumbContext();
  const state = useBreadcrumbDividerBase(props, ref);

  return {
    ...state,
    root: {
      ...state.root,
      children: state.root.children ?? React.createElement('span', { 'aria-hidden': true, 'data-default-icon': '' }),
      'data-size': size,
    },
    size,
  };
};
