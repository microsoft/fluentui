'use client';

import type * as React from 'react';
import {
  useBreadcrumbContext,
  useBreadcrumbItem as useBreadcrumbItemBase,
} from '@fluentui/react-headless-components-preview/breadcrumb';
import type { BreadcrumbItemProps, BreadcrumbItemState } from './BreadcrumbItem.types';

export const useBreadcrumbItem = (props: BreadcrumbItemProps, ref: React.Ref<HTMLLIElement>): BreadcrumbItemState => {
  const { size: contextSize = 'medium' } = useBreadcrumbContext();
  const { size = contextSize, ...rest } = props;
  const state = useBreadcrumbItemBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-size': size,
    },
    size,
  };
};
