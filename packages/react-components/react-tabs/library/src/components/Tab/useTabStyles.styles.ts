import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TabSlots, TabState } from './Tab.types';
import { useTabAnimatedIndicatorStyles_unstable } from './useTabAnimatedIndicator.styles';

export const tabClassNames: SlotClassNames<TabSlots> = {
  root: 'fui-Tab',
  icon: 'fui-Tab__icon',
  content: 'fui-Tab__content',
};

export const tabReservedSpaceClassNames = {
  content: 'fui-Tab__content--reserved-space',
};

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
    borderRadius: tokens.borderRadiusMedium,
    cursor: 'pointer',
    display: 'grid',
    flexShrink: 0,
    gridAutoFlow: 'column',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto',
    fontFamily: tokens.fontFamilyBase,
    lineHeight: tokens.lineHeightBase300,
    outlineStyle: 'none',
    position: 'relative',
    overflow: 'hidden',
    textTransform: 'none',
  },
  horizontal: {
    justifyContent: 'center',
  },
  vertical: {
    justifyContent: 'start',
  },
  smallHorizontal: {
    columnGap: tokens.spacingHorizontalXXS,
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalSNudge}`,
  },
  smallVertical: {
    // horizontal spacing is deliberate. This is the gap between icon and content.
    columnGap: tokens.spacingHorizontalXXS,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalSNudge}`,
  },
  mediumHorizontal: {
    columnGap: tokens.spacingHorizontalSNudge,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalMNudge}`,
  },
  mediumVertical: {
    // horizontal spacing is deliberate. This is the gap between icon and content.
    columnGap: tokens.spacingHorizontalSNudge,
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalMNudge}`,
  },
  largeHorizontal: {
    columnGap: tokens.spacingHorizontalSNudge,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalMNudge}`,
  },
  largeVertical: {
    // horizontal spacing is deliberate. This is the gap between icon and content.
    columnGap: tokens.spacingHorizontalSNudge,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalMNudge}`,
  },
  transparent: {
    backgroundColor: tokens.colorTransparentBackground,
    ':enabled:hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
    },
    ':enabled:active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
    },
    [`& .${tabClassNames.icon}`]: {
      color: tokens.colorNeutralForeground2,
    },
    [`:enabled:hover .${tabClassNames.icon}`]: {
      color: tokens.colorNeutralForeground2Hover,
    },
    [`:enabled:active .${tabClassNames.icon}`]: {
      color: tokens.colorNeutralForeground2Pressed,
    },
    [`& .${tabClassNames.content}`]: {
      color: tokens.colorNeutralForeground2,
    },
    [`:enabled:hover .${tabClassNames.content}`]: {
      color: tokens.colorNeutralForeground2Hover,
    },
    [`:enabled:active .${tabClassNames.content}`]: {
      color: tokens.colorNeutralForeground2Pressed,
    },
  },
  subtle: {
    backgroundColor: tokens.colorSubtleBackground,
    ':enabled:hover': {
      backgroundColor: tokens.colorSubtleBackgroundHover,
    },
    ':enabled:active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
    },
    [`& .${tabClassNames.icon}`]: {
      color: tokens.colorNeutralForeground2,
    },
    [`:enabled:hover .${tabClassNames.icon}`]: {
      color: tokens.colorNeutralForeground2Hover,
    },
    [`:enabled:active .${tabClassNames.icon}`]: {
      color: tokens.colorNeutralForeground2Pressed,
    },
    [`& .${tabClassNames.content}`]: {
      color: tokens.colorNeutralForeground2,
    },
    [`:enabled:hover .${tabClassNames.content}`]: {
      color: tokens.colorNeutralForeground2Hover,
    },
    [`:enabled:active .${tabClassNames.content}`]: {
      color: tokens.colorNeutralForeground2Pressed,
    },
  },
  disabledCursor: {
    cursor: 'not-allowed',
  },
  disabled: {
    backgroundColor: tokens.colorTransparentBackground,

    [`& .${tabClassNames.icon}`]: {
      color: tokens.colorNeutralForegroundDisabled,
    },
    [`& .${tabClassNames.content}`]: {
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
  selected: {
    [`& .${tabClassNames.icon}`]: {
      color: tokens.colorCompoundBrandForeground1,
    },
    [`:enabled:hover .${tabClassNames.icon}`]: {
      color: tokens.colorCompoundBrandForeground1Hover,
    },
    [`:enabled:active .${tabClassNames.icon}`]: {
      color: tokens.colorCompoundBrandForeground1Pressed,
    },
    [`& .${tabClassNames.content}`]: {
      color: tokens.colorNeutralForeground1,
    },
    [`:enabled:hover .${tabClassNames.content}`]: {
      color: tokens.colorNeutralForeground1Hover,
    },
    [`:enabled:active .${tabClassNames.content}`]: {
      color: tokens.colorNeutralForeground1Pressed,
    },
  },
});

