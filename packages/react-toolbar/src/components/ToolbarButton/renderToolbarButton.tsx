import type { ToolbarButtonState } from './ToolbarButton.types';
import { renderButton_unstable } from '../../../../react-button/src/Button';

/**
 * Render the final JSX of ToolbarButton
 */
export const renderToolbarButton_unstable = (state: ToolbarButtonState) => {
  return renderButton_unstable(state);
};
