import { clsx } from 'clsx';
import type {
  TeachingPopoverCarouselFooterSlots,
  TeachingPopoverCarouselFooterState,
} from './TeachingPopoverCarouselFooter.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import styles from './TeachingPopoverCarouselFooter.module.css';

export const teachingPopoverCarouselFooterClassNames: SlotClassNames<TeachingPopoverCarouselFooterSlots> = {
  root: 'fui-TeachingPopoverCarouselFooter',
  previous: 'fui-TeachingPopoverCarouselFooter__previous',
  next: 'fui-TeachingPopoverCarouselFooter__next',
};

/** Applies style classnames to slots */
export const useTeachingPopoverCarouselFooterStyles_unstable = (
  state: TeachingPopoverCarouselFooterState,
): TeachingPopoverCarouselFooterState => {
  const { layout } = state;

  state.root.className = clsx(
    teachingPopoverCarouselFooterClassNames.root,
    styles.root,
    layout === 'centered' ? styles.centered : styles.rightAligned,
    state.root.className,
  );

  if (state.previous) {
    state.previous.className = clsx(teachingPopoverCarouselFooterClassNames.previous, state.previous.className);
  }

  state.next.className = clsx(teachingPopoverCarouselFooterClassNames.next, state.next.className);

  return state;
};
