import * as React from 'react';
import type { ToolbarRadioProps } from './ToolbarRadio.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderToggleButton_unstable } from '@fluentui/react-button';
import { useToolbarRadio_unstable } from './useToolbarRadio';
import { useToolbarRadioStyles_unstable } from './useToolbarRadioStyles';

/**
 * ToolbarToggleButton component
 */
export const ToolbarRadio: ForwardRefComponent<ToolbarRadioProps> = React.forwardRef((props, ref) => {
  const state = useToolbarRadio_unstable(props, ref);

  useToolbarRadioStyles_unstable(state);
  return renderToggleButton_unstable(state);
}) as ForwardRefComponent<ToolbarRadioProps>;

ToolbarRadio.displayName = 'ToolbarRadio';
