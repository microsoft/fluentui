import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { LinkSlots, LinkState } from './Link.types';

/**
 * Renders a Link component by passing the state defined props to the appropriate slots.
 */
export const renderLink_unstable = (state: LinkState) => {
  const { slots, slotProps } = getSlots<LinkSlots>(state);

  return <slots.root {...slotProps.root} />;
};
