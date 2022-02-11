import * as React from 'react';
import { useToggleButton_unstable } from './useToggleButton';
import type { ToggleButtonProps } from './ToggleButton.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * ToggleButtons are buttons that toggle between two defined states when triggered.
 */
export const ToggleButton: ForwardRefComponent<ToggleButtonProps> = React.forwardRef((props, ref) => {
  const [state, render] = useToggleButton_unstable(props, ref);
  return render(state);
  // Casting is required due to lack of distributive union to support unions on @types/react
}) as ForwardRefComponent<ToggleButtonProps>;

ToggleButton.displayName = 'ToggleButton';
