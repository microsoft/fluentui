import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { linkShorthandProps } from './useLink';
import type { LinkState } from './Link.types';

/**
 * Defines the render function. Given the state of a Link, renders it.
 */
export const renderLink = (state: LinkState) => {
  const { slots, slotProps } = getSlotsCompat(state, linkShorthandProps);

  return <slots.root {...slotProps.root} />;
};
