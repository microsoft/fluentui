import * as React from 'react';
import { useBreadcrumbDivider_unstable } from './useBreadcrumbDivider';
import { renderBreadcrumbDivider_unstable } from './renderBreadcrumbDivider';
import { useBreadcrumbDividerStyles_unstable } from './useBreadcrumbDividerStyles.styles';
import type { BreadcrumbDividerProps } from './BreadcrumbDivider.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * A divider component which is used inside the Breadcrumb
 */
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const BreadcrumbDivider: ForwardRefComponent<BreadcrumbDividerProps> = React.forwardRef((props, ref) => {
  const state = useBreadcrumbDivider_unstable(props, ref);

  useBreadcrumbDividerStyles_unstable(state);
  useCustomStyleHook_unstable('useBreadcrumbDividerStyles_unstable')(state);

  return renderBreadcrumbDivider_unstable(state);
});

BreadcrumbDivider.displayName = 'BreadcrumbDivider';
