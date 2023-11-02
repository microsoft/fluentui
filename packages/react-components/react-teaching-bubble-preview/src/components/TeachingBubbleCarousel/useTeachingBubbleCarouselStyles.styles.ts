import { makeStyles, mergeClasses } from '@griffel/react';
import type { TeachingBubbleCarouselSlots, TeachingBubbleCarouselState } from './TeachingBubbleCarousel.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const TeachingBubbleCarouselClassNames: SlotClassNames<TeachingBubbleCarouselSlots> = {
  root: 'fui-TeachingBubbleCarousel',
};

// Todo: Page change animation & styles
const useStyles = makeStyles({
  root: {},
});

/** Applies style classnames to slots */
export const useTeachingBubbleCarouselStyles_unstable = (state: TeachingBubbleCarouselState) => {
  const styles = useStyles();

  state.root.className = mergeClasses(TeachingBubbleCarouselClassNames.root, styles.root, state.root.className);

  return state;
};
