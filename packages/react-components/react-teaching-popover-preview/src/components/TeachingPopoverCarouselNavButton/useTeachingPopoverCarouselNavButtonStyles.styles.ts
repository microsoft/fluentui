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
  navButton: 'fui-TeachingPopoverCarouselNavButton__navButton',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    ...createCustomFocusIndicatorStyle(
      {
        ...shorthands.outline('2px', 'solid', tokens.colorStrokeFocus2),
        ...shorthands.borderRadius(tokens.borderRadiusCircular),
      },
      { selector: 'focus-within' },
    ),
  },
  rootSelected: {
    display: 'flex',
    ...createCustomFocusIndicatorStyle(
      {
        ...shorthands.outline('2px', 'solid', tokens.colorStrokeFocus2),
        ...shorthands.borderRadius('4px'),
      },
      { selector: 'focus-within' },
    ),
  },
  navButton: {
    cursor: 'pointer',
    boxSizing: 'border-box',
    backgroundColor: tokens.colorBrandBackground,
    ...shorthands.border(0),
    ...shorthands.borderRadius('50%'),
    ...shorthands.padding('0px'),
  },
  navButtonSelected: {
    height: '8px',
    width: '16px',
    ...shorthands.border(0),
    ...shorthands.borderRadius('4px'),
    ...shorthands.padding('0px'),
  },
  navButtonUnselected: {
    height: '8px',
    width: '8px',
    opacity: 0.3,
  },
  navButtonBrand: {
    backgroundColor: tokens.colorNeutralForegroundOnBrand,
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

  state.root.className = mergeClasses(
    teachingPopoverCarouselNavButtonClassNames.root,
    isSelected ? styles.rootSelected : styles.root,
    state.root.className,
  );

  if (state.navButton) {
    const selectedButtonStyle = isSelected ? styles.navButtonSelected : styles.navButtonUnselected;
    state.navButton.className = mergeClasses(
      teachingPopoverCarouselNavButtonClassNames.navButton,
      styles.navButton,
      selectedButtonStyle,
      appearance === 'brand' ? styles.navButtonBrand : undefined,
      state.navButton.className,
    );
  }

  return state;
};
