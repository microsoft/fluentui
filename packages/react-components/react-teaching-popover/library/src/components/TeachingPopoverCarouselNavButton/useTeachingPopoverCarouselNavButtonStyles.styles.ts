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
    backgroundColor: `var(--ctrl-token-TeachingPopoverCarouselNavButton-2555, var(--semantic-token-TeachingPopoverCarouselNavButton-2556, ${tokens.colorBrandBackground}))`,
  },
  rootUnselected: {
    border: 'none',
    borderRadius: '50%',
    padding: '0px',
    outline: `var(--ctrl-token-TeachingPopoverCarouselNavButton-2557, var(--semantic-token-TeachingPopoverCarouselNavButton-2558, '${tokens.strokeWidthThin} solid transparent'))`, // For high contrast
    ...createCustomFocusIndicatorStyle({
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      borderRadius: `var(--ctrl-token-TeachingPopoverCarouselNavButton-2559, var(--semantic-token-TeachingPopoverCarouselNavButton-2560, ${tokens.borderRadiusMedium}))`,
      ...shorthands.borderColor('transparent'),
    }),
    backgroundColor: `color-mix(in srgb, ${tokens.colorBrandBackground} 30%, transparent)`,
    '@supports not (color: color-mix(in lch, white, black))': {
      // This will also affect the focus border, but only in older unsupported browsers
      opacity: 0.3,
      backgroundColor: `var(--ctrl-token-TeachingPopoverCarouselNavButton-2561, var(--semantic-token-TeachingPopoverCarouselNavButton-2562, ${tokens.colorBrandBackground}))`,
    },
  },
  rootSelected: {
    outline: `var(--ctrl-token-TeachingPopoverCarouselNavButton-2563, var(--semantic-token-TeachingPopoverCarouselNavButton-2564, '${tokens.strokeWidthThin} solid transparent'))`, // For high contrast
    width: '16px',
    border: 'none',
    borderRadius: '4px',
    padding: '0px',
    ...createCustomFocusIndicatorStyle({
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      borderRadius: `var(--ctrl-token-TeachingPopoverCarouselNavButton-2565, var(--semantic-token-TeachingPopoverCarouselNavButton-2566, ${tokens.borderRadiusMedium}))`,
      ...shorthands.borderColor('transparent'),
    }),
    '@media (forced-colors: active)': {
      backgroundColor: 'CanvasText',
    },
  },
  rootBrand: {
    backgroundColor: `var(--ctrl-token-TeachingPopoverCarouselNavButton-2567, var(--semantic-token-TeachingPopoverCarouselNavButton-2568, ${tokens.colorNeutralForegroundOnBrand}))`,
  },
  rootBrandUnselected: {
    backgroundColor: `color-mix(in srgb, ${tokens.colorNeutralForegroundOnBrand} 30%, transparent)`,
    '@supports not (color: color-mix(in lch, white, black))': {
      // This will also affect the focus border, but only in older unsupported browsers
      opacity: 0.3,
      backgroundColor: `var(--ctrl-token-TeachingPopoverCarouselNavButton-2569, var(--semantic-token-TeachingPopoverCarouselNavButton-2570, ${tokens.colorBrandBackground}))`,
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
