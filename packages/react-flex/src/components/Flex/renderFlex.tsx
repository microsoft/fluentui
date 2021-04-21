import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { FlexState } from './Flex.types';

/**
 * Render the final JSX of Flex
 * {@docCategory Flex }
 */
export const renderFlex = (state: FlexState) => {
  const { slots, slotProps } = getSlots(state);

  return <slots.root {...slotProps.root}>{state.children}</slots.root>;
};
