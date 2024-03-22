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
    ...shorthands.border(0),
    ...shorthands.borderRadius('50%'),
    ...shorthands.padding('0px'),
    ...createCustomFocusIndicatorStyle({
      ...shorthands.outline('2px', 'solid', tokens.colorStrokeFocus2),
      ...shorthands.borderRadius('4px'),
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
    width: '16px',
    ...shorthands.border(0),
    ...shorthands.borderRadius('4px'),
    ...shorthands.padding('0px'),
    ...createCustomFocusIndicatorStyle({
      ...shorthands.outline('2px', 'solid', tokens.colorStrokeFocus2),
      ...shorthands.borderRadius('4px'),
      ...shorthands.borderColor('transparent'),
    }),
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
