import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import type { TeachingPopoverPageCountSlots, TeachingPopoverPageCountState } from './TeachingPopoverPageCount.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const teachingPopoverPageCountClassNames: SlotClassNames<TeachingPopoverPageCountSlots> = {
  root: 'fui-TeachingPopoverPageCount',
  carouselIcon: 'fui-TeachingPopoverPageCount__carouselIcon',
  carouselSelectedIcon: 'fui-TeachingPopoverPageCount__carouselSelectedIcon',
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
export const useTeachingPopoverPageCountStyles_unstable = (state: TeachingPopoverPageCountState) => {
  const styles = useStyles();
  const { appearance } = state;

  const carouselIconMod = appearance === 'brand' ? styles.carouselIconBrand : undefined;
  const carouselIconSelectedMod = appearance === 'brand' ? styles.carouselSelectedIconBrand : undefined;

  state.root.className = mergeClasses(teachingPopoverPageCountClassNames.root, styles.root, state.root.className);

  state.carouselIcon.className = mergeClasses(
    teachingPopoverPageCountClassNames.carouselIcon,
    styles.carouselIcon,
    carouselIconMod,
    state.carouselIcon.className,
  );

  state.carouselSelectedIcon.className = mergeClasses(
    teachingPopoverPageCountClassNames.carouselSelectedIcon,
    styles.carouselIcon,
    styles.carouselSelectedIcon,
    carouselIconSelectedMod,
    state.carouselSelectedIcon.className,
  );

  return state;
};
