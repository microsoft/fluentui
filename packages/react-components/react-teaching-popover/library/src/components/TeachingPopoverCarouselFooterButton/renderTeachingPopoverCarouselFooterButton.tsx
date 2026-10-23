/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselFooterButtonState,
  TeachingPopoverCarouselFooterButtonBaseState,
  TeachingPopoverCarouselFooterButtonSlots,
} from './TeachingPopoverCarouselFooterButton.types';

/**
 * Render the final JSX of TeachingPopoverCarouselFooterButton
 */
export const renderTeachingPopoverCarouselFooterButton_unstable = (
  state: TeachingPopoverCarouselFooterButtonState | TeachingPopoverCarouselFooterButtonBaseState,
): JSXElement => {
  assertSlots<TeachingPopoverCarouselFooterButtonSlots>(state);

  return <state.root />;
};
