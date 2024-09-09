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
    columnGap: tokens.spacingHorizontalXS,
    alignItems: 'center',
    justifyContent: 'center',
    ...createCustomFocusIndicatorStyle({
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      borderRadius: tokens.borderRadiusMedium,
      ...shorthands.borderColor('transparent'),
    }),
  },
});

/** Applies style classnames to slots */
export const useTeachingPopoverCarouselNavStyles_unstable = (state: TeachingPopoverCarouselNavState) => {
  'use no memo';

  const styles = useStyles();

  state.root.className = mergeClasses(teachingPopoverCarouselNavClassNames.root, styles.root, state.root.className);

  return state;
};
