import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CarouselNavContainerSlots, CarouselNavContainerState } from './CarouselNavContainer.types';
import { tokens } from '@fluentui/react-theme';

export const carouselNavContainerClassNames: SlotClassNames<CarouselNavContainerSlots> = {
  root: 'fui-CarouselNavContainer',
  next: 'fui-CarouselNavContainer__next',
  prev: 'fui-CarouselNavContainer__prev',
  autoplay: 'fui-CarouselNavContainer__autoplay',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  next: {},
  prev: {},
  autoplay: {},
  overlay: {
    position: 'absolute',
    bottom: tokens.spacingVerticalM,
    boxSizing: 'border-box',
  },
  overlayWide: {
    bottom: tokens.spacingVerticalM,
  },
  nextWide: {
    marginLeft: 'auto',
  },
  prevWide: {
    marginRight: 'auto',
  },
  nextOverlayWide: {
    marginRight: tokens.spacingHorizontalS,
  },
  prevOverlayWide: {
    marginLeft: tokens.spacingHorizontalS,
  },
  autoplayOverlayWide: {
    marginLeft: tokens.spacingHorizontalS,
  },
  expanded: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    bottom: 0,
    '> div': {
      position: 'relative',
      bottom: tokens.spacingVerticalL,
      marginBottom: 0,
    },
  },
  nextOverlayExpanded: {
    position: 'absolute',
    right: tokens.spacingHorizontalS,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  prevOverlayExpanded: {
    position: 'absolute',
    left: tokens.spacingHorizontalS,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  autoplayExpanded: {
    position: 'absolute',
    bottom: `-${tokens.spacingHorizontalXS}`,
    left: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalM,
  },
});

/**
 * Apply styling to the CarouselNavContainer slots based on the state
 */
export const useCarouselNavContainerStyles_unstable = (state: CarouselNavContainerState): CarouselNavContainerState => {
  'use no memo';

  const { layout } = state;
  const isOverlay = layout === 'overlay' || layout === 'overlay-wide' || layout === 'overlay-expanded';
  const isWide = layout === 'inline-wide' || layout === 'overlay-wide';

  const styles = useStyles();
  state.root.className = mergeClasses(
    carouselNavContainerClassNames.root,
    styles.root,
    isOverlay && styles.overlay,
    isOverlay && isWide && styles.overlayWide,
    layout === 'overlay-expanded' && styles.expanded,
    state.root.className,
  );

  if (state.next) {
    state.next.className = mergeClasses(
      carouselNavContainerClassNames.next,
      styles.next,
      isWide && styles.nextWide,
      isWide && isOverlay && styles.nextOverlayWide,
      layout === 'overlay-expanded' && styles.nextOverlayExpanded,
      state.next.className,
    );
  }
  if (state.prev) {
    state.prev.className = mergeClasses(
      carouselNavContainerClassNames.prev,
      styles.prev,
      isWide && styles.prevWide,
      !state.autoplay && isWide && isOverlay && styles.prevOverlayWide,
      layout === 'overlay-expanded' && styles.prevOverlayExpanded,
      state.prev.className,
    );
  }

  if (state.autoplay) {
    state.autoplay.className = mergeClasses(
      carouselNavContainerClassNames.autoplay,
      styles.autoplay,
      layout === 'overlay-expanded' && styles.autoplayExpanded,
      isWide && isOverlay && styles.autoplayOverlayWide,
      state.autoplay.className,
    );
  }

  return state;
};
