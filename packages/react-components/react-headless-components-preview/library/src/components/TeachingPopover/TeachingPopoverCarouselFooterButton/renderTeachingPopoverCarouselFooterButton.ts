import { renderTeachingPopoverCarouselFooterButton_unstable } from '@fluentui/react-teaching-popover';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselFooterButtonState } from './TeachingPopoverCarouselFooterButton.types';

export const renderTeachingPopoverCarouselFooterButton = (
  state: TeachingPopoverCarouselFooterButtonState,
): JSXElement =>
  renderTeachingPopoverCarouselFooterButton_unstable(
    state as Parameters<typeof renderTeachingPopoverCarouselFooterButton_unstable>[0],
  );
