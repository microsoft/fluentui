/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import type { TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';
import { TeachingPopoverCarouselSlots } from './TeachingPopoverCarousel.types';
import { assertSlots } from '@fluentui/react-utilities';
import { TeachingPopoverCarouselContextValue, TeachingPopoverCarouselProvider } from './TeachingPopoverCarouselContext';

/**
 * Render the final JSX of TeachingPopoverCarousel
 */
export const renderTeachingPopoverCarousel_unstable = (
  state: TeachingPopoverCarouselState,
  contextValues: TeachingPopoverCarouselContextValue,
) => {
  assertSlots<TeachingPopoverCarouselSlots>(state);

  const { carouselLayout } = state;

  return (
    <TeachingPopoverCarouselProvider value={contextValues}>
      <state.root>
        {state.root.children}
        <state.footer>
          {carouselLayout === 'centered' && state.previous && <state.previous />}
          <state.nav />
          {carouselLayout === 'offset' && state.previous && <state.previous />}
          <state.next />
        </state.footer>
      </state.root>
    </TeachingPopoverCarouselProvider>
  );
};
