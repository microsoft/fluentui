import * as React from 'react';
import { useBreadcrumbItem_unstable } from './useBreadcrumbItem';
import { renderBreadcrumbItem_unstable } from './renderBreadcrumbItem';
import { useBreadcrumbItemStyles_unstable } from './useBreadcrumbItemStyles.styles';
import type { BreadcrumbItemProps } from './BreadcrumbItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * BreadcrumbItem component is a wrapper for BreadcrumbLink and BreadcrumbButton.
 * It can be used as a non-interactive item.
 */
export const BreadcrumbItem: ForwardRefComponent<BreadcrumbItemProps> = React.forwardRef((props, ref) => {
  const state = useBreadcrumbItem_unstable(props, ref);

  useBreadcrumbItemStyles_unstable(state);
  useCustomStyleHook_unstable('useBreadcrumbItemStyles_unstable')(state);

  return renderBreadcrumbItem_unstable(state);
});

BreadcrumbItem.displayName = 'BreadcrumbItem';
