import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { DividerState } from './Divider.types';
import { dividerShorthandProps } from './useDivider';

/**
 * Function that renders the final JSX of the component
 */
export const renderDivider = (state: DividerState) => {
  const { slots, slotProps } = getSlots(state, dividerShorthandProps);
  const { children } = state;

  const contentVisible = children || slotProps.content?.children;

  return contentVisible ? (
    <slots.root {...slotProps.root}>
      <div>{children}</div>
    </slots.root>
  ) : (
    <slots.root {...slotProps.root} />
  );
};
