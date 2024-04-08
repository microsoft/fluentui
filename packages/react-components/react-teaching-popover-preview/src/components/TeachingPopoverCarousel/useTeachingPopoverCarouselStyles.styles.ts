import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TeachingPopoverCarouselSlots, TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const teachingPopoverCarouselClassNames: SlotClassNames<TeachingPopoverCarouselSlots> = {
  root: 'fui-TeachingPopoverCarousel',
  footer: 'fui-TeachingPopoverCarousel__footer',
  previous: 'fui-TeachingPopoverCarousel__previous',
  next: 'fui-TeachingPopoverCarousel__next',
  nav: 'fui-TeachingPopoverCarousel__nav',
  pageCount: 'fui-TeachingPopoverCarousel__pageCount',
};

// Todo: Page change animation & styles
const useStyles = makeStyles({
  root: {},
  footer: {
    display: 'flex',
    flexDirection: 'row',
  },
  footerCentered: {
    justifyContent: 'space-between',
    ...shorthands.gap('8px'),
  },
  footerRightAligned: {
    ...shorthands.gap('8px'),
    '& :first-child': {
      marginInlineEnd: 'auto',
    },
  },
  previous: {
    minWidth: '96px',
  },
  next: {
    minWidth: '96px',
  },
  brandNext: {
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.borderColor(tokens.colorTransparentBackground),
    ':hover': {
      color: tokens.colorCompoundBrandForeground1Hover,
      backgroundColor: tokens.colorNeutralForegroundOnBrand,
    },
    ':hover:active': {
      color: tokens.colorCompoundBrandForeground1Pressed,
      backgroundColor: tokens.colorNeutralForegroundOnBrand,
    },
  },
  brandPrevious: {
    // In brand, this is always 'NeutralForegroundOnBrand'
    color: tokens.colorNeutralForegroundOnBrand,
    backgroundColor: tokens.colorBrandBackground,
    ...shorthands.borderColor(tokens.colorNeutralForegroundOnBrand),
    ':hover': {
      color: tokens.colorNeutralForegroundOnBrand,
      ...shorthands.borderColor(tokens.colorNeutralForegroundOnBrand),
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
    ':hover:active': {
      color: tokens.colorNeutralForegroundOnBrand,
      ...shorthands.borderColor(tokens.colorNeutralForegroundOnBrand),
      backgroundColor: tokens.colorBrandBackgroundPressed,
    },
  },
  nav: {},
  pageCount: { display: 'flex', color: tokens.colorNeutralForeground3, justifyContent: 'center', alignItems: 'center' },
});

/** Applies style classnames to slots */
export const useTeachingPopoverCarouselStyles_unstable = (state: TeachingPopoverCarouselState) => {
  const styles = useStyles();
  const { appearance, layout } = state;

  state.root.className = mergeClasses(teachingPopoverCarouselClassNames.root, styles.root, state.root.className);
  state.footer.className = mergeClasses(
    teachingPopoverCarouselClassNames.footer,
    styles.footer,
    layout === 'centered' ? styles.footerCentered : styles.footerRightAligned,
    state.footer.className,
  );
  if (state.previous) {
    state.previous.className = mergeClasses(
      teachingPopoverCarouselClassNames.previous,
      styles.previous,
      appearance === 'brand' && styles.brandPrevious,
      state.previous.className,
    );
  }
  state.next.className = mergeClasses(
    teachingPopoverCarouselClassNames.next,
    styles.next,
    appearance === 'brand' && styles.brandNext,
    state.next.className,
  );
  if (state.nav) {
    state.nav.className = mergeClasses(teachingPopoverCarouselClassNames.nav, styles.nav, state.nav.className);
  }
  if (state.pageCount) {
    state.pageCount.className = mergeClasses(
      teachingPopoverCarouselClassNames.pageCount,
      styles.pageCount,
      state.pageCount.className,
    );
  }

  return state;
};
