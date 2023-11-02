import * as React from 'react';
import type { TeachingBubblePageCountState } from './TeachingBubblePageCount.types';
import { getSlotsNext } from '@fluentui/react-utilities';
import { TeachingBubblePageCountSlots } from './TeachingBubblePageCount.types';

/**
 * Render the final JSX of TeachingBubblePageCount
 */
export const renderTeachingBubblePageCount_unstable = (state: TeachingBubblePageCountState) => {
  const { slots, slotProps } = getSlotsNext<TeachingBubblePageCountSlots>(state);

  const { setCurrentPage, currentPage, totalPages, countStyle } = state;

  if (totalPages <= 1) {
    // We don't need pagination for one or zero pages
    return null;
  }

  if (countStyle === 'text') {
    // Start index of 1
    // Users pass localized text as child (i.e. 'of').
    // If users do not pass in localized text, default to iconography '/'
    // TODO: Confirm this with design - should we just default to 'icons' if no localized text?
    return (
      <slots.root {...slotProps.root}>
        {`${currentPage + 1} `}
        {slotProps.root.children ?? '/'}
        {` ${totalPages}`}
      </slots.root>
    );
  } else {
    const carouselIconKey = 'fui-carouselIcon-';
    // Icon format
    const icons = [];
    for (let i = 0; i < totalPages; i++) {
      if (currentPage === i) {
        icons.push(
          <slots.carouselSelectedIcon
            key={carouselIconKey + i}
            {...slotProps.carouselSelectedIcon}
            onClick={clickEvent => {
              slotProps.carouselSelectedIcon.onClick?.(clickEvent);
              if (clickEvent.defaultPrevented) {
                return;
              }
              setCurrentPage(i);
            }}
          />,
        );
      } else {
        icons.push(
          <slots.carouselIcon
            key={carouselIconKey + i}
            {...slotProps.carouselIcon}
            onClick={clickEvent => {
              slotProps.carouselIcon.onClick?.(clickEvent);
              if (clickEvent.defaultPrevented) {
                return;
              }
              setCurrentPage(i);
            }}
          />,
        );
      }
    }

    return <slots.root {...slotProps.root}>{icons}</slots.root>;
  }
};
