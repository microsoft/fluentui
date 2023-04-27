import * as React from 'react';
import { useBreadcrumbItem_unstable } from './useBreadcrumbItem';
import { renderBreadcrumbItem_unstable } from './renderBreadcrumbItem';
import { useBreadcrumbItemStyles_unstable } from './useBreadcrumbItemStyles.styles';
import type { BreadcrumbItemProps } from './BreadcrumbItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * BreadcrumbItem component - TODO: add more docs
 */
export const BreadcrumbItem: ForwardRefComponent<BreadcrumbItemProps> = React.forwardRef((props, ref) => {
  const state = useBreadcrumbItem_unstable(props, ref);

  useBreadcrumbItemStyles_unstable(state);

  return renderBreadcrumbItem_unstable(state);
});

BreadcrumbItem.displayName = 'BreadcrumbItem';
