'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { BreadcrumbProps } from './Breadcrumb.types';
import { useBreadcrumb, useBreadcrumbContextValues } from './useBreadcrumb';
import { renderBreadcrumb } from './renderBreadcrumb';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A breadcrumb component for displaying navigation hierarchy.
 */
export const Breadcrumb: ForwardRefComponent<BreadcrumbProps> = /*#__PURE__*/ composeComponent(
  'Breadcrumb',
  useBreadcrumb,
  renderBreadcrumb,
  useBreadcrumbContextValues,
);
