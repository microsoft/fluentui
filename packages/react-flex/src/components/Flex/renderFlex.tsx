/* eslint-disable react/no-danger */
import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { FlexState } from './Flex.types';

/**
 * Render the final JSX of Flex
 * {@docCategory Flex }
 */
export const renderFlex = (state: FlexState) => {
  const { slots, slotProps } = getSlots(state);

  const direction = state.direction ? state.direction : 'row';
  const horizontalAlign = state.horizontalAlign ? state.horizontalAlign : 'normal';
  const verticalAlign = state.verticalAlign ? state.verticalAlign : 'normal';

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .test {
            display: ${state.inline ? 'inline-flex' : 'flex'};
            flex-direction: ${direction};
            flex-wrap: ${state.wrap ? 'wrap' : 'nowrap'};
            justify-content: ${direction.startsWith('row') ? horizontalAlign : verticalAlign};
            align-items: ${direction.startsWith('row') ? verticalAlign : horizontalAlign};
          }

          .test > * {
            margin: ${state.gap === undefined ? 0 : state.gap};
            order: 0;
            flex-grow: ${state.grow === undefined ? 0 : state.grow};
            flex-shrink: ${state.shrink === undefined ? 1 : state.shrink};
            flex-basis: auto;
            align-self: auto;
          }`,
        }}
      />
      <slots.root {...slotProps.root} className="test">
        {state.children}
      </slots.root>
    </>
  );
};
