import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import {
  reservedSpaceClassNames,
  tabClassNames,
  type TabState,
  useTabAnimatedIndicatorStyles_unstable,
} from '@fluentui/react-tabs';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

// These should match the constants defined in @fluentui/react-icons
// This package avoids taking a dependency on the icons package for only the constants.
const iconClassNames = {
  filled: 'fui-Icon-filled',
  regular: 'fui-Icon-regular',
};

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'grid',
    flexShrink: 0,
    gridAutoFlow: 'column',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto',
    outlineStyle: 'none',
    position: 'relative',
  },
  button: {
    alignItems: 'center',
    border: 'none',
    borderRadius: semanticTokens.ctrlListCornerRest,
    cursor: 'pointer',
    display: 'grid',
    flexShrink: 0,
    gridAutoFlow: 'column',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto',
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    lineHeight: semanticTokens.textRampItemBodyLineHeight,
    outlineStyle: 'none',
    position: 'relative',
    overflow: 'hidden',
    textTransform: 'none',
  },
  horizontal: {
    minHeight: semanticTokens._ctrlTabSizeDefault,
    justifyContent: 'center',
  },
  vertical: {
    justifyContent: 'start',
  },
  smallHorizontal: {
    columnGap: semanticTokens._ctrlTabSmGapInsideDefault,
    padding: `${tokens.spacingVerticalSNudge} ${semanticTokens._ctrlTabSmPaddingHorizontalDefault}`,
  },
  smallVertical: {
    // horizontal spacing is deliberate. This is the gap between icon and content.
    columnGap: semanticTokens._ctrlTabSmGapInsideDefault,
    padding: `${tokens.spacingVerticalXXS} ${semanticTokens._ctrlTabSmPaddingHorizontalDefault}`,
  },
  mediumHorizontal: {
    columnGap: semanticTokens._ctrlTabGapInsideDefault,
    padding: `${tokens.spacingVerticalM} ${semanticTokens._ctrlTabPaddingHorizontalDefault}`,
  },
  mediumVertical: {
    // horizontal spacing is deliberate. This is the gap between icon and content.
    columnGap: semanticTokens._ctrlTabGapInsideDefault,
    padding: `${tokens.spacingVerticalSNudge} ${semanticTokens._ctrlTabPaddingHorizontalDefault}`,
  },
  largeHorizontal: {
    columnGap: semanticTokens._ctrlTabGapInsideDefault,
    padding: `${tokens.spacingVerticalL} ${semanticTokens._ctrlTabPaddingHorizontalDefault}`,
  },
  largeVertical: {
    // horizontal spacing is deliberate. This is the gap between icon and content.
    columnGap: semanticTokens._ctrlTabGapInsideDefault,
    padding: `${semanticTokens.ctrlChoicePaddingVertical} ${semanticTokens._ctrlTabPaddingHorizontalDefault}`,
  },
  transparent: {
    backgroundColor: semanticTokens.nullColor,
    ':enabled:hover': {
      backgroundColor: semanticTokens.nullColor,
    },
    ':enabled:active': {
      backgroundColor: semanticTokens.nullColor,
    },
    [`& .${tabClassNames.icon}`]: {
      color: semanticTokens.foregroundCtrlOnTransparentRest,
    },
    [`:enabled:hover .${tabClassNames.icon}`]: {
      color: semanticTokens._ctrlTabForegroundOnTransparentHover,
    },
    [`:enabled:active .${tabClassNames.icon}`]: {
      color: semanticTokens._ctrlTabForegroundOnTransparentPressed,
    },
    [`& .${tabClassNames.content}`]: {
      color: semanticTokens.foregroundCtrlOnTransparentRest,
    },
    [`:enabled:hover .${tabClassNames.content}`]: {
      color: semanticTokens._ctrlTabForegroundOnTransparentHover,
    },
    [`:enabled:active .${tabClassNames.content}`]: {
      color: semanticTokens._ctrlTabForegroundOnTransparentPressed,
    },
  },
  subtle: {
    backgroundColor: semanticTokens.backgroundCtrlSubtleRest,
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnSubtleRest),
    ':enabled:hover': {
      backgroundColor: semanticTokens.backgroundCtrlSubtleHover,
    },
    ':enabled:active': {
      backgroundColor: semanticTokens.backgroundCtrlSubtlePressed,
    },
    [`& .${tabClassNames.icon}`]: {
      color: semanticTokens.foregroundCtrlIconOnSubtleRest,
    },
    [`:enabled:hover .${tabClassNames.icon}`]: {
      color: semanticTokens._ctrlTabForegroundOnSubtleHover,
    },
    [`:enabled:active .${tabClassNames.icon}`]: {
      color: semanticTokens._ctrlTabForegroundOnSubtlePressed,
    },
    [`& .${tabClassNames.content}`]: {
      color: semanticTokens.foregroundCtrlOnSubtleRest,
    },
    [`:enabled:hover .${tabClassNames.content}`]: {
      color: semanticTokens.foregroundCtrlOnSubtleHover,
    },
    [`:enabled:active .${tabClassNames.content}`]: {
      color: semanticTokens.foregroundCtrlOnSubtlePressed,
    },
  },
  disabledCursor: {
    cursor: 'not-allowed',
  },
  transparentDisabled: {
    backgroundColor: semanticTokens.nullColor,

    [`& .${tabClassNames.icon}`]: {
      color: semanticTokens.foregroundCtrlOnTransparentDisabled,
    },
    [`& .${tabClassNames.content}`]: {
      color: semanticTokens.foregroundCtrlOnTransparentDisabled,
    },
  },
  subtleDisabled: {
    backgroundColor: semanticTokens.nullColor,

    [`& .${tabClassNames.icon}`]: {
      color: semanticTokens.foregroundCtrlIconOnSubtleDisabled,
    },
    [`& .${tabClassNames.content}`]: {
      color: semanticTokens.foregroundCtrlOnSubtleDisabled,
    },
  },
  selected: {
    [`& .${tabClassNames.icon}`]: {
      color: semanticTokens.foregroundCtrlActiveBrandRest,
    },
    [`:enabled:hover .${tabClassNames.icon}`]: {
      color: semanticTokens.foregroundCtrlActiveBrandHover,
    },
    [`:enabled:active .${tabClassNames.icon}`]: {
      color: semanticTokens.foregroundCtrlActiveBrandPressed,
    },
    [`& .${tabClassNames.content}`]: {
      color: semanticTokens._ctrlTabForegroundActiveBrandRest,
    },
    [`:enabled:hover .${tabClassNames.content}`]: {
      color: semanticTokens._ctrlTabForegroundActiveBrandHover,
    },
    [`:enabled:active .${tabClassNames.content}`]: {
      color: semanticTokens._ctrlTabForegroundActiveBrandPressed,
    },
  },
});

