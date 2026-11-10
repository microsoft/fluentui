'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { BreadcrumbItemProps } from './BreadcrumbItem.types';
import { useBreadcrumbItem } from './useBreadcrumbItem';
import { renderBreadcrumbItem } from './renderBreadcrumbItem';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A list item that wraps a breadcrumb entry, such as a BreadcrumbButton or plain text.
 */
export const BreadcrumbItem: ForwardRefComponent<BreadcrumbItemProps> = /*#__PURE__*/ composeComponent(
  'BreadcrumbItem',
  useBreadcrumbItem,
  renderBreadcrumbItem,
);
