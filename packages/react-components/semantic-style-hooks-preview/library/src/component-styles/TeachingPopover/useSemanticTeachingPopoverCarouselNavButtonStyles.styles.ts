import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import {
  teachingPopoverCarouselNavButtonClassNames,
  type TeachingPopoverCarouselNavButtonState,
} from '@fluentui/react-teaching-popover';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import * as semanticTokens from '@fluentui/semantic-tokens';

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
    backgroundColor: semanticTokens.backgroundCtrlBrandRest,
  },
  rootUnselected: {
    border: 'none',
    borderRadius: semanticTokens.cornerCircular,
    padding: '0px',
    outline: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens.nullColor}`, // For high contrast
    ...createCustomFocusIndicatorStyle({
      outline: `${semanticTokens.ctrlFocusOuterStrokeWidth} solid ${semanticTokens.ctrlFocusInnerStroke}`,
      borderRadius: semanticTokens.cornerCtrlRest,
      ...shorthands.borderColor(semanticTokens.nullColor),
    }),
    backgroundColor: `color-mix(in srgb, ${semanticTokens.backgroundCtrlBrandRest} 30%, transparent)`,
    '@supports not (color: color-mix(in lch, white, black))': {
      // This will also affect the focus border, but only in older unsupported browsers
      opacity: 0.3,
      backgroundColor: semanticTokens.backgroundCtrlBrandRest,
    },
  },
  rootSelected: {
    outline: `${semanticTokens.strokeWidthCtrlOutlinePressed} solid ${semanticTokens.nullColor}`, // For high contrast
    width: '16px',
    border: 'none',
    borderRadius: semanticTokens.cornerCtrlRest,
    padding: '0px',
    ...createCustomFocusIndicatorStyle({
      outline: `${semanticTokens.ctrlFocusOuterStrokeWidth} solid ${semanticTokens.ctrlFocusInnerStroke}`,
      borderRadius: semanticTokens.cornerCtrlPressed,
      ...shorthands.borderColor(semanticTokens.nullColor),
    }),
    '@media (forced-colors: active)': {
      backgroundColor: 'CanvasText',
    },
  },
  rootBrand: {
    backgroundColor: semanticTokens.foregroundCtrlOnBrandRest,
  },
  rootBrandUnselected: {
    backgroundColor: `color-mix(in srgb, ${semanticTokens.foregroundCtrlOnBrandRest} 30%, transparent)`,
    '@supports not (color: color-mix(in lch, white, black))': {
      // This will also affect the focus border, but only in older unsupported browsers
      opacity: 0.3,
      backgroundColor: semanticTokens.backgroundCtrlBrandRest,
    },
  },
});

/**
 * Apply styling to the TeachingPopoverCarouselNavButton slots based on the state
 */
export const useSemanticTeachingPopoverCarouselNavButtonStyles = (
  _state: unknown,
): TeachingPopoverCarouselNavButtonState => {
  'use no memo';

  const state = _state as TeachingPopoverCarouselNavButtonState;

  const styles = useStyles();
  const { appearance, isSelected } = state;

  const brandStyles = isSelected ? styles.rootBrand : styles.rootBrandUnselected;

  state.root.className = mergeClasses(
    state.root.className,
    teachingPopoverCarouselNavButtonClassNames.root,
    styles.root,
    isSelected ? styles.rootSelected : styles.rootUnselected,
    appearance === 'brand' && brandStyles,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
