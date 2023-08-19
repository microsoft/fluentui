/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { assertSlots } from '@fluentui/react-utilities';
import type { BreadcrumbItemState, BreadcrumbItemSlots } from './BreadcrumbItem.types';

/**
 * Render the final JSX of BreadcrumbItem
 */
export const renderBreadcrumbItem_unstable = (state: BreadcrumbItemState) => {
  assertSlots<BreadcrumbItemSlots>(state);

  return (
    <state.root>
      {state.icon && <state.icon />}
      {state.root.children}
    </state.root>
  );
};
