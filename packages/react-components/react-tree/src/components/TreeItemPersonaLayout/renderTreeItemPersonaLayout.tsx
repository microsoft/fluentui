/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type {
  TreeItemPersonaLayoutState,
  TreeItemPersonaLayoutContextValues,
  TreeItemPersonaLayoutInternalSlots,
} from './TreeItemPersonaLayout.types';
import { AvatarContextProvider } from '@fluentui/react-avatar';
import { ButtonContextProvider } from '@fluentui/react-button';

/**
 * Render the final JSX of TreeItemPersonaLayout
 */
export const renderTreeItemPersonaLayout_unstable = (
  state: TreeItemPersonaLayoutState,
  contextValues: TreeItemPersonaLayoutContextValues,
) => {
  const { slots, slotProps } = getSlotsNext<TreeItemPersonaLayoutInternalSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.expandIcon && <slots.expandIcon {...slotProps.expandIcon} />}
      <AvatarContextProvider value={contextValues.avatar}>
        <slots.media {...slotProps.media} />
      </AvatarContextProvider>
      <slots.content {...slotProps.content} />
      {slots.description && <slots.description {...slotProps.description} />}
      <ButtonContextProvider value={state.buttonContextValue}>
        {slots.actions && <slots.actions {...slotProps.actions} />}
        {slots.aside && <slots.aside {...slotProps.aside} />}
      </ButtonContextProvider>
    </slots.root>
  );
};
