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

  const contentVisible = children;

  return (
    <slots.root {...slotProps.root} role="separator">
      {contentVisible && <div>{children}</div>}
    </slots.root>
  );

  // return contentVisible ? (
  //   <slots.root {...slotProps.root} role="separator">
  //     <div>{children}</div>
  //   </slots.root>
  // ) : (
  //   <slots.root {...slotProps.root} role="separator" />
  // );
};
