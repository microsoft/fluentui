import { makeStyles, mergeClasses } from '@griffel/react';
import type { TeachingPopoverCarouselSlots, TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const teachingPopoverCarouselClassNames: SlotClassNames<TeachingPopoverCarouselSlots> = {
  root: 'fui-TeachingPopoverCarousel',
  footer: 'fui-TeachingPopoverCarousel__footer',
};

// Todo: Page change animation & styles
const useStyles = makeStyles({
  root: {},
  footer: {},
});

/** Applies style classnames to slots */
export const useTeachingPopoverCarouselStyles_unstable = (state: TeachingPopoverCarouselState) => {
  const styles = useStyles();

  state.root.className = mergeClasses(teachingPopoverCarouselClassNames.root, styles.root, state.root.className);
  state.footer.className = mergeClasses(
    teachingPopoverCarouselClassNames.footer,
    styles.footer,
    state.footer.className,
  );

  return state;
};
