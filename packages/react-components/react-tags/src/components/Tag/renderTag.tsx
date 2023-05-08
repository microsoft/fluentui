/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { TagState, TagSlots } from './Tag.types';

/**
 * Render the final JSX of Tag
 */
export const renderTag_unstable = (state: TagState) => {
  const { slots, slotProps } = getSlotsNext<TagSlots>(state);

  // TODO Add additional slots in the appropriate place
  return (
    <slots.root {...slotProps.root}>
      {slots.content && (
        <slots.content {...slotProps.content}>
          {slots.avatar && <slots.avatar {...slotProps.avatar} />}
          {slots.icon && <slots.icon {...slotProps.icon} />}
          {slots.primaryText && <slots.primaryText {...slotProps.primaryText} />}
          {slots.secondaryText && <slots.secondaryText {...slotProps.secondaryText} />}
        </slots.content>
      )}
      {slots.dismissButton && state.dismissable && <slots.dismissButton {...slotProps.dismissButton} />}
    </slots.root>
  );
};
