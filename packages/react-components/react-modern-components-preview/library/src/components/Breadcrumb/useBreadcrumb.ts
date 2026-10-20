'use client';

import type * as React from 'react';
import {
  useBreadcrumb as useBreadcrumbBase,
  useBreadcrumbContext,
  useBreadcrumbContextValues,
} from '@fluentui/react-headless-components-preview/breadcrumb';
import type { BreadcrumbProps, BreadcrumbState } from './Breadcrumb.types';

export { useBreadcrumbContext, useBreadcrumbContextValues };

export const useBreadcrumb = (props: BreadcrumbProps, ref: React.Ref<HTMLElement>): BreadcrumbState => {
  const { size = 'medium', ...rest } = props;
  const state = useBreadcrumbBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-size': size,
    },
    size,
  };
};
