import { useButtonStyles_unstable } from '@fluentui/react-button';
import type { ToolbarButtonState } from './ToolbarButton.types';

/**
 * Apply styling to the ToolbarButton slots based on the state
 */
export const useToolbarButtonStyles_unstable = (state: ToolbarButtonState): ToolbarButtonState => {
  return useButtonStyles_unstable(state);
};
