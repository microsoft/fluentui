'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToolbarRadioGroupProps } from './ToolbarRadioGroup.types';
import { renderToolbarRadioGroup } from './renderToolbarRadioGroup';
import { useToolbarRadioGroup } from './useToolbarRadioGroup';
import { useToolbarRadioGroupStyles } from './useToolbarRadioGroupStyles.styles';

export const ToolbarRadioGroup: ForwardRefComponent<ToolbarRadioGroupProps> = React.forwardRef((props, ref) => {
  const state = useToolbarRadioGroup(props, ref);

  useToolbarRadioGroupStyles(state);

  return renderToolbarRadioGroup(state);
});

ToolbarRadioGroup.displayName = 'ToolbarRadioGroup';
