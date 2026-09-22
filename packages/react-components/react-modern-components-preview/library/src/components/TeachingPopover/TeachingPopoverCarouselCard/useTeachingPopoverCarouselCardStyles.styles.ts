import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselCardSlots,
  TeachingPopoverCarouselCardState,
} from './TeachingPopoverCarouselCard.types';

export const teachingPopoverCarouselCardClassNames: SlotClassNames<TeachingPopoverCarouselCardSlots> = {
  root: 'fui-TeachingPopoverCarouselCard',
};

export const useTeachingPopoverCarouselCardStyles = (
  state: TeachingPopoverCarouselCardState,
): TeachingPopoverCarouselCardState => {
  state.root.className = clsx(teachingPopoverCarouselCardClassNames.root, state.root.className);
  return state;
};
