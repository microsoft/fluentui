import { renderBreadcrumbButton_unstable } from '@fluentui/react-breadcrumb';
import type { BreadcrumbButtonBaseState } from '@fluentui/react-breadcrumb';
import type { JSXElement } from '@fluentui/react-utilities';

import type { BreadcrumbButtonState } from './BreadcrumbButton.types';

/**
 * Renders the final JSX of the BreadcrumbButton component, given the state.
 */
export const renderBreadcrumbButton = (state: BreadcrumbButtonState): JSXElement => {
  return renderBreadcrumbButton_unstable(state as BreadcrumbButtonBaseState);
};
