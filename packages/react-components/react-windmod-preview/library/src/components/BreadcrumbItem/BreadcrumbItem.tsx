'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderBreadcrumbItem, useBreadcrumbItem } from '@fluentui/react-headless-components-preview/breadcrumb';

import type { BreadcrumbItemProps } from './BreadcrumbItem.types';
import { useBreadcrumbItemStyles } from './useBreadcrumbItemStyles';

/**
 * A BreadcrumbItem is one entry of a Breadcrumb trail. Windmod BreadcrumbItem: the headless
 * breadcrumb item decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const BreadcrumbItem: ForwardRefComponent<BreadcrumbItemProps> = React.forwardRef((props, ref) => {
  return renderBreadcrumbItem(useBreadcrumbItemStyles(useBreadcrumbItem(props, ref)));
});

BreadcrumbItem.displayName = 'BreadcrumbItem';
