/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import type { TeachingPopoverCarouselCardState } from './TeachingPopoverCarouselCard.types';
import { TeachingPopoverCarouselCardSlots } from './TeachingPopoverCarouselCard.types';
import { assertSlots } from '@fluentui/react-utilities';

/**
 * Render the final JSX of TeachingPopoverCarouselCard
 */
export const renderTeachingPopoverCarouselCard_unstable = (state: TeachingPopoverCarouselCardState) => {
  assertSlots<TeachingPopoverCarouselCardSlots>(state);

  return <state.root />;
};
