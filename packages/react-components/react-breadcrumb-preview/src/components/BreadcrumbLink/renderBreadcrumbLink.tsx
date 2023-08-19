/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { assertSlots } from '@fluentui/react-utilities';
import type { BreadcrumbLinkState, BreadcrumbLinkSlots } from './BreadcrumbLink.types';

/**
 * Render the final JSX of BreadcrumbLink
 */
export const renderBreadcrumbLink_unstable = (state: BreadcrumbLinkState) => {
  assertSlots<BreadcrumbLinkSlots>(state);

  return (
    <state.root>
      {state.icon && <state.icon />}
      {state.root.children}
    </state.root>
  );
};
