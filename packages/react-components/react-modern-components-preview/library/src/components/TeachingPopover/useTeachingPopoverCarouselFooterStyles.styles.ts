import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselFooterSlots,
  TeachingPopoverCarouselFooterState,
} from './TeachingPopoverCarouselFooter.types';
import styles from './TeachingPopoverCarouselFooter.module.css';

export const teachingPopoverCarouselFooterClassNames: SlotClassNames<TeachingPopoverCarouselFooterSlots> = {
  root: 'fui-TeachingPopoverCarouselFooter',
  previous: 'fui-TeachingPopoverCarouselFooter__previous',
  next: 'fui-TeachingPopoverCarouselFooter__next',
};

export const useTeachingPopoverCarouselFooterStyles = (
  state: TeachingPopoverCarouselFooterState,
): TeachingPopoverCarouselFooterState => {
  state.root.className = clsx(teachingPopoverCarouselFooterClassNames.root, styles.root, state.root.className);
  if (state.previous) {
    state.previous.className = clsx(teachingPopoverCarouselFooterClassNames.previous, state.previous.className);
  }
  state.next.className = clsx(teachingPopoverCarouselFooterClassNames.next, state.next.className);
  return state;
};
