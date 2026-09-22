'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { BreadcrumbItemProps } from './BreadcrumbItem.types';
import { renderBreadcrumbItem } from './renderBreadcrumbItem';
import { useBreadcrumbItem } from './useBreadcrumbItem';
import { useBreadcrumbItemStyles } from './useBreadcrumbItemStyles.styles';

export const BreadcrumbItem: ForwardRefComponent<BreadcrumbItemProps> = React.forwardRef((props, ref) => {
  const state = useBreadcrumbItem(props, ref);

  useBreadcrumbItemStyles(state);

  return renderBreadcrumbItem(state);
});

BreadcrumbItem.displayName = 'BreadcrumbItem';
