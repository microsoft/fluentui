import type { ToolbarButtonState } from './ToolbarButton.types';
import { renderButton_unstable } from '@fluentui/react-button';

/**
 * Render the final JSX of ToolbarButton
 */
export const renderToolbarButton_unstable = (state: ToolbarButtonState) => {
  return renderButton_unstable(state);
};