const useCircularAppearanceStyles = makeStyles({
  base: {
    borderRadius: semanticTokens.cornerCircular,
    [`& .${tabClassNames.icon}`]: {
      color: 'inherit',
    },
    [`& .${tabClassNames.content}`]: {
      color: 'inherit',
    },
  },
  // medium: {
  // Note: padding-block does not collapse into the other padding rules when using complex CSS hooks
  // In order for styles to collapse correctly, they need to be like:like in their usage
  // For now, we've set to paddingTop/Bottom to ensure they collapse via mediumHorizontal/Vertical
  // paddingBlock: `${tokens.spacingVerticalSNudge}`,
  // }
  mediumHorizontal: {
    paddingTop: `${tokens.spacingVerticalSNudge}`,
    paddingBottom: `${tokens.spacingVerticalSNudge}`,
  },
  mediumVertical: {
    paddingLeft: `${tokens.spacingVerticalSNudge}`,
    paddingRight: `${tokens.spacingVerticalSNudge}`,
  },
  subtle: {
    backgroundColor: semanticTokens.backgroundCtrlSubtleRest,
    border: `solid ${semanticTokens.strokeWidthDefault} transparent`,
    color: semanticTokens.foregroundCtrlOnSubtleRest,
    ':enabled:hover': {
      backgroundColor: semanticTokens.backgroundCtrlSubtleHover,
      border: `solid ${semanticTokens.strokeWidthDefault} ${semanticTokens.strokeCtrlOnNeutralHover}`,
      color: semanticTokens.foregroundCtrlOnSubtleHover,
    },
    ':enabled:active': {
      backgroundColor: semanticTokens.backgroundCtrlSubtlePressed,
      border: `solid ${semanticTokens.strokeWidthDefault} ${semanticTokens.strokeCtrlOnNeutralPressed}`,
      color: semanticTokens.foregroundCtrlOnSubtlePressed,
    },
  },
  subtleSelected: {
    backgroundColor: tokens.colorBrandBackground2,
    border: `solid ${semanticTokens.strokeWidthDefault} ${tokens.colorCompoundBrandStroke}`,
    color: tokens.colorBrandForeground2,
    ':enabled:hover': {
      backgroundColor: tokens.colorBrandBackground2Hover,
      border: `solid ${semanticTokens.strokeWidthDefault} ${tokens.colorCompoundBrandStrokeHover}`,
      color: tokens.colorBrandForeground2Hover,
    },
    ':enabled:active': {
      backgroundColor: tokens.colorBrandBackground2Pressed,
      border: `solid ${semanticTokens.strokeWidthDefault} ${tokens.colorCompoundBrandStrokePressed}`,
      color: tokens.colorBrandForeground2Pressed,
    },
    '@media (forced-colors: active)': {
      border: `solid ${semanticTokens.strokeWidthDefault} Highlight`,
    },
  },
  subtleDisabled: {
    backgroundColor: semanticTokens.backgroundCtrlSubtleRest,
    color: semanticTokens.foregroundCtrlOnSubtleDisabled,
    border: `solid ${semanticTokens.strokeWidthDefault} transparent`,
  },
  subtleDisabledSelected: {
    backgroundColor: semanticTokens.backgroundCtrlActiveBrandDisabled,
    border: `solid ${semanticTokens.strokeWidthDefault} ${semanticTokens.strokeCtrlOnNeutralDisabled}`,
    color: semanticTokens.foregroundCtrlOnSubtleDisabled,
  },
  filled: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: semanticTokens.foregroundCtrlNeutralSecondaryRest,
    ':enabled:hover': {
      backgroundColor: tokens.colorNeutralBackground3Hover,
      color: semanticTokens.foregroundCtrlNeutralSecondaryHover,
    },
    ':enabled:active': {
      backgroundColor: tokens.colorNeutralBackground3Pressed,
      color: semanticTokens.foregroundCtrlNeutralSecondaryPressed,
    },
    '@media (forced-colors: active)': {
      ':enabled:hover': {
        backgroundColor: 'Highlight',
        forcedColorAdjust: 'none',
        [`& .${tabClassNames.content}`]: {
          color: 'HighlightText',
        },
        [`& .${iconClassNames.filled}`]: {
          color: 'HighlightText',
        },
        [`& .${iconClassNames.regular}`]: {
          color: 'HighlightText',
        },
      },
    },
  },
  filledSelected: {
    backgroundColor: semanticTokens.backgroundCtrlBrandRest,
    color: semanticTokens.foregroundCtrlOnBrandRest,
    ':enabled:hover': {
      backgroundColor: semanticTokens.backgroundCtrlBrandHover,
      color: semanticTokens.foregroundCtrlOnBrandHover,
    },
    ':enabled:active': {
      backgroundColor: semanticTokens.backgroundCtrlBrandPressed,
      color: semanticTokens.foregroundCtrlOnBrandPressed,
    },
    '@media (forced-colors: active)': {
      ':enabled': {
        backgroundColor: 'ButtonText',
        [`& .${tabClassNames.content}`]: {
          color: 'ButtonFace',
          forcedColorAdjust: 'none',
        },
      },
      [`:enabled .${tabClassNames.icon}`]: {
        color: 'ButtonFace',
      },
    },
  },
  filledDisabled: {
    backgroundColor: semanticTokens.backgroundCtrlNeutralDisabled,
    border: `solid ${semanticTokens.strokeWidthDefault} transparent`,
    color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,
  },
  filledDisabledSelected: {
    backgroundColor: semanticTokens.backgroundCtrlActiveBrandDisabled,
    border: `solid ${semanticTokens.strokeWidthDefault} ${semanticTokens.strokeCtrlOnNeutralDisabled}`,
    color: semanticTokens.foregroundCtrlOnActiveBrandDisabled,
  },
});

