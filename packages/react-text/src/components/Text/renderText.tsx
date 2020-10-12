import * as React from 'react';
import { getSlots } from '@fluentui/react-compose/lib/next/index';

import { TextProps } from './Text.types';

/**
 * Define the render function. Given the state of a text, renders it.
 */
export const renderText = (state: TextProps) => {
  const { slots, slotProps } = getSlots(state, [] /* there are no slots in Text */);

  return <slots.root {...slotProps.root} />;
};
