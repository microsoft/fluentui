import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { ToolbarState, ToolbarSlots, ToolbarContextValues } from './Toolbar.types';
import { ToolbarContext } from './ToolbarContext';

/**
 * Render the final JSX of Toolbar
 */
export const renderToolbar_unstable = (state: ToolbarState, contextValues: ToolbarContextValues) => {
  const { slots, slotProps } = getSlots<ToolbarSlots>(state);

  return (
    <ToolbarContext.Provider value={contextValues.toolbar}>
      <slots.root {...slotProps.root}>{slotProps.root.children}</slots.root>
    </ToolbarContext.Provider>
  );
};
