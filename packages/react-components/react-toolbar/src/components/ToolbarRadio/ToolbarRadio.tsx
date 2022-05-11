import * as React from 'react';
import type { ToolbarRadioProps } from './ToolbarRadio.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useRadio_unstable, useRadioStyles_unstable, renderRadio_unstable } from '@fluentui/react-radio';

/**
 * ToolbarRadio component is a Radio to be used inside Toolbar
 */
export const ToolbarRadio: ForwardRefComponent<ToolbarRadioProps> = React.forwardRef((props, ref) => {
  const state = useRadio_unstable(props, ref);

  useRadioStyles_unstable(state);
  return renderRadio_unstable(state);
}) as ForwardRefComponent<ToolbarRadioProps>;

ToolbarRadio.displayName = 'ToolbarRadio';
