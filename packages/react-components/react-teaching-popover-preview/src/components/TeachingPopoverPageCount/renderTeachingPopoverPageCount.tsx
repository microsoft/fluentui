/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import * as React from 'react';
import type {
  TeachingPopoverPageCountRenderType,
  TeachingPopoverPageCountState,
} from './TeachingPopoverPageCount.types';
import { getSlotsNext } from '@fluentui/react-utilities';
import { TeachingPopoverPageCountSlots } from './TeachingPopoverPageCount.types';

/**
 * Render the final JSX of TeachingPopoverPageCount
 */
export const renderTeachingPopoverPageCount_unstable = (
  state: TeachingPopoverPageCountState,
): TeachingPopoverPageCountRenderType => {
  const { slots, slotProps } = getSlotsNext<TeachingPopoverPageCountSlots>(state);

  const { setCurrentPage, currentPage, totalPages, countStyle } = state;

  if (totalPages <= 1) {
    // We don't need pagination for one or zero pages
    return null;
  }
  // Can be function for additional localization or page knowledge
  if (typeof slotProps.root.children === 'function') {
    // Allow the user to inject their own return with page knowledge
    return slotProps.root.children(currentPage + 1, totalPages);
  } else if (countStyle === 'text') {
    // Users pass localized text as child (i.e. 'of').
    // If users do not pass in localized text, default to iconography '/'
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
