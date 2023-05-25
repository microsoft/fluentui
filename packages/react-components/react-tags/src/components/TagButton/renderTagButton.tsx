/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { TagButtonState, TagButtonSlots, TagButtonContextValues } from './TagButton.types';
import { AvatarContextProvider } from '@fluentui/react-avatar';

/**
 * Render the final JSX of TagButton
 */
export const renderTagButton_unstable = (state: TagButtonState, contextValues: TagButtonContextValues) => {
  const { slots, slotProps } = getSlotsNext<TagButtonSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.content && (
        <slots.content {...slotProps.content}>
          {slots.media && (
            <AvatarContextProvider value={contextValues.avatar}>
              <slots.media {...slotProps.media} />
            </AvatarContextProvider>
          )}
          {slots.icon && <slots.icon {...slotProps.icon} />}
          {slots.primaryText && (
            <slots.primaryText {...slotProps.primaryText}>{slotProps.root.children}</slots.primaryText>
          )}
          {slots.secondaryText && <slots.secondaryText {...slotProps.secondaryText} />}
        </slots.content>
      )}
      {slots.dismissButton && state.dismissible && <slots.dismissButton {...slotProps.dismissButton} />}
    </slots.root>
  );
};