const useCircularAppearanceStyles = makeStyles({
  base: {
    borderRadius: tokens.borderRadiusCircular,
    border: `solid ${tokens.strokeWidthThin} ${tokens.colorTransparentStroke}`,
    [`& .${tabClassNames.icon}`]: {
      color: 'inherit',
    },
    [`& .${tabClassNames.content}`]: {
      color: 'inherit',
    },
  },
  small: {
    paddingBlock: `calc(${tokens.spacingVerticalXXS} - ${tokens.strokeWidthThin})`,
  },
  medium: {
    paddingBlock: `calc(${tokens.spacingVerticalSNudge} - ${tokens.strokeWidthThin})`,
  },
  large: {
    paddingBlock: `calc(${tokens.spacingVerticalS} - ${tokens.strokeWidthThin})`,
  },
  subtle: {
    backgroundColor: tokens.colorSubtleBackground,
    color: tokens.colorNeutralForeground2,
    ':enabled:hover': {
      backgroundColor: tokens.colorSubtleBackgroundHover,
      border: `solid ${tokens.strokeWidthThin} ${tokens.colorNeutralStroke1Hover}`,
      color: tokens.colorNeutralForeground2Hover,
    },
    ':enabled:active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      border: `solid ${tokens.strokeWidthThin} ${tokens.colorNeutralStroke1Pressed}`,
      color: tokens.colorNeutralForeground2Pressed,
    },
    '@media (forced-colors: active)': {
      border: `solid ${tokens.strokeWidthThin} Canvas`,
    },
  },
  subtleSelected: {
    backgroundColor: tokens.colorBrandBackground2,
    border: `solid ${tokens.strokeWidthThin} ${tokens.colorCompoundBrandStroke}`,
    color: tokens.colorBrandForeground2,
    ':enabled:hover': {
      backgroundColor: tokens.colorBrandBackground2Hover,
      border: `solid ${tokens.strokeWidthThin} ${tokens.colorCompoundBrandStrokeHover}`,
      color: tokens.colorBrandForeground2Hover,
    },
    ':enabled:active': {
      backgroundColor: tokens.colorBrandBackground2Pressed,
      border: `solid ${tokens.strokeWidthThin} ${tokens.colorCompoundBrandStrokePressed}`,
      color: tokens.colorBrandForeground2Pressed,
    },
    '@media (forced-colors: active)': {
      border: `solid ${tokens.strokeWidthThin} Highlight`,
    },
  },
  subtleDisabled: {
    backgroundColor: tokens.colorSubtleBackground,
    color: tokens.colorNeutralForegroundDisabled,
  },
  subtleDisabledSelected: {
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    border: `solid ${tokens.strokeWidthThin} ${tokens.colorNeutralStrokeDisabled}`,
    color: tokens.colorNeutralForegroundDisabled,
  },
  filled: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    ':enabled:hover': {
      backgroundColor: tokens.colorNeutralBackground3Hover,
      color: tokens.colorNeutralForeground2Hover,
    },
    ':enabled:active': {
      backgroundColor: tokens.colorNeutralBackground3Pressed,
      color: tokens.colorNeutralForeground2Pressed,
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
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    ':enabled:hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
      color: tokens.colorNeutralForegroundOnBrand,
    },
    ':enabled:active': {
      backgroundColor: tokens.colorBrandBackgroundPressed,
      color: tokens.colorNeutralForegroundOnBrand,
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
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    color: tokens.colorNeutralForegroundDisabled,
  },
  filledDisabledSelected: {
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    border: `solid ${tokens.strokeWidthThin} ${tokens.colorNeutralStrokeDisabled}`,
    color: tokens.colorNeutralForegroundDisabled,
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
      outlineWidth: tokens.strokeWidthThick,
      outlineColor: 'transparent',
      outlineStyle: 'solid',
      boxShadow: `
      ${tokens.shadow4},
      0 0 0 ${tokens.strokeWidthThick} ${tokens.colorStrokeFocus2}
    `,
      zIndex: 1,
    },
    { enableOutline: true },
  ),
  circular: createCustomFocusIndicatorStyle(
    {
      ...shorthands.borderColor('transparent'),
      outlineWidth: tokens.strokeWidthThick,
      outlineColor: 'transparent',
      outlineStyle: 'solid',
      boxShadow: `
        ${tokens.shadow4},
        0 0 0 ${tokens.strokeWidthThick} ${tokens.colorStrokeFocus2},
        0 0 0 ${tokens.strokeWidthThin} ${tokens.colorNeutralStrokeOnBrand} inset
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
      backgroundColor: tokens.colorNeutralStroke1Hover,
      borderRadius: tokens.borderRadiusCircular,
      content: '""',
      position: 'absolute',
    },
    ':active::before': {
      backgroundColor: tokens.colorNeutralStroke1Pressed,
      borderRadius: tokens.borderRadiusCircular,
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
      backgroundColor: tokens.colorTransparentStroke,
    },
    ':active::before': {
      backgroundColor: tokens.colorTransparentStroke,
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
      width: tokens.strokeWidthThicker,
    },
  },
  mediumHorizontal: {
    '::before': {
      bottom: 0,
      height: tokens.strokeWidthThicker,
      left: tokens.spacingHorizontalM,
      right: tokens.spacingHorizontalM,
    },
  },
  mediumVertical: {
    '::before': {
      bottom: tokens.spacingVerticalS,
      left: 0,
      top: tokens.spacingVerticalS,
      width: tokens.strokeWidthThicker,
    },
  },
  largeHorizontal: {
    '::before': {
      bottom: 0,
      height: tokens.strokeWidthThicker,
      left: tokens.spacingHorizontalM,
      right: tokens.spacingHorizontalM,
    },
  },
  largeVertical: {
    '::before': {
      bottom: tokens.spacingVerticalMNudge,
      left: 0,
      top: tokens.spacingVerticalMNudge,
      width: tokens.strokeWidthThicker,
    },
  },
});

const useActiveIndicatorStyles = makeStyles({
  base: {
    '::after': {
      backgroundColor: tokens.colorTransparentStroke,
      borderRadius: tokens.borderRadiusCircular,
      content: '""',
      position: 'absolute',
    },
  },
  selected: {
    '::after': {
      backgroundColor: tokens.colorCompoundBrandStroke,
    },
    ':enabled:hover::after': {
      backgroundColor: tokens.colorCompoundBrandStrokeHover,
    },
    ':enabled:active::after': {
      backgroundColor: tokens.colorCompoundBrandStrokePressed,
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
      backgroundColor: tokens.colorNeutralForegroundDisabled,
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
      width: tokens.strokeWidthThicker,
    },
  },
  mediumHorizontal: {
    '::after': {
      bottom: '0',
      height: tokens.strokeWidthThicker,
      left: tokens.spacingHorizontalM,
      right: tokens.spacingHorizontalM,
    },
  },
  mediumVertical: {
    '::after': {
      bottom: tokens.spacingVerticalS,
      left: 0,
      top: tokens.spacingVerticalS,
      width: tokens.strokeWidthThicker,
    },
  },
  largeHorizontal: {
    '::after': {
      bottom: 0,
      height: tokens.strokeWidthThicker,
      left: tokens.spacingHorizontalM,
      right: tokens.spacingHorizontalM,
    },
  },
  largeVertical: {
    '::after': {
      bottom: tokens.spacingVerticalMNudge,
      left: 0,
      top: tokens.spacingVerticalMNudge,
      width: tokens.strokeWidthThicker,
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
    fontSize: '20px',
    height: '20px',
    width: '20px',
  },
  medium: {
    fontSize: '20px',
    height: '20px',
    width: '20px',
  },
  large: {
    fontSize: '24px',
    height: '24px',
    width: '24px',
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
    ...typographyStyles.body1,
    overflow: 'hidden',
    // content padding is the same for medium & small, horizontal & vertical
    padding: `${tokens.spacingVerticalNone} ${tokens.spacingHorizontalXXS}`,
  },
  selected: {
    ...typographyStyles.body1Strong,
  },
  large: {
    ...typographyStyles.body2,
  },
  largeSelected: {
    ...typographyStyles.subtitle2,
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
export const useTabStyles_unstable = (state: TabState): TabState => {
  'use no memo';

  useTabIndicatorStyles_unstable(state);

  useTabButtonStyles_unstable(state, state.root);

  useTabContentStyles_unstable(state);

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
export const useTabIndicatorStyles_unstable = (state: TabState): TabState => {
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

  state.root.className = mergeClasses(...classes, state.root.className);

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
export const useTabButtonStyles_unstable = (state: TabState, slot: TabState['root']): TabState => {
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
    size === 'small' && circularStyles.small,
    size === 'medium' && circularStyles.medium,
    size === 'large' && circularStyles.large,
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
    disabled && rootStyles.disabled,
  ];

  slot.className = mergeClasses(
    rootStyles.button,
    // orientation
    vertical ? rootStyles.vertical : rootStyles.horizontal,
    // size
    size === 'small' && (vertical ? rootStyles.smallVertical : rootStyles.smallHorizontal),
    size === 'medium' && (vertical ? rootStyles.mediumVertical : rootStyles.mediumHorizontal),
    size === 'large' && (vertical ? rootStyles.largeVertical : rootStyles.largeHorizontal),
    ...(isCircular ? circularAppearance : regularAppearance),
    disabled && rootStyles.disabledCursor,
    slot.className,
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
export const useTabContentStyles_unstable = (state: TabState): TabState => {
  'use no memo';

  const iconStyles = useIconStyles();
  const contentStyles = useContentStyles();

  const { selected, size } = state;

  if (state.icon) {
    state.icon.className = mergeClasses(
      tabClassNames.icon,
      iconStyles.base,
      iconStyles[size],
      selected && iconStyles.selected,
      state.icon.className,
    );
  }

  // This needs to be before state.content.className is updated
  if (state.contentReservedSpace) {
    state.contentReservedSpace.className = mergeClasses(
      tabReservedSpaceClassNames.content,
      contentStyles.base,
      size === 'large' ? contentStyles.largeSelected : contentStyles.selected,
      state.icon ? contentStyles.iconBefore : contentStyles.noIconBefore,
      contentStyles.placeholder,
      state.content.className,
    );
    // FIXME: this is a deprecated API
    // should be removed in the next major version
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    state.contentReservedSpaceClassName = state.contentReservedSpace.className;
  }

  state.content.className = mergeClasses(
    tabClassNames.content,
    contentStyles.base,
    size === 'large' && contentStyles.large,
    selected && (size === 'large' ? contentStyles.largeSelected : contentStyles.selected),
    state.icon ? contentStyles.iconBefore : contentStyles.noIconBefore,
    state.content.className,
  );

  return state;
};
