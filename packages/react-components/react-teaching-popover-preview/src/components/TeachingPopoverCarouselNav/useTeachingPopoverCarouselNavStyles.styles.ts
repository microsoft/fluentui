import { makeStyles, mergeClasses } from '@griffel/react';
import type {
  TeachingPopoverCarouselNavSlots,
  TeachingPopoverCarouselNavState,
} from './TeachingPopoverCarouselNav.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const teachingPopoverCarouselNavClassNames: SlotClassNames<TeachingPopoverCarouselNavSlots> = {
  root: 'fui-TeachingPopoverCarouselNav',
};

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'row', columnGap: '4px', alignItems: 'center', justifyContent: 'center' },
});

/** Applies style classnames to slots */
export const useTeachingPopoverCarouselNavStyles_unstable = (state: TeachingPopoverCarouselNavState) => {
  const styles = useStyles();

  state.root.className = mergeClasses(teachingPopoverCarouselNavClassNames.root, styles.root, state.root.className);

  return state;
};
