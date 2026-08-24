'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderBreadcrumbDivider,
  useBreadcrumbContext,
  useBreadcrumbDivider,
} from '@fluentui/react-headless-components-preview/breadcrumb';
import { useProviderContext } from '@fluentui/react-headless-components-preview/provider';
import { ChevronLeftRegular } from '@fluentui/react-icons/headless/svg/chevron-left';
import { ChevronRightRegular } from '@fluentui/react-icons/headless/svg/chevron-right';

import type { BreadcrumbDividerProps, BreadcrumbDividerState } from './BreadcrumbDivider.types';
import { useBreadcrumbDividerStyles } from './useBreadcrumbDividerStyles';

/**
 * A BreadcrumbDivider separates two Breadcrumb entries. Windmod BreadcrumbDivider: the headless
 * breadcrumb divider decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 *
 * The divider is aria-hidden scenery whose only content is the direction-correct chevron, so
 * the children override is unconditional — consumer children are replaced, not defaulted.
 */
export const BreadcrumbDivider: ForwardRefComponent<BreadcrumbDividerProps> = React.forwardRef((props, ref) => {
  const { size } = useBreadcrumbContext();
  const { dir } = useProviderContext();

  const state = useBreadcrumbDivider(props, ref);

  const styled: BreadcrumbDividerState = useBreadcrumbDividerStyles({
    ...state,
    root: { ...state.root, children: dir === 'rtl' ? <ChevronLeftRegular /> : <ChevronRightRegular /> },
    size,
  });

  return renderBreadcrumbDivider(styled);
});

BreadcrumbDivider.displayName = 'BreadcrumbDivider';
