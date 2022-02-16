import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { OptionGroupState, OptionGroupSlots } from './OptionGroup.types';

/**
 * Render the final JSX of OptionGroup
 */
export const renderOptionGroup_unstable = (state: OptionGroupState) => {
  const { slots, slotProps } = getSlots<OptionGroupSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
