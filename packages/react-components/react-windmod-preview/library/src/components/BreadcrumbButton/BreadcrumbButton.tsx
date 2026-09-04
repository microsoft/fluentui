'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderBreadcrumbButton,
  useBreadcrumbButton,
  useBreadcrumbContext,
} from '@fluentui/react-headless-components-preview/breadcrumb';

import type { BreadcrumbButtonProps } from './BreadcrumbButton.types';
import { useBreadcrumbButtonStyles } from './useBreadcrumbButtonStyles';

/**
 * A BreadcrumbButton is the interactive entry of a Breadcrumb trail. Windmod BreadcrumbButton:
 * the headless breadcrumb button decorated with the Fluent visual contract (Tailwind v4 + CSS
 * Modules), composed over Button's.
 */
export const BreadcrumbButton: ForwardRefComponent<BreadcrumbButtonProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod. Griffel's styled useBreadcrumbButton pins appearance and
  // shape and takes size from the breadcrumb, so a size prop on the button is not accepted.
  const { size } = useBreadcrumbContext();

  const state = useBreadcrumbButton(props, ref);
  const styled = useBreadcrumbButtonStyles({
    ...state,
    appearance: 'subtle',
    shape: 'rounded',
    size,
  });

  return renderBreadcrumbButton(styled);
});

BreadcrumbButton.displayName = 'BreadcrumbButton';
