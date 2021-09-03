import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { CardPreviewState } from './CardPreview.types';
import { cardPreviewShorthandPropsCompat } from './useCardPreview';

/**
 * Render the final JSX of CardPreview
 */
export const renderCardPreview = (state: CardPreviewState) => {
  const { slots, slotProps } = getSlotsCompat(state, cardPreviewShorthandPropsCompat);

  return (
    <slots.root {...slotProps.root}>
      {state.children}
      <slots.logo {...slotProps.logo} />
    </slots.root>
  );
};
