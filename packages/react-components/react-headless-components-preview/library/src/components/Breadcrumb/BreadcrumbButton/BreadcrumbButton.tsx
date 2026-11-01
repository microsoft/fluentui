'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { BreadcrumbButtonProps } from './BreadcrumbButton.types';
import { useBreadcrumbButton } from './useBreadcrumbButton';
import { renderBreadcrumbButton } from './renderBreadcrumbButton';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * An interactive button representing a navigation step in a breadcrumb trail.
 * Set the `current` prop to mark the active page.
 */
export const BreadcrumbButton: ForwardRefComponent<BreadcrumbButtonProps> = /*#__PURE__*/ composeComponent(
  'BreadcrumbButton',
  useBreadcrumbButton,
  renderBreadcrumbButton,
);
