/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { TagState, TagSlots, TagContextValues } from './Tag.types';
import { AvatarContextProvider } from '@fluentui/react-avatar';

/**
 * Render the final JSX of Tag
 */
export const renderTag_unstable = (state: TagState, contextValues: TagContextValues) => {
  const { slots, slotProps } = getSlotsNext<TagSlots>(state);

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
      {slots.dismissButton && state.dismissable && <slots.dismissButton {...slotProps.dismissButton} />}
    </slots.root>
  );
};
