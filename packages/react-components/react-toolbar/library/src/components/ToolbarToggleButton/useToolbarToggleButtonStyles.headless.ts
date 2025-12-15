'use client';

import { useToggleButtonStyles_unstable } from '@fluentui/react-button';
import type { ToolbarToggleButtonState } from './ToolbarToggleButton.types';

/**
 * Apply styling to the ToolbarToggleButton slots based on the state
 */
export const useToolbarToggleButtonStyles_unstable = (state: ToolbarToggleButtonState): ToolbarToggleButtonState => {
  'use no memo';

  useToggleButtonStyles_unstable(state);

  return state;
};
