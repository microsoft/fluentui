/* eslint-disable react/no-danger */
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
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .test {
            display: flex;
            flex-direction: ${state.direction || 'row'};
            flex-wrap: nowrap;
            justify-content: ${state.horizontalAlign || 'normal'};
            align-items: normal;
          }

          .test > * {
            margin: 0;
            order: 0;
            flex-grow: 0;
            flex-shrink: 1;
            flex-basis: auto;
            align-self: auto;
          }`,
        }}
      />
      <slots.root {...slotProps.root} className="test">
        {/* TODO Add additional slots in the appropritate place */}
        {state.children}
      </slots.root>
    </>
  );
};
