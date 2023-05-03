import type { BreadcrumbButtonState } from './BreadcrumbButton.types';
import { renderButton_unstable } from '@fluentui/react-button';

/**
 * Render the final JSX of BreadcrumbButton
 */
export const renderBreadcrumbButton_unstable = (state: BreadcrumbButtonState) => {
  return renderButton_unstable(state);
};
