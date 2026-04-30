/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';

import type { BreadcrumbDividerBaseState, BreadcrumbDividerSlots } from './BreadcrumbDivider.types';

/**
 * Render the final JSX of BreadcrumbDivider
 */
export const renderBreadcrumbDivider_unstable = (state: BreadcrumbDividerBaseState): JSXElement => {
  assertSlots<BreadcrumbDividerSlots>(state);

  return <state.root />;
};
