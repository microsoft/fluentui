/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { PrimaryState, PrimarySlots, PrimaryContextValues } from './Primary.types';
import { AvatarContextProvider } from '@fluentui/react-avatar';

/**
 * Render the final JSX of Primary
 */
export const renderPrimary_unstable = (state: PrimaryState, contextValues: PrimaryContextValues) => {
  const { slots, slotProps } = getSlotsNext<PrimarySlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.media && (
        <AvatarContextProvider value={contextValues.avatar}>
          <slots.media {...slotProps.media} />
        </AvatarContextProvider>
      )}
      {slots.icon && <slots.icon {...slotProps.icon} />}
      {slots.primaryText && <slots.primaryText {...slotProps.primaryText}>{slotProps.root.children}</slots.primaryText>}
      {slots.secondaryText && <slots.secondaryText {...slotProps.secondaryText} />}
    </slots.root>
  );
};
