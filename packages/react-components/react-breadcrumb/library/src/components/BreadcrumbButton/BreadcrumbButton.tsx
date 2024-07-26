import * as React from 'react';
import { useBreadcrumbButton_unstable } from './useBreadcrumbButton';
import { renderBreadcrumbButton_unstable } from './renderBreadcrumbButton';
import { useBreadcrumbButtonStyles_unstable } from './useBreadcrumbButtonStyles.styles';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { BreadcrumbButtonProps } from './BreadcrumbButton.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A button component which is used inside the Breadcrumb.
 */
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const BreadcrumbButton: ForwardRefComponent<BreadcrumbButtonProps> = React.forwardRef((props, ref) => {
  const state = useBreadcrumbButton_unstable(props, ref);

  useBreadcrumbButtonStyles_unstable(state);
  useCustomStyleHook_unstable('useBreadcrumbButtonStyles_unstable')(state);

  return renderBreadcrumbButton_unstable(state);
  //FIXME: migrate to fc to remove this assertion
  // Casting is required due to lack of distributive union to support unions on @types/react
  // eslint-disable-next-line deprecation/deprecation
}) as ForwardRefComponent<BreadcrumbButtonProps>;

BreadcrumbButton.displayName = 'BreadcrumbButton';
