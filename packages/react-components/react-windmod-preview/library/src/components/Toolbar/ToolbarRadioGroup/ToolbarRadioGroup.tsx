'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderToolbarRadioGroup, useToolbarRadioGroup } from '@fluentui/react-headless-components-preview/toolbar';

import type { ToolbarRadioGroupProps } from './ToolbarRadioGroup.types';
import { useToolbarRadioGroupStyles } from './useToolbarRadioGroupStyles';

/**
 * A ToolbarRadioGroup clusters ToolbarRadioButtons into one radio group. Windmod
 * ToolbarRadioGroup: the headless group decorated with the Fluent visual contract
 * (Tailwind v4 + CSS Modules).
 */
export const ToolbarRadioGroup: ForwardRefComponent<ToolbarRadioGroupProps> = React.forwardRef((props, ref) => {
  const state = useToolbarRadioGroup(props, ref);

  return renderToolbarRadioGroup(useToolbarRadioGroupStyles(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<ToolbarRadioGroupProps>;

ToolbarRadioGroup.displayName = 'ToolbarRadioGroup';
