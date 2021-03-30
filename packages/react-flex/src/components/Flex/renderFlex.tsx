import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { FlexState } from './Flex.types';
import { flexShorthandProps } from './useFlex';

/**
 * Render the final JSX of Flex
 * {@docCategory Flex }
 */
export const renderFlex = (state: FlexState) => {
  const { slots, slotProps } = getSlots(state, flexShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      {/* TODO Add additional slots in the appropritate place */}
      {state.children}
    </slots.root>
  );
};
