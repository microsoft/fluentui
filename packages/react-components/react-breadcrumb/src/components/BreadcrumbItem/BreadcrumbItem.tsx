import * as React from 'react';
import { useBreadcrumbItem_unstable } from './useBreadcrumbItem';
import { renderBreadcrumbItem_unstable } from './renderBreadcrumbItem';
import { useBreadcrumbItemStyles_unstable } from './useBreadcrumbItemStyles';
import type { BreadcrumbItemProps } from './BreadcrumbItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHooks_unstable } from '@fluentui/react-shared-contexts';

/**
 * BreadcrumbItem component - TODO: add more docs
 */
export const BreadcrumbItem: ForwardRefComponent<BreadcrumbItemProps> = React.forwardRef((props, ref) => {
  const state = useBreadcrumbItem_unstable(props, ref);

  useBreadcrumbItemStyles_unstable(state);

  const { useTextStyles_unstable: useCustomStyles } = useCustomStyleHooks_unstable();
  useCustomStyles(state);

  return renderBreadcrumbItem_unstable(state);
});

BreadcrumbItem.displayName = 'BreadcrumbItem';