/**
 * Focus styles for the root slot
 */
const useFocusStyles = makeStyles({
  // Tab creates a custom focus indicator because the default focus indicator
  // is applied using an ::after pseudo-element on the root. Since the selection
  // indicator uses an ::after pseudo-element on the root, there is a conflict.
  base: createCustomFocusIndicatorStyle(
    {
      ...shorthands.borderColor('transparent'),
      outlineWidth: semanticTokens.ctrlFocusOuterStrokeWidth,
      outlineColor: 'transparent',
      outlineStyle: 'solid',
      boxShadow: `
      ${tokens.shadow4},
      0 0 0 ${semanticTokens.ctrlFocusOuterStrokeWidth} ${semanticTokens.ctrlFocusInnerStroke}
    `,
      zIndex: 1,
    },
    { enableOutline: true },
  ),
  circular: createCustomFocusIndicatorStyle(
    {
      ...shorthands.borderColor('transparent'),
      outlineWidth: semanticTokens.ctrlFocusOuterStrokeWidth,
      outlineColor: 'transparent',
      outlineStyle: 'solid',
      boxShadow: `
        ${tokens.shadow4},
        0 0 0 ${semanticTokens.ctrlFocusOuterStrokeWidth} ${semanticTokens.ctrlFocusInnerStroke},
        0 0 0 ${semanticTokens.ctrlFocusInnerStrokeWidth} ${tokens.colorNeutralStrokeOnBrand} inset
      `,
      zIndex: 1,
    },
    { enableOutline: true },
  ),
});

