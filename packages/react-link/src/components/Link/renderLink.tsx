import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { LinkState } from './Link.types';
import { linkShorthandProps } from './useLink';

/**
 * Defines the render function. Given the state of a Link, renders it.
 */
export const renderLink = (state: LinkState) => {
  const { slots, slotProps } = getSlots(state, linkShorthandProps);

  return <slots.root {...slotProps.root} />;
};
