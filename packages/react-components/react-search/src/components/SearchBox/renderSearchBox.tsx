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

  const contentBefore = slots.contentBefore && <slots.contentBefore {...slotProps.contentBefore} />;
  const secondaryContentAfter = slots.secondaryContentAfter && (
    <slots.secondaryContentAfter {...slotProps.secondaryContentAfter} />
  );
  const primaryContentAfter = slots.primaryContentAfter && (
    <slots.primaryContentAfter {...slotProps.primaryContentAfter} />
  );
  const contentAfter = secondaryContentAfter && primaryContentAfter;

  // TODO Add additional slots in the appropriate place
  return <slots.root {...(slotProps.root, { contentBefore, contentAfter })} />;
};
