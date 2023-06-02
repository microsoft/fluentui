/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { SearchBoxSlots, SearchBoxState } from './SearchBox.types';

/**
 * Render the final JSX of SearchBox
 */
export const renderSearchBox_unstable = (state: SearchBoxState) => {
  const { slots, slotProps } = getSlotsNext<SearchBoxSlots>(state);
  return (
    <slots.root {...slotProps.root}>
      {slots.contentBefore && <slots.contentBefore {...slotProps.contentBefore} />}
      <slots.input {...slotProps.input} />
      {slots.contentAfter && <slots.contentAfter {...slotProps.contentAfter} />}
      {slots.dismiss && <slots.dismiss {...slotProps.dismiss} />}
    </slots.root>
  );
};
