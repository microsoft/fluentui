/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import type { TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';
import { TeachingPopoverCarouselSlots } from './TeachingPopoverCarousel.types';
import { assertSlots } from '@fluentui/react-utilities';

/**
 * Render the final JSX of TeachingPopoverCarousel
 */
export const renderTeachingPopoverCarousel_unstable = (state: TeachingPopoverCarouselState) => {
  assertSlots<TeachingPopoverCarouselSlots>(state);

  const { carouselLayout } = state;

  return (
    <state.root>
      {state.root.children}
      <state.footer>
        {carouselLayout === 'centered' && state.previous && <state.previous />}
        <state.pageCount />
        {carouselLayout === 'offset' && state.previous && <state.previous />}
        <state.next />
      </state.footer>
    </state.root>
  );
};
