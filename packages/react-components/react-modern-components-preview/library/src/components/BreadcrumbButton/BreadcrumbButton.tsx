'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { BreadcrumbButtonProps } from './BreadcrumbButton.types';
import { renderBreadcrumbButton } from './renderBreadcrumbButton';
import { useBreadcrumbButton } from './useBreadcrumbButton';
import { useBreadcrumbButtonStyles } from './useBreadcrumbButtonStyles.styles';

export const BreadcrumbButton: ForwardRefComponent<BreadcrumbButtonProps> = React.forwardRef((props, ref) => {
  const state = useBreadcrumbButton(props, ref);

  useBreadcrumbButtonStyles(state);

  return renderBreadcrumbButton(state);
});

BreadcrumbButton.displayName = 'BreadcrumbButton';
