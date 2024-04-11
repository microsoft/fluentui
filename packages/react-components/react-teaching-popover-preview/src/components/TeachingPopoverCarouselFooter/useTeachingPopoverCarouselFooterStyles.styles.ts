import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type {
  TeachingPopoverCarouselFooterSlots,
  TeachingPopoverCarouselFooterState,
} from './TeachingPopoverCarouselFooter.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

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
    ...shorthands.gap('8px'),
  },
  rootRightAligned: {
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
});

/** Applies style classnames to slots */
export const useTeachingPopoverCarouselFooterStyles_unstable = (state: TeachingPopoverCarouselFooterState) => {
  const styles = useStyles();
  const { appearance, layout } = state;

  state.root.className = mergeClasses(
    teachingPopoverCarouselFooterClassNames.root,
    styles.root,
    layout === 'centered' ? styles.rootCentered : styles.rootRightAligned,
    state.root.className,
  );
  if (state.previous) {
    state.previous.className = mergeClasses(
      teachingPopoverCarouselFooterClassNames.previous,
      styles.previous,
      appearance === 'brand' && styles.brandPrevious,
      state.previous.className,
    );
  }
  state.next.className = mergeClasses(
    teachingPopoverCarouselFooterClassNames.next,
    styles.next,
    appearance === 'brand' && styles.brandNext,
    state.next.className,
  );

  return state;
};
