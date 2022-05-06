import * as React from 'react';
import { useToolbarRadioGroup_unstable } from './useToolbarRadioGroup';
import { renderToolbarRadioGroup_unstable } from './renderToolbarRadioGroup';
import { useToolbarRadioGroupStyles_unstable } from './useToolbarRadioGroupStyles';
import type { ToolbarRadioGroupProps } from './ToolbarRadioGroup.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * ToolbarRadioGroup component - TODO: add more docs
 */
export const ToolbarRadioGroup: ForwardRefComponent<ToolbarRadioGroupProps> = React.forwardRef((props, ref) => {
  const state = useToolbarRadioGroup_unstable(props, ref);

  useToolbarRadioGroupStyles_unstable(state);
  return renderToolbarRadioGroup_unstable(state);
});

ToolbarRadioGroup.displayName = 'ToolbarRadioGroup';
