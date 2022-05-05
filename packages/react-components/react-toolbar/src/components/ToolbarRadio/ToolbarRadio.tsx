import * as React from 'react';
import { useToolbarRadio_unstable } from './useToolbarRadio';
import { renderToolbarRadio_unstable } from './renderToolbarRadio';
import { useToolbarRadioStyles_unstable } from './useToolbarRadioStyles';
import type { ToolbarRadioProps } from './ToolbarRadio.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * ToolbarRadio component - TODO: add more docs
 */
export const ToolbarRadio: ForwardRefComponent<ToolbarRadioProps> = React.forwardRef((props, ref) => {
  const state = useToolbarRadio_unstable(props, ref);

  useToolbarRadioStyles_unstable(state);
  return renderToolbarRadio_unstable(state);
});

ToolbarRadio.displayName = 'ToolbarRadio';
