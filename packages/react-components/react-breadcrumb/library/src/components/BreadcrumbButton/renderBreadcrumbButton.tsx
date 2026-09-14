import type { BreadcrumbButtonBaseState } from './BreadcrumbButton.types';
import type { JSXElement } from '@fluentui/react-utilities';

import { renderButton_unstable } from '@fluentui/react-button';

/**
 * Render the final JSX of BreadcrumbButton
 */
export const renderBreadcrumbButton_unstable = (state: BreadcrumbButtonBaseState): JSXElement => {
  return renderButton_unstable(state);
};
