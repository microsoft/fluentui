/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { CardPreviewSlots, CardPreviewState } from './CardPreview.types';

/**
 * Render the final JSX of CardPreview.
 */
export const renderCardPreview_unstable = (state: CardPreviewState) => {
  const { slots, slotProps } = getSlotsNext<CardPreviewSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slotProps.root.children}
      {slots.logo && <slots.logo {...slotProps.logo} />}
    </slots.root>
  );
};
