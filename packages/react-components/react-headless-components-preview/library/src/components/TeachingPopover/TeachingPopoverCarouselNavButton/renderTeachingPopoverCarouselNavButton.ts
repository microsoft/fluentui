import { renderTeachingPopoverCarouselNavButton_unstable } from '@fluentui/react-teaching-popover';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselNavButtonState } from './TeachingPopoverCarouselNavButton.types';

export const renderTeachingPopoverCarouselNavButton = (state: TeachingPopoverCarouselNavButtonState): JSXElement =>
  renderTeachingPopoverCarouselNavButton_unstable(
    state as Parameters<typeof renderTeachingPopoverCarouselNavButton_unstable>[0],
  );
