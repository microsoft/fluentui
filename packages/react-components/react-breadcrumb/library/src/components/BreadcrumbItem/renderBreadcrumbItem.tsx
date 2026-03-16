/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';

import type { BreadcrumbItemState, BreadcrumbItemSlots } from './BreadcrumbItem.types';

/**
 * Render the final JSX of BreadcrumbItem
 */
export const renderBreadcrumbItem_unstable = (state: BreadcrumbItemState): JSXElement => {
  assertSlots<BreadcrumbItemSlots>(state);

  return <state.root>{state.root.children}</state.root>;
};
