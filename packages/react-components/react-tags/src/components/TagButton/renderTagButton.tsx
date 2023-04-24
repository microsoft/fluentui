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
  return <slots.root {...slotProps.root} />;
};
