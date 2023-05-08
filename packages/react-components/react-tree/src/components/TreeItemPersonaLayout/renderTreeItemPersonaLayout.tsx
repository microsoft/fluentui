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
  const { isActionsVisible } = state;
  const { slots, slotProps } = getSlotsNext<TreeItemPersonaLayoutSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.media && (
        <AvatarContextProvider value={contextValues.avatar}>
          <slots.media {...slotProps.media} />
        </AvatarContextProvider>
      )}
      {slots.content && (
        <slots.content {...slotProps.content}>
          {slots.main && <slots.main {...slotProps.main} />}
          {slots.description && <slots.description {...slotProps.description} />}
        </slots.content>
      )}
      {!isActionsVisible && slots.aside && <slots.aside {...slotProps.aside} />}
    </slots.root>
  );
};