/** Indicator styles for when pending selection */
const usePendingIndicatorStyles = makeStyles({
  base: {
    ':hover::before': {
      backgroundColor: semanticTokens.strokeCtrlOnNeutralHover,
      borderRadius: semanticTokens.cornerCircular,
      content: '""',
      position: 'absolute',
    },
    ':active::before': {
      backgroundColor: semanticTokens.strokeCtrlOnNeutralPressed,
      borderRadius: semanticTokens.cornerCircular,
      content: '""',
      position: 'absolute',
    },
    '@media (forced-colors: active)': {
      ':hover::before': {
        backgroundColor: 'Highlight',
      },
      ':active::before': {
        backgroundColor: 'Highlight',
      },
    },
  },
  disabled: {
    ':hover::before': {
      backgroundColor: semanticTokens.ctrlFocusOuterStroke,
    },
    ':active::before': {
      backgroundColor: semanticTokens.ctrlFocusOuterStroke,
    },
    '@media (forced-colors: active)': {
      ':hover::before': {
        backgroundColor: 'transparent',
      },
      ':active::before': {
        backgroundColor: 'transparent',
      },
    },
  },
  smallHorizontal: {
    '::before': {
      bottom: 0,
      height: tokens.strokeWidthThick,
      left: tokens.spacingHorizontalSNudge,
      right: tokens.spacingHorizontalSNudge,
    },
  },
  smallVertical: {
    '::before': {
      bottom: tokens.spacingVerticalXS,
      left: 0,
      top: tokens.spacingVerticalXS,
      width: semanticTokens.ctrlListPillWidth,
    },
  },
  mediumHorizontal: {
    '::before': {
      bottom: 0,
      height: semanticTokens.ctrlListPillWidth,
      left: semanticTokens.paddingCtrlHorizontalDefault,
      right: semanticTokens.paddingCtrlHorizontalDefault,
    },
  },
  mediumVertical: {
    '::before': {
      bottom: semanticTokens.ctrlChoicePaddingVertical,
      left: 0,
      top: semanticTokens.ctrlChoicePaddingVertical,
      width: semanticTokens.ctrlListPillWidth,
    },
  },
  largeHorizontal: {
    '::before': {
      bottom: 0,
      height: semanticTokens.ctrlListPillWidth,
      left: semanticTokens.paddingCtrlHorizontalDefault,
      right: semanticTokens.paddingCtrlHorizontalDefault,
    },
  },
  largeVertical: {
    '::before': {
      bottom: tokens.spacingVerticalMNudge,
      left: 0,
      top: tokens.spacingVerticalMNudge,
      width: semanticTokens.ctrlListPillWidth,
    },
  },
});

