import * as React from 'react';
import type { ToolbarRadioGroupProps } from './ToolbarRadioGroup.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useRadioGroup_unstable, renderRadioGroup_unstable } from '@fluentui/react-radio';
import { useToolbarRadioGroupStyles_unstable } from './useToolbarRadioGroupStyles';
import { useRadioGroupContextValues } from './contexts/useRadioGroupContextValues';

/**
 * ToolbarRadioGroup component is a RadioGroup to be used inside Toolbar
 * which will keep always horizontal layout
 */
export const ToolbarRadioGroup: ForwardRefComponent<ToolbarRadioGroupProps> = React.forwardRef((props, ref) => {
  const state = useRadioGroup_unstable({ layout: 'horizontal', ...props }, ref);
  const contextValues = useRadioGroupContextValues(state);
  useToolbarRadioGroupStyles_unstable(state);
  return renderRadioGroup_unstable(state, contextValues);
});

ToolbarRadioGroup.displayName = 'ToolbarRadioGroup';
