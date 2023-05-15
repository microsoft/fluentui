/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type {
  TreeItemPersonaLayoutState,
  TreeItemPersonaLayoutSlots,
  TreeItemPersonaLayoutContextValues,
} from './TreeItemPersonaLayout.types';
import { AvatarContextProvider } from '@fluentui/react-avatar';

/**
 * Render the final JSX of TreeItemPersonaLayout
 */
export const renderTreeItemPersonaLayout_unstable = (
  state: TreeItemPersonaLayoutState,
  contextValues: TreeItemPersonaLayoutContextValues,
) => {
  const { slots, slotProps } = getSlotsNext<TreeItemPersonaLayoutSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.expandIcon && <slots.expandIcon {...slotProps.expandIcon} />}
      <AvatarContextProvider value={contextValues.avatar}>
        <slots.media {...slotProps.media} />
      </AvatarContextProvider>
      <slots.content {...slotProps.content}>
        <slots.main {...slotProps.main} />
        {slots.description && <slots.description {...slotProps.description} />}
      </slots.content>
    </slots.root>
  );
};
