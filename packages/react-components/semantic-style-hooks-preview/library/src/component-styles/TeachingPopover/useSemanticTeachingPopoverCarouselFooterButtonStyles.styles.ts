import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import {
  teachingPopoverCarouselFooterButtonClassNames,
  type TeachingPopoverCarouselFooterButtonState,
} from '@fluentui/react-teaching-popover';
import { useSemanticButtonStyles } from '../Button';
import * as semanticTokens from '@fluentui/semantic-tokens';

const useStyles = makeStyles({
  root: {
    minWidth: '96px',
  },
  brandNext: {
    color: semanticTokens.foregroundContentBrandPrimary,
    backgroundColor: semanticTokens.foregroundCtrlOnBrandRest,
    ...shorthands.borderColor(semanticTokens.nullColor),
    ':hover': {
      color: semanticTokens.foregroundCtrlActiveBrandHover,
      backgroundColor: semanticTokens.foregroundCtrlOnBrandHover,
    },
    ':hover:active': {
      color: semanticTokens.foregroundCtrlActiveBrandPressed,
      backgroundColor: semanticTokens.foregroundCtrlOnBrandPressed,
    },
  },
  brandPrevious: {
    // In brand, this is always 'NeutralForegroundOnBrand'
    color: semanticTokens.foregroundCtrlOnBrandRest,
    backgroundColor: semanticTokens.backgroundCtrlBrandRest,
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnActiveBrandRest),
    ':hover': {
      color: semanticTokens.foregroundCtrlOnBrandHover,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnActiveBrandRest),
      backgroundColor: semanticTokens.backgroundCtrlBrandHover,
    },
    ':hover:active': {
      color: semanticTokens.foregroundCtrlOnBrandPressed,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnActiveBrandRest),
      backgroundColor: semanticTokens.backgroundCtrlBrandPressed,
    },
  },
});

/**
 * Apply styling to the TeachingPopoverCarouselFooterButton slots based on the state
 */
export const useSemanticTeachingPopoverCarouselFooterButtonStyles = (
  _state: unknown,
): TeachingPopoverCarouselFooterButtonState => {
  'use no memo';

  let state = _state as TeachingPopoverCarouselFooterButtonState;

  const styles = useStyles();
  const { navType, popoverAppearance } = state;

  // Apply underlying fluent Button styles
  state = {
    ...state,
    ...useSemanticButtonStyles(state),
  };

  state.root.className = mergeClasses(
    state.root.className,
    teachingPopoverCarouselFooterButtonClassNames.root,
    styles.root,
    navType === 'prev' && popoverAppearance === 'brand' && styles.brandPrevious,
    navType === 'next' && popoverAppearance === 'brand' && styles.brandNext,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
