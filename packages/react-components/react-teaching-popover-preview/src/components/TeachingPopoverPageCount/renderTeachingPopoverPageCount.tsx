/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import * as React from 'react';
import type {
  TeachingPopoverPageCountChildRenderFunction,
  TeachingPopoverPageCountRenderType,
  TeachingPopoverPageCountState,
} from './TeachingPopoverPageCount.types';
import { assertSlots } from '@fluentui/react-utilities';
import { TeachingPopoverPageCountSlots } from './TeachingPopoverPageCount.types';

/**
 * Render the final JSX of TeachingPopoverPageCount
 */
export const renderTeachingPopoverPageCount_unstable = (
  state: TeachingPopoverPageCountState,
): TeachingPopoverPageCountRenderType => {
  assertSlots<TeachingPopoverPageCountSlots>(state);

  const { setCurrentPage, currentPage, totalPages, countStyle } = state;

  if (totalPages <= 1) {
    // We don't need pagination for one or zero pages
    return null;
  }
  // Can be function for additional localization or page knowledge
  if (typeof state.root.children === 'function') {
    const renderFunc = state.root.children as TeachingPopoverPageCountChildRenderFunction;
    // Allow the user to inject their own return with page knowledge
    return renderFunc(currentPage + 1, totalPages);
  } else if (countStyle === 'text') {
    // Users pass localized text as child (i.e. 'of').
    // If users do not pass in localized text, default to iconography '/'
    return (
      <state.root>
        {`${currentPage + 1} `}
        {state.root.children ?? '/'}
        {` ${totalPages}`}
      </state.root>
    );
  } else {
    const carouselIconKey = 'fui-carouselIcon-';
    // Icon format
    const icons = [];
    for (let i = 0; i < totalPages; i++) {
      if (currentPage === i) {
        icons.push(<state.carouselSelectedIcon key={carouselIconKey + i} data-index={i} />);
      } else {
        icons.push(<state.carouselIcon key={carouselIconKey + i} data-index={i} />);
      }
    }

    return <state.root>{icons}</state.root>;
  }
};
