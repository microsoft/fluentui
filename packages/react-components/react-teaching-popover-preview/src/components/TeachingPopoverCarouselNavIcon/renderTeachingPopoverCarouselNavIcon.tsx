/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselNavIconState,
  TeachingPopoverCarouselNavIconSlots,
} from './TeachingPopoverCarouselNavIcon.types';

/**
 * Render the final JSX of TeachingPopoverCarouselNavIcon
 */
export const renderTeachingPopoverCarouselNavIcon_unstable = (state: TeachingPopoverCarouselNavIconState) => {
  assertSlots<TeachingPopoverCarouselNavIconSlots>(state);

  return (
    <state.root>
      <state.navButton />
    </state.root>
  );
};
