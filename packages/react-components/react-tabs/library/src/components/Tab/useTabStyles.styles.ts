import type { TabSlots, TabState } from './Tab.types';

import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';
import { useTabAnimatedIndicatorStyles_unstable } from './useTabAnimatedIndicator.styles';

export const tabClassNames: SlotClassNames<TabSlots> = {
  root: 'fui-Tab',
  icon: 'fui-Tab__icon',
  content: 'fui-Tab__content',
};

const reservedSpaceClassNames = {
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
/* eslint-disable @typescript-eslint/naming-convention */
const useRootStyles = makeStyles({
  base: {
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
    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
    },
    ':active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
    },
    '& .fui-Tab__icon': {
      color: tokens.colorNeutralForeground2,
    },
    ':hover .fui-Tab__icon': {
      color: tokens.colorNeutralForeground2Hover,
    },
    ':active .fui-Tab__icon': {
      color: tokens.colorNeutralForeground2Pressed,
    },
    '& .fui-Tab__content': {
      color: tokens.colorNeutralForeground2,
    },
    ':hover .fui-Tab__content': {
      color: tokens.colorNeutralForeground2Hover,
    },
    ':active .fui-Tab__content': {
      color: tokens.colorNeutralForeground2Pressed,
    },
  },
  subtle: {
    backgroundColor: tokens.colorSubtleBackground,
    ':hover': {
      backgroundColor: tokens.colorSubtleBackgroundHover,
    },
    ':active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
    },
    '& .fui-Tab__icon': {
      color: tokens.colorNeutralForeground2,
    },
    ':hover .fui-Tab__icon': {
      color: tokens.colorNeutralForeground2Hover,
    },
    ':active .fui-Tab__icon': {
      color: tokens.colorNeutralForeground2Pressed,
    },
    '& .fui-Tab__content': {
      color: tokens.colorNeutralForeground2,
    },
    ':hover .fui-Tab__content': {
      color: tokens.colorNeutralForeground2Hover,
    },
    ':active .fui-Tab__content': {
      color: tokens.colorNeutralForeground2Pressed,
    },
  },
  disabled: {
    backgroundColor: tokens.colorTransparentBackground,

    '& .fui-Tab__icon': {
      color: tokens.colorNeutralForegroundDisabled,
    },
    '& .fui-Tab__content': {
      color: tokens.colorNeutralForegroundDisabled,
    },
    cursor: 'not-allowed',
  },
  selected: {
    '& .fui-Tab__icon': {
      color: tokens.colorCompoundBrandForeground1,
    },
    ':hover .fui-Tab__icon': {
      color: tokens.colorCompoundBrandForeground1Hover,
    },
    ':active .fui-Tab__icon': {
      color: tokens.colorCompoundBrandForeground1Pressed,
    },
    '& .fui-Tab__content': {
      color: tokens.colorNeutralForeground1,
    },
    ':hover .fui-Tab__content': {
      color: tokens.colorNeutralForeground1Hover,
    },
    ':active .fui-Tab__content': {
      color: tokens.colorNeutralForeground1Pressed,
    },
  },
});
/* eslint-enable @typescript-eslint/naming-convention */

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
    ':hover::after': {
      backgroundColor: tokens.colorCompoundBrandStrokeHover,
    },
    ':active::after': {
      backgroundColor: tokens.colorCompoundBrandStrokePressed,
    },
    '@media (forced-colors: active)': {
      '::after': {
        backgroundColor: 'ButtonText',
      },
      ':hover::after': {
        backgroundColor: 'ButtonText',
      },
      ':active::after': {
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
    // content padding is the same for medium & small, horiztonal & vertical
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

  const rootStyles = useRootStyles();
  const focusStyles = useFocusStyles();
  const pendingIndicatorStyles = usePendingIndicatorStyles();
  const activeIndicatorStyles = useActiveIndicatorStyles();
  const iconStyles = useIconStyles();
  const contentStyles = useContentStyles();

  const { appearance, disabled, selected, size, vertical } = state;

  state.root.className = mergeClasses(
    tabClassNames.root,
    rootStyles.base,
    vertical ? rootStyles.vertical : rootStyles.horizontal,
    size === 'small' && (vertical ? rootStyles.smallVertical : rootStyles.smallHorizontal),
    size === 'medium' && (vertical ? rootStyles.mediumVertical : rootStyles.mediumHorizontal),
    size === 'large' && (vertical ? rootStyles.largeVertical : rootStyles.largeHorizontal),
    focusStyles.base,
    !disabled && appearance === 'subtle' && rootStyles.subtle,
    !disabled && appearance === 'transparent' && rootStyles.transparent,
    !disabled && selected && rootStyles.selected,
    disabled && rootStyles.disabled,

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

    state.root.className,
  );

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
      reservedSpaceClassNames.content,
      contentStyles.base,
      size === 'large' ? contentStyles.largeSelected : contentStyles.selected,
      state.icon ? contentStyles.iconBefore : contentStyles.noIconBefore,
      contentStyles.placeholder,
      state.content.className,
    );
    // FIXME: this is a deprecated API
    // should be removed in the next major version
    // eslint-disable-next-line deprecation/deprecation
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

  useTabAnimatedIndicatorStyles_unstable(state);

  return state;
};
