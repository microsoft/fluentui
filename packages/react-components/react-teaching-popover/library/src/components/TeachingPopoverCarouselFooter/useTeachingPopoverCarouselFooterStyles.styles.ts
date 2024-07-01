import { makeStyles, mergeClasses } from '@griffel/react';
import type {
  TeachingPopoverCarouselFooterSlots,
  TeachingPopoverCarouselFooterState,
} from './TeachingPopoverCarouselFooter.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const teachingPopoverCarouselFooterClassNames: SlotClassNames<TeachingPopoverCarouselFooterSlots> = {
  root: 'fui-TeachingPopoverCarouselFooter',
  previous: 'fui-TeachingPopoverCarouselFooter__previous',
  next: 'fui-TeachingPopoverCarouselFooter__next',
};

// Todo: Page change animation & styles
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  rootCentered: {
    justifyContent: 'space-between',
    gap: '8px',
  },
  rootRightAligned: {
    gap: '8px',
    '& :first-child': {
      marginInlineEnd: 'auto',
    },
  },
});

/** Applies style classnames to slots */
export const useTeachingPopoverCarouselFooterStyles_unstable = (state: TeachingPopoverCarouselFooterState) => {
  'use no memo';

  const styles = useStyles();
  const { layout } = state;

  state.root.className = mergeClasses(
    teachingPopoverCarouselFooterClassNames.root,
    styles.root,
    layout === 'centered' ? styles.rootCentered : styles.rootRightAligned,
    state.root.className,
  );

  if (state.previous) {
    state.previous.className = mergeClasses(teachingPopoverCarouselFooterClassNames.previous, state.previous.className);
  }

  state.next.className = mergeClasses(teachingPopoverCarouselFooterClassNames.next, state.next.className);

  return state;
};
