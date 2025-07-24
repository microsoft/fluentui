import { makeStyles, mergeClasses } from '@griffel/react';
import { createArrowHeightStyles, createArrowStyles, createSlideStyles } from '@fluentui/react-positioning';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { PopoverSize, PopoverSurfaceState } from '@fluentui/react-popover';
import { popoverSurfaceClassNames } from '@fluentui/react-popover';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

export const arrowHeights: Record<PopoverSize, number> = {
  small: 6,
  medium: 8,
  large: 8,
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    color: semanticTokens.foregroundContentNeutralPrimary,
    backgroundColor: semanticTokens.backgroundFlyoutSolid,
    borderRadius: semanticTokens.cornerCtrlRest,
    border: `1px solid ${semanticTokens.strokeLayer}`,
    ...typographyStyles.body1,
    ...createSlideStyles(10),

    // TODO need to add versions of tokens.alias.shadow.shadow16, etc. that work with filter
    filter: semanticTokens._ctrlPopoverShadowFilter,
  },

  inline: {
    // When rendering inline, the PopoverSurface will be rendered under relatively positioned elements such as Input.
    // This is due to the surface being positioned as absolute, therefore zIndex: 1 ensures that won't happen.
    zIndex: 1,
  },

  inverted: {
    backgroundColor: tokens.colorNeutralBackgroundStatic,
    color: tokens.colorNeutralForegroundStaticInverted,
  },

  brand: {
    backgroundColor: semanticTokens.backgroundCtrlBrandRest,
    color: semanticTokens.foregroundCtrlOnBrandRest,
  },

  smallPadding: { padding: semanticTokens.paddingContentSmall },

  mediumPadding: { padding: semanticTokens.paddingContentMedium },

  largePadding: { padding: semanticTokens._ctrlPopoverPaddingContentLarge },

  smallArrow: createArrowHeightStyles(arrowHeights.small),
  mediumLargeArrow: createArrowHeightStyles(arrowHeights.medium),
  arrow: createArrowStyles({ arrowHeight: undefined }),
});

/**
 * Apply styling to the PopoverSurface slots based on the state
 */
export const useSemanticPopoverSurfaceStyles = (_state: unknown): PopoverSurfaceState => {
  'use no memo';

  const state = _state as PopoverSurfaceState;

  const styles = useStyles();
  state.root.className = mergeClasses(
    state.root.className,
    popoverSurfaceClassNames.root,
    styles.root,
    state.inline && styles.inline,
    state.size === 'small' && styles.smallPadding,
    state.size === 'medium' && styles.mediumPadding,
    state.size === 'large' && styles.largePadding,
    state.appearance === 'inverted' && styles.inverted,
    state.appearance === 'brand' && styles.brand,
    getSlotClassNameProp_unstable(state.root),
  );

  state.arrowClassName = mergeClasses(
    state.arrowClassName,
    styles.arrow,
    state.size === 'small' ? styles.smallArrow : styles.mediumLargeArrow,
  );

  return state;
};
