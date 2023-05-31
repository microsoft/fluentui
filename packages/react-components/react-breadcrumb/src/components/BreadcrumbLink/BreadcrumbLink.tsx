import * as React from 'react';
import { useBreadcrumbLink_unstable } from './useBreadcrumbLink';
import { renderBreadcrumbLink_unstable } from './renderBreadcrumbLink';
import { useBreadcrumbLinkStyles_unstable } from './useBreadcrumbLinkStyles.styles';
import type { BreadcrumbLinkProps } from './BreadcrumbLink.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * BreadcrumbLink component - TODO: add more docs
 */
export const BreadcrumbLink: ForwardRefComponent<BreadcrumbLinkProps> = React.forwardRef((props, ref) => {
  const state = useBreadcrumbLink_unstable(props, ref);

  useBreadcrumbLinkStyles_unstable(state);
  return renderBreadcrumbLink_unstable(state);
});

BreadcrumbLink.displayName = 'BreadcrumbLink';
