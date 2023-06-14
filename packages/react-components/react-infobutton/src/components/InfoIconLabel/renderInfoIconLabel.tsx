/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { InfoIconLabelState, InfoIconLabelSlots } from './InfoIconLabel.types';

/**
 * Render the final JSX of InfoIconLabel
 */
export const renderInfoIconLabel_unstable = (state: InfoIconLabelState) => {
  const { slots, slotProps } = getSlotsNext<InfoIconLabelSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
