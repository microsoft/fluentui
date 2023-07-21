/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import { AvatarContextProvider } from '@fluentui/react-avatar';
import type { TableCellLayoutState, TableCellLayoutSlots, TableCellLayoutContextValues } from './TableCellLayout.types';

/**
 * Render the final JSX of TableCellLayout
 */
export const renderTableCellLayout_unstable = (
  state: TableCellLayoutState,
  contextValues: TableCellLayoutContextValues,
) => {
  const { slots, slotProps } = getSlotsNext<TableCellLayoutSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.media && (
        <AvatarContextProvider value={contextValues.avatar}>
          <slots.media {...slotProps.media} />
        </AvatarContextProvider>
      )}
      {slots.content && (
        <slots.content {...slotProps.content}>
          {slots.main && <slots.main {...slotProps.main}>{slotProps.root.children}</slots.main>}
          {slots.description && <slots.description {...slotProps.description} />}
        </slots.content>
      )}
    </slots.root>
  );
};
