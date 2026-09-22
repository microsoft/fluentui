import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselSlots, TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';

export const teachingPopoverCarouselClassNames: SlotClassNames<TeachingPopoverCarouselSlots> = {
  root: 'fui-TeachingPopoverCarousel',
};

export const useTeachingPopoverCarouselStyles = (state: TeachingPopoverCarouselState): TeachingPopoverCarouselState => {
  state.root.className = clsx(teachingPopoverCarouselClassNames.root, state.root.className);
  return state;
};
