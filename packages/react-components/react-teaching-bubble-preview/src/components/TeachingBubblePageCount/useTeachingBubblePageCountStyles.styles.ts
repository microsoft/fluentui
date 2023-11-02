import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import type { TeachingBubblePageCountSlots, TeachingBubblePageCountState } from './TeachingBubblePageCount.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { usePopoverContext_unstable } from '@fluentui/react-popover';

export const TeachingBubblePageCountClassNames: SlotClassNames<TeachingBubblePageCountSlots> = {
  root: 'fui-TeachingBubblePageCount',
  carouselIcon: 'fui-TeachingBubbleCarouselIcon',
  carouselSelectedIcon: 'fui-TeachingBubbleCarouselSelectedIcon',
};

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'row', columnGap: '4px', alignItems: 'center' },
  carouselIcon: {
    display: 'inline-block',
    ...shorthands.border(0),
    ...shorthands.borderRadius('50%'),
    ...shorthands.padding('0px'),
    width: '8px',
    height: '8px',
    backgroundColor: tokens.colorBrandBackground,
    opacity: 0.3,
    cursor: 'pointer',
    boxSizing: 'border-box',
    ...createCustomFocusIndicatorStyle({ ...shorthands.borderRadius(tokens.borderRadiusCircular) }),
  },
  carouselSelectedIcon: {
    width: '16px',
    ...shorthands.border(0),
    ...shorthands.borderRadius('4px'),
    ...shorthands.padding('0px'),
    backgroundColor: tokens.colorBrandBackground,
    opacity: 1.0,
    ...createCustomFocusIndicatorStyle({ ...shorthands.borderRadius('4px') }),
  },
  carouselIconBrand: { backgroundColor: tokens.colorNeutralForegroundOnBrand },
  carouselSelectedIconBrand: {
    backgroundColor: tokens.colorNeutralForegroundOnBrand,
  },
});

/** Applies style classnames to slots */
export const useTeachingBubblePageCountStyles_unstable = (state: TeachingBubblePageCountState) => {
  const styles = useStyles();
  const appearance = usePopoverContext_unstable(context => context.appearance);

  const carouselIconMod = appearance === 'brand' ? styles.carouselIconBrand : undefined;
  const carouselIconSelectedMod = appearance === 'brand' ? styles.carouselSelectedIconBrand : undefined;

  state.root.className = mergeClasses(TeachingBubblePageCountClassNames.root, styles.root, state.root.className);

  state.carouselIcon.className = mergeClasses(
    TeachingBubblePageCountClassNames.carouselIcon,
    styles.carouselIcon,
    carouselIconMod,
    state.carouselIcon.className,
  );

  state.carouselSelectedIcon.className = mergeClasses(
    TeachingBubblePageCountClassNames.carouselSelectedIcon,
    styles.carouselIcon,
    styles.carouselSelectedIcon,
    carouselIconSelectedMod,
    state.carouselSelectedIcon.className,
  );

  return state;
};
