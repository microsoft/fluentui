/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import type { TeachingPopoverPageCountState } from './TeachingPopoverPageCount.types';
import { assertSlots } from '@fluentui/react-utilities';
import { TeachingPopoverPageCountSlots } from './TeachingPopoverPageCount.types';

/**
 * Render the final JSX of TeachingPopoverPageCount
 */
export const renderTeachingPopoverPageCount_unstable = (state: TeachingPopoverPageCountState) => {
  assertSlots<TeachingPopoverPageCountSlots>(state);

  const { currentPage, totalPages, countStyle } = state;

  if (totalPages <= 1) {
    // We don't need pagination for one or zero pages
    return null;
  }

  if (countStyle === 'text') {
    return <state.root />;
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
