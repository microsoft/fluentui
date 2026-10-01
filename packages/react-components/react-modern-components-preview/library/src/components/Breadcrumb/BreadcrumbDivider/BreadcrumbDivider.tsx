'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { BreadcrumbDividerProps } from './BreadcrumbDivider.types';
import { renderBreadcrumbDivider } from './renderBreadcrumbDivider';
import { useBreadcrumbDivider } from './useBreadcrumbDivider';
import { useBreadcrumbDividerStyles } from './useBreadcrumbDividerStyles.styles';

export const BreadcrumbDivider: ForwardRefComponent<BreadcrumbDividerProps> = React.forwardRef((props, ref) => {
  const state = useBreadcrumbDivider(props, ref);

  useBreadcrumbDividerStyles(state);

  return renderBreadcrumbDivider(state);
});

BreadcrumbDivider.displayName = 'BreadcrumbDivider';
