/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { InteractionTagState, InteractionTagSlots, InteractionTagContextValues } from './InteractionTag.types';
import { AvatarContextProvider } from '@fluentui/react-avatar';

/**
 * Render the final JSX of InteractionTag
 */
export const renderInteractionTag_unstable = (
  state: InteractionTagState,
  contextValues: InteractionTagContextValues,
) => {
  const { slots, slotProps } = getSlotsNext<InteractionTagSlots>(state);

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
