import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselNavButtonSlots,
  TeachingPopoverCarouselNavButtonState,
} from './TeachingPopoverCarouselNavButton.types';
import { tokens } from '@fluentui/react-theme';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';

export const teachingPopoverCarouselNavButtonClassNames: SlotClassNames<TeachingPopoverCarouselNavButtonSlots> = {
  root: 'fui-TeachingPopoverCarouselNavButton',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    cursor: 'pointer',
    boxSizing: 'border-box',
    height: '8px',
    width: '8px',
    backgroundColor: tokens.colorBrandBackground,
  },
  rootUnselected: {
    border: 'none',
    borderRadius: '50%',
    padding: '0px',
    outline: `${tokens.strokeWidthThin} solid transparent`, // For high contrast
    ...createCustomFocusIndicatorStyle({
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      borderRadius: tokens.borderRadiusMedium,
      ...shorthands.borderColor('transparent'),
    }),
    backgroundColor: `color-mix(in srgb, ${tokens.colorBrandBackground} 30%, transparent)`,
    '@supports not (color: color-mix(in lch, white, black))': {
      // This will also affect the focus border, but only in older unsupported browsers
      opacity: 0.3,
      backgroundColor: tokens.colorBrandBackground,
    },
  },
  rootSelected: {
    outline: `${tokens.strokeWidthThin} solid transparent`, // For high contrast
    width: '16px',
    border: 'none',
    borderRadius: '4px',
    padding: '0px',
    ...createCustomFocusIndicatorStyle({
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      borderRadius: tokens.borderRadiusMedium,
      ...shorthands.borderColor('transparent'),
    }),
    '@media (forced-colors: active)': {
      backgroundColor: 'CanvasText',
    },
  },
  rootBrand: {
    backgroundColor: tokens.colorNeutralForegroundOnBrand,
  },
  rootBrandUnselected: {
    backgroundColor: `color-mix(in srgb, ${tokens.colorNeutralForegroundOnBrand} 30%, transparent)`,
    '@supports not (color: color-mix(in lch, white, black))': {
      // This will also affect the focus border, but only in older unsupported browsers
      opacity: 0.3,
      backgroundColor: tokens.colorBrandBackground,
    },
  },
});

/**
 * Apply styling to the TeachingPopoverCarouselNavButton slots based on the state
 */
export const useTeachingPopoverCarouselNavButtonStyles_unstable = (
  state: TeachingPopoverCarouselNavButtonState,
): TeachingPopoverCarouselNavButtonState => {
  'use no memo';

  const styles = useStyles();
  const { appearance, isSelected } = state;

  const brandStyles = isSelected ? styles.rootBrand : styles.rootBrandUnselected;

  state.root.className = mergeClasses(
    teachingPopoverCarouselNavButtonClassNames.root,
    styles.root,
    isSelected ? styles.rootSelected : styles.rootUnselected,
    appearance === 'brand' && brandStyles,
    state.root.className,
  );

  return state;
};
