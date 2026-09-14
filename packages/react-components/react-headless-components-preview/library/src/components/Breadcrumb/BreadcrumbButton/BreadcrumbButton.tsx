'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { BreadcrumbButtonProps } from './BreadcrumbButton.types';
import { useBreadcrumbButton } from './useBreadcrumbButton';
import { renderBreadcrumbButton } from './renderBreadcrumbButton';

/**
 * An interactive button representing a navigation step in a breadcrumb trail.
 * Set the `current` prop to mark the active page.
 */
export const BreadcrumbButton: ForwardRefComponent<BreadcrumbButtonProps> = React.forwardRef((props, ref) => {
  const state = useBreadcrumbButton(props, ref);

  return renderBreadcrumbButton(state);
});

BreadcrumbButton.displayName = 'BreadcrumbButton';
