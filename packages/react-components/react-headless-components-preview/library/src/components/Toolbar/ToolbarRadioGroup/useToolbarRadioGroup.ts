'use client';

import type * as React from 'react';
import { useToolbarGroup } from '../ToolbarGroup/useToolbarGroup';

import type { ToolbarRadioGroupProps, ToolbarRadioGroupState } from './ToolbarRadioGroup.types';

/**
 * Returns the state for a ToolbarRadioGroup component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderToolbarRadioGroup`.
 */
export const useToolbarRadioGroup = (
  props: ToolbarRadioGroupProps,
  ref: React.Ref<HTMLDivElement>,
): ToolbarRadioGroupState => {
  'use no memo'; // justified: compiler would optimize useToolbarRadioGroup — manual opt-out to preserve runtime behavior

  // ToolbarRadioGroup reuses ToolbarGroup logic with role='radiogroup'.
  return useToolbarGroup({ role: 'radiogroup', ...props }, ref) as unknown as ToolbarRadioGroupState;
};
