import * as React from 'react';
import type { ToolbarRadioProps } from './ToolbarRadio.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useRadio_unstable, renderRadio_unstable } from '@fluentui/react-radio';
import { useToolbarRadioStyles_unstable } from './useToolbarRadioStyles';
import { useToolbarContext } from '../Toolbar/ToolbarContext';

/**
 * ToolbarRadio component is a Radio to be used inside Toolbar
 */
export const ToolbarRadio: ForwardRefComponent<ToolbarRadioProps> = React.forwardRef((props, ref) => {
  const { size } = useToolbarContext();
  const state = useRadio_unstable(props, ref);
  useToolbarRadioStyles_unstable({ size, ...state });
  return renderRadio_unstable(state);
}) as ForwardRefComponent<ToolbarRadioProps>;

ToolbarRadio.displayName = 'ToolbarRadio';
