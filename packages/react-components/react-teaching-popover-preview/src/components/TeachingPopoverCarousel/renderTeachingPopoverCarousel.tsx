/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import type { TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';
import { TeachingPopoverCarouselSlots } from './TeachingPopoverCarousel.types';
import { assertSlots } from '@fluentui/react-utilities';
import {
  TeachingPopoverCarouselContextValues,
  TeachingPopoverCarouselProvider,
} from './TeachingPopoverCarouselContext';
import { Carousel_unstable } from './Carousel/Carousel';

/**
 * Render the final JSX of TeachingPopoverCarousel
 */
export const renderTeachingPopoverCarousel_unstable = (
  state: TeachingPopoverCarouselState,
  contextValues: TeachingPopoverCarouselContextValues,
) => {
  assertSlots<TeachingPopoverCarouselSlots>(state);

  const { layout } = state;

  return (
    <TeachingPopoverCarouselProvider value={contextValues.carousel}>
      {Carousel_unstable({
        children: (
          <state.root>
            {state.root.children}
            <state.footer>
              {layout === 'centered' && state.previous && <state.previous />}
              {state.nav && <state.nav />}
              {state.pageCount && <state.pageCount />}
              {layout === 'offset' && state.previous && <state.previous />}
              <state.next />
            </state.footer>
          </state.root>
        ),
      })}
    </TeachingPopoverCarouselProvider>
  );
};