const useActiveIndicatorStyles = makeStyles({
  base: {
    '::after': {
      backgroundColor: semanticTokens.strokeLayer,
      borderRadius: semanticTokens.cornerCircular,
      content: '""',
      position: 'absolute',
    },
  },
  selected: {
    '::after': {
      backgroundColor: semanticTokens.backgroundCtrlActiveBrandRest,
    },
    ':enabled:hover::after': {
      backgroundColor: semanticTokens.backgroundCtrlActiveBrandHover,
    },
    ':enabled:active::after': {
      backgroundColor: semanticTokens.backgroundCtrlActiveBrandPressed,
    },
    '@media (forced-colors: active)': {
      '::after': {
        backgroundColor: 'ButtonText',
      },
      ':enabled:hover::after': {
        backgroundColor: 'ButtonText',
      },
      ':enabled:active::after': {
        backgroundColor: 'ButtonText',
      },
    },
  },
  disabled: {
    '::after': {
      backgroundColor: semanticTokens._ctrlTabBackgroundActiveBrandDisabled,
    },
  },
  smallHorizontal: {
    '::after': {
      bottom: 0,
      height: tokens.strokeWidthThick,
      left: tokens.spacingHorizontalSNudge,
      right: tokens.spacingHorizontalSNudge,
    },
  },
  smallVertical: {
    '::after': {
      bottom: tokens.spacingVerticalXS,
      left: '0',
      top: tokens.spacingVerticalXS,
      width: semanticTokens.ctrlListPillWidth,
    },
  },
  mediumHorizontal: {
    '::after': {
      bottom: '0',
      height: semanticTokens.ctrlListPillWidth,
      left: semanticTokens.paddingCtrlHorizontalDefault,
      right: semanticTokens.paddingCtrlHorizontalDefault,
    },
  },
  mediumVertical: {
    '::after': {
      bottom: semanticTokens.ctrlChoicePaddingVertical,
      left: 0,
      top: semanticTokens.ctrlChoicePaddingVertical,
      width: semanticTokens.ctrlListPillWidth,
    },
  },
  largeHorizontal: {
    '::after': {
      bottom: 0,
      height: semanticTokens.ctrlListPillWidth,
      left: semanticTokens.paddingCtrlHorizontalDefault,
      right: semanticTokens.paddingCtrlHorizontalDefault,
    },
  },
  largeVertical: {
    '::after': {
      bottom: tokens.spacingVerticalMNudge,
      left: 0,
      top: tokens.spacingVerticalMNudge,
      width: semanticTokens.ctrlListPillWidth,
    },
  },
});

/**
 * Styles for the icon slot.
 */
const useIconStyles = makeStyles({
  base: {
    gridColumnStart: 1,
    gridRowStart: 1,
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    overflow: 'hidden',
    [`& .${iconClassNames.filled}`]: {
      display: 'none',
    },
    [`& .${iconClassNames.regular}`]: {
      display: 'inline',
    },
  },
  // per design, the small and medium font sizes are the same.
  // the size prop only affects spacing.
  small: {
    fontSize: semanticTokens.sizeCtrlIcon,
    height: semanticTokens.sizeCtrlIcon,
    width: semanticTokens.sizeCtrlIcon,
  },
  medium: {
    fontSize: semanticTokens.sizeCtrlIcon,
    height: semanticTokens.sizeCtrlIcon,
    width: semanticTokens.sizeCtrlIcon,
  },
  large: {
    fontSize: semanticTokens.sizeCtrlLgIcon,
    height: semanticTokens.sizeCtrlLgIcon,
    width: semanticTokens.sizeCtrlLgIcon,
  },
  selected: {
    [`& .${iconClassNames.filled}`]: {
      display: 'inline',
    },
    [`& .${iconClassNames.regular}`]: {
      display: 'none',
    },
  },
});

/**
 * Styles for the content slot (children)
 */
