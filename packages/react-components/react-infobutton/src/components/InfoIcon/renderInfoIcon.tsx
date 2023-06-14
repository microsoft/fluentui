/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { InfoIconState, InfoIconSlots } from './InfoIcon.types';

/**
 * Render the final JSX of InfoIcon
 */
export const renderInfoIcon_unstable = (state: InfoIconState) => {
  const { slots, slotProps } = getSlotsNext<InfoIconSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
