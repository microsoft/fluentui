import * as React from 'react';
import type { ToolbarRadioButtonProps } from './ToolbarRadioButton.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderToggleButton_unstable } from '@fluentui/react-button';
import { useToolbarRadioButton_unstable } from './useToolbarRadioButton';
import { useToolbarRadioButtonStyles_unstable } from './useToolbarRadioButtonStyles.styles';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * ToolbarRadioButton component
 */
export const ToolbarRadioButton: ForwardRefComponent<ToolbarRadioButtonProps> = React.forwardRef((props, ref) => {
  const state = useToolbarRadioButton_unstable(props, ref);

  useToolbarRadioButtonStyles_unstable(state);

  useCustomStyleHook_unstable('useToolbarRadioButtonStyles_unstable')(state);

  return renderToggleButton_unstable(state);
}) as ForwardRefComponent<ToolbarRadioButtonProps>;

ToolbarRadioButton.displayName = 'ToolbarRadioButton';
