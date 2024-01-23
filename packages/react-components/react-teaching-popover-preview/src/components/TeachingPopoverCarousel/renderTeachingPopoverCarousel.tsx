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

  return (
    <state.root>
      {state.root.children}
      <state.footer>
        {state.previous && <state.previous />}
        <state.pageCount />
        <state.next />
      </state.footer>
    </state.root>
  );
};
