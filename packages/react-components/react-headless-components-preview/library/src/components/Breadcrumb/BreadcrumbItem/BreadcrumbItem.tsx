'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { BreadcrumbItemProps } from './BreadcrumbItem.types';
import { useBreadcrumbItem } from './useBreadcrumbItem';
import { renderBreadcrumbItem } from './renderBreadcrumbItem';

/**
 * A list item that wraps a breadcrumb entry, such as a BreadcrumbButton or plain text.
 */
export const BreadcrumbItem: ForwardRefComponent<BreadcrumbItemProps> = React.forwardRef((props, ref) => {
  const state = useBreadcrumbItem(props, ref);

  return renderBreadcrumbItem(state);
});

BreadcrumbItem.displayName = 'BreadcrumbItem';
