/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { InfoButtonLabelState, InfoButtonLabelSlots } from './InfoButtonLabel.types';

/**
 * Render the final JSX of InfoButtonLabel
 */
export const renderInfoButtonLabel_unstable = (state: InfoButtonLabelState) => {
  const { slots, slotProps } = getSlotsNext<InfoButtonLabelSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
