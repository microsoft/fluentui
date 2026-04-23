'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToolbarRadioGroupProps } from './ToolbarRadioGroup.types';
import { useToolbarRadioGroup } from './useToolbarRadioGroup';
import { renderToolbarRadioGroup } from './renderToolbarRadioGroup';

/**
 * A radio group component used inside a Toolbar to group mutually exclusive toggle controls.
 */
export const ToolbarRadioGroup: ForwardRefComponent<ToolbarRadioGroupProps> = React.forwardRef((props, ref) => {
  const state = useToolbarRadioGroup(props, ref);

  return renderToolbarRadioGroup(state);
  // Casting is required due to lack of distributive union to support unions on @types/react
}) as ForwardRefComponent<ToolbarRadioGroupProps>;

ToolbarRadioGroup.displayName = 'ToolbarRadioGroup';
