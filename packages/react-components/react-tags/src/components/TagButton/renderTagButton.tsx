/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { TagButtonState, TagButtonSlots } from './TagButton.types';

/**
 * Render the final JSX of TagButton
 */
export const renderTagButton_unstable = (state: TagButtonState) => {
  const { slots, slotProps } = getSlotsNext<TagButtonSlots>(state);

  // TODO Add additional slots in the appropriate place
  return (
    <slots.root {...slotProps.root}>
      {slots.contentButton && (
        <slots.contentButton {...slotProps.contentButton}>
          {slots.avatar && <slots.avatar {...slotProps.avatar} />}
          {slots.icon && <slots.icon {...slotProps.icon} />}
          {slots.primaryText && <slots.primaryText {...slotProps.primaryText} />}
          {slots.secondaryText && <slots.secondaryText {...slotProps.secondaryText} />}
        </slots.contentButton>
      )}
      {slots.dismissButton && state.dismissable && <slots.dismissButton {...slotProps.dismissButton} />}
    </slots.root>
  );
};
