import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type {
  TeachingPopoverCarouselNavSlots,
  TeachingPopoverCarouselNavState,
} from './TeachingPopoverCarouselNav.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';

export const teachingPopoverCarouselNavClassNames: SlotClassNames<TeachingPopoverCarouselNavSlots> = {
  root: 'fui-TeachingPopoverCarouselNav',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: '4px',
    alignItems: 'center',
    justifyContent: 'center',
    ...createCustomFocusIndicatorStyle({
      ...shorthands.outline('2px', 'solid', tokens.colorStrokeFocus2),
      ...shorthands.borderRadius('4px'),
      ...shorthands.borderColor('transparent'),
    }),
  },
});

/** Applies style classnames to slots */
export const useTeachingPopoverCarouselNavStyles_unstable = (state: TeachingPopoverCarouselNavState) => {
  const styles = useStyles();

  state.root.className = mergeClasses(teachingPopoverCarouselNavClassNames.root, styles.root, state.root.className);

  return state;
};
