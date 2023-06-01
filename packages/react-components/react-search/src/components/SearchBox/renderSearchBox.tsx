/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { SearchBoxState, SearchBoxSlots } from './SearchBox.types';

/**
 * Render the final JSX of SearchBox
 */
export const renderSearchBox_unstable = (state: SearchBoxState) => {
  const { slots, slotProps } = getSlotsNext<SearchBoxSlots>(state);

  // TODO Add additional slots in the appropriate place

  return (
    <slots.root
      {...slotProps.root}
      contentBefore={slots.contentBefore && <slots.contentBefore {...slotProps.contentBefore} />}
      contentAfter={
        slots.contentAfter && (
          <slots.contentAfter {...slotProps.contentAfter}>
            {slotProps.contentAfter.children}
            {slots.dismiss && <slots.dismiss {...slotProps.dismiss} />}
          </slots.contentAfter>
        )
      }
    />
  );
};