const useContentStyles = makeStyles({
  base: {
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textRampItemBodyFontSize,
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
    lineHeight: semanticTokens.textRampItemBodyLineHeight,
    overflow: 'hidden',
    // content padding is the same for medium & small, horizontal & vertical
    padding: `${semanticTokens.paddingContentNone} ${semanticTokens._ctrlTabPaddingTextSide}`,
  },
  selected: {
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textRampItemBodyFontSize,
    fontWeight: semanticTokens.textCtrlWeightSelected,
    lineHeight: semanticTokens.textRampItemBodyLineHeight,
  },
  large: {
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textRampLgItemBodyFontSize,
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
    lineHeight: semanticTokens.textRampLgItemBodyLineHeight,
  },
  largeSelected: {
    fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
    fontSize: semanticTokens.textRampLgItemBodyFontSize,
    fontWeight: semanticTokens.textCtrlWeightSelected,
    lineHeight: semanticTokens.textRampLgItemBodyLineHeight,
  },
  noIconBefore: {
    gridColumnStart: 1,
    gridRowStart: 1,
  },
  iconBefore: {
    gridColumnStart: 2,
    gridRowStart: 1,
  },
  placeholder: {
    visibility: 'hidden',
  },
});

/**
 * Apply styling to the Tab slots based on the state
 */
export const useSemanticTabStyles = (_state: unknown): TabState => {
  'use no memo';

  const state = _state as TabState;

  useSemanticTabIndicatorStyles_unstable(state);

  useSemanticTabButtonStyles_unstable(state, state.root);

  useSemanticTabContentStyles_unstable(state);

  return state;
};

/**
 * Applies styles for the Tab indicator based on its current state.
 *
 * This hook is typically used internally by `useTabStyles_unstable`. You should
 * only use it directly if you're creating a custom `Tab` component.
 *
 * @param state - The `Tab` component's current state
 * @returns The state object with updated button styles
 */
export const useSemanticTabIndicatorStyles_unstable = (state: TabState): TabState => {
  'use no memo';

  const rootStyles = useRootStyles();
  const pendingIndicatorStyles = usePendingIndicatorStyles();
  const activeIndicatorStyles = useActiveIndicatorStyles();

  const { appearance, disabled, selected, size, vertical } = state;

  const classes: Parameters<typeof mergeClasses> = [tabClassNames.root, rootStyles.root];

  if (appearance !== 'subtle-circular' && appearance !== 'filled-circular') {
    classes.push(
      // pending indicator (before pseudo element)
      pendingIndicatorStyles.base,
      size === 'small' && (vertical ? pendingIndicatorStyles.smallVertical : pendingIndicatorStyles.smallHorizontal),
      size === 'medium' && (vertical ? pendingIndicatorStyles.mediumVertical : pendingIndicatorStyles.mediumHorizontal),
      size === 'large' && (vertical ? pendingIndicatorStyles.largeVertical : pendingIndicatorStyles.largeHorizontal),
      disabled && pendingIndicatorStyles.disabled,

      // active indicator (after pseudo element)
      selected && activeIndicatorStyles.base,
      selected && !disabled && activeIndicatorStyles.selected,
      selected &&
        size === 'small' &&
        (vertical ? activeIndicatorStyles.smallVertical : activeIndicatorStyles.smallHorizontal),
      selected &&
        size === 'medium' &&
        (vertical ? activeIndicatorStyles.mediumVertical : activeIndicatorStyles.mediumHorizontal),
      selected &&
        size === 'large' &&
        (vertical ? activeIndicatorStyles.largeVertical : activeIndicatorStyles.largeHorizontal),
      selected && disabled && activeIndicatorStyles.disabled,
    );
  }

  state.root.className = mergeClasses(state.root.className, ...classes, getSlotClassNameProp_unstable(state.root));

  useTabAnimatedIndicatorStyles_unstable(state);

  return state;
};

/**
 * Applies styles to the Tab button slot based on its current state.
 *
 * This hook is typically used internally by `useTabStyles_unstable`. You should
 * only use it directly if you're creating a custom `Tab` component.
 *
 * @param state - The Tab component's current state
 * @param slot - The button slot of the Tab component
 * @returns The state object with updated button styles
 */
