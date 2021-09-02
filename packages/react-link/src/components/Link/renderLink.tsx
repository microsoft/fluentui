import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { linkShorthandProps } from './useLink';
import type { LinkSlots, LinkState } from './Link.types';

/**
 * Defines the render function. Given the state of a Link, renders it.
 */
export const renderLink = (state: LinkState) => {
  const { slots, slotProps } = getSlots<LinkSlots>(state, linkShorthandProps);

  return <slots.root {...slotProps.root} />;
};