export const useSemanticTabButtonStyles_unstable = (state: TabState, slot: TabState['root']): TabState => {
  'use no memo';

  const rootStyles = useRootStyles();
  const focusStyles = useFocusStyles();
  const circularStyles = useCircularAppearanceStyles();

  const { appearance, disabled, selected, size, vertical } = state;

  const isSubtleCircular = appearance === 'subtle-circular';
  const isFilledCircular = appearance === 'filled-circular';
  const isCircular = isSubtleCircular || isFilledCircular;

  const circularAppearance = [
    circularStyles.base,
    focusStyles.circular,
    // sizes
    size === 'medium' && !vertical && circularStyles.mediumHorizontal,
    size === 'medium' && vertical && circularStyles.mediumVertical,
    // subtle-circular appearance
    isSubtleCircular && circularStyles.subtle,
    selected && isSubtleCircular && circularStyles.subtleSelected,
    disabled && isSubtleCircular && circularStyles.subtleDisabled,
    selected && disabled && isSubtleCircular && circularStyles.subtleDisabledSelected,
    // filled-circular appearance
    isFilledCircular && circularStyles.filled,
    selected && isFilledCircular && circularStyles.filledSelected,
    disabled && isFilledCircular && circularStyles.filledDisabled,
    selected && disabled && isFilledCircular && circularStyles.filledDisabledSelected,
  ];

  const regularAppearance = [
    focusStyles.base,
    !disabled && appearance === 'subtle' && rootStyles.subtle,
    !disabled && appearance === 'transparent' && rootStyles.transparent,
    !disabled && selected && rootStyles.selected,
    disabled && appearance === 'subtle' && rootStyles.subtleDisabled,
    disabled && appearance === 'transparent' && rootStyles.transparentDisabled,
  ];

  slot.className = mergeClasses(
    slot.className,
    rootStyles.button,
    // orientation
    vertical ? rootStyles.vertical : rootStyles.horizontal,
    // size
    size === 'small' && (vertical ? rootStyles.smallVertical : rootStyles.smallHorizontal),
    size === 'medium' && (vertical ? rootStyles.mediumVertical : rootStyles.mediumHorizontal),
    size === 'large' && (vertical ? rootStyles.largeVertical : rootStyles.largeHorizontal),
    ...(isCircular ? circularAppearance : regularAppearance),
    disabled && rootStyles.disabledCursor,
    getSlotClassNameProp_unstable(slot),
  );

  return state;
};

/**
 * Applies styles to the Tab content slot based on its current state.
 *
 * This hook is typically used internally by `useTabStyles_unstable`. You should
 * only use it directly if you're creating a custom `Tab` component.
 *
 * @param state - The Tab component's current state
 * @returns The state object with updated content styles
 */
export const useSemanticTabContentStyles_unstable = (state: TabState): TabState => {
  'use no memo';

  const iconStyles = useIconStyles();
  const contentStyles = useContentStyles();

  const { selected, size } = state;

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      tabClassNames.icon,
      iconStyles.base,
      iconStyles[size],
      selected && iconStyles.selected,
      getSlotClassNameProp_unstable(state.icon),
    );
  }

  // This needs to be before state.content.className is updated
  if (state.contentReservedSpace) {
    state.contentReservedSpace.className = mergeClasses(
      state.content.className,
      reservedSpaceClassNames.content,
      contentStyles.base,
      size === 'large' ? contentStyles.largeSelected : contentStyles.selected,
      state.icon ? contentStyles.iconBefore : contentStyles.noIconBefore,
      contentStyles.placeholder,
      getSlotClassNameProp_unstable(state.contentReservedSpace),
    );
    // FIXME: this is a deprecated API
    // should be removed in the next major version
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    state.contentReservedSpaceClassName = state.contentReservedSpace.className;
  }

  state.content.className = mergeClasses(
    state.content.className,
    tabClassNames.content,
    contentStyles.base,
    size === 'large' && contentStyles.large,
    selected && (size === 'large' ? contentStyles.largeSelected : contentStyles.selected),
    state.icon ? contentStyles.iconBefore : contentStyles.noIconBefore,
    getSlotClassNameProp_unstable(state.content),
  );

  return state;
};
