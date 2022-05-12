import type { TabSlots, TabState } from './Tab.types';

import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { SlotClassNames } from '@fluentui/react-utilities';
import { useTabAnimatedIndicatorStyles_unstable } from './useTabAnimatedIndicator';

export const tabClassNames: SlotClassNames<TabSlots> = {
  root: 'fui-Tab',
  icon: 'fui-Tab__icon',
  content: 'fui-Tab__content',
};

// TODO temporary export to pass conformance test.
export const tabClassName = tabClassNames.root;

/**
 * Styles for the root slot
 */
/* eslint-disable @typescript-eslint/naming-convention */
const useRootStyles = makeStyles({
  base: {
    alignItems: 'center',
    ...shorthands.borderColor('none'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.borderWidth(0),
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
    ...shorthands.overflow('hidden'),
    textTransform: 'none',
  },
  horizontal: {
    justifyContent: 'center',
  },
  vertical: {
    justifyContent: 'start',
  },
  mediumHorizontal: {
    columnGap: tokens.spacingHorizontalSNudge,
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalMNudge),
  },
  mediumVertical: {
    // horizontal spacing is deliberate. This is the gap between icon and content.
    columnGap: tokens.spacingHorizontalSNudge,
    ...shorthands.padding(tokens.spacingVerticalSNudge, tokens.spacingHorizontalMNudge),
  },
  smallHorizontal: {
    columnGap: tokens.spacingHorizontalXXS,
    ...shorthands.padding(tokens.spacingVerticalSNudge, tokens.spacingHorizontalSNudge),
  },
  smallVertical: {
    // horizontal spacing is deliberate. This is the gap between icon and content.
    columnGap: tokens.spacingHorizontalXXS,
    ...shorthands.padding(tokens.spacingVerticalXXS, tokens.spacingHorizontalSNudge),
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
  base: createCustomFocusIndicatorStyle({
    ...shorthands.borderColor('transparent'),
    outlineWidth: tokens.strokeWidthThick,
    outlineColor: 'transparent',
    outlineStyle: 'solid',
    boxShadow: `
      ${tokens.shadow4},
      0 0 0 ${tokens.strokeWidthThick} ${tokens.colorStrokeFocus2}
    `,
    zIndex: 1,
  }),
});

/** Indicator styles for when pending selection */
const usePendingIndicatorStyles = makeStyles({
  base: {
    ':hover::before': {
      backgroundColor: tokens.colorNeutralStroke1Hover,
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      content: '""',
      position: 'absolute',
    },
    ':active::before': {
      backgroundColor: tokens.colorNeutralStroke1Pressed,
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
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
});

const useActiveIndicatorStyles = makeStyles({
  base: {
    '::after': {
      backgroundColor: tokens.colorTransparentStroke,
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      content: '""',
      position: 'absolute',
      zIndex: 1,
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
});

/**
 * Styles for the icon slot.
 */
const useIconStyles = makeStyles({
  base: {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    ...shorthands.overflow('hidden'),
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
});

/**
 * Styles for the content slot (children)
 */
const useContentStyles = makeStyles({
  base: {
    ...typographyStyles.body1,
    ...shorthands.overflow('hidden'),
    // content padding is the same for medium & small, horiztonal & vertical
    ...shorthands.padding(tokens.spacingVerticalNone, tokens.spacingHorizontalXXS),
  },
  selected: {
    ...typographyStyles.body1Strong,
  },
});

/**
 * Apply styling to the Tab slots based on the state
 */
export const useTabStyles_unstable = (state: TabState): TabState => {
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
    size !== 'small' && (vertical ? rootStyles.mediumVertical : rootStyles.mediumHorizontal),
    size === 'small' && (vertical ? rootStyles.smallVertical : rootStyles.smallHorizontal),
    focusStyles.base,
    !disabled && appearance === 'subtle' && rootStyles.subtle,
    !disabled && appearance === 'transparent' && rootStyles.transparent,
    !disabled && selected && rootStyles.selected,
    disabled && rootStyles.disabled,

    // pending indicator (before pseudo element)
    pendingIndicatorStyles.base,
    size !== 'small' && (vertical ? pendingIndicatorStyles.mediumVertical : pendingIndicatorStyles.mediumHorizontal),
    size === 'small' && (vertical ? pendingIndicatorStyles.smallVertical : pendingIndicatorStyles.smallHorizontal),
    disabled && pendingIndicatorStyles.disabled,

    // active indicator (after pseudo element)
    selected && activeIndicatorStyles.base,
    selected && !disabled && activeIndicatorStyles.selected,
    selected &&
      size !== 'small' &&
      (vertical ? activeIndicatorStyles.mediumVertical : activeIndicatorStyles.mediumHorizontal),
    selected &&
      size === 'small' &&
      (vertical ? activeIndicatorStyles.smallVertical : activeIndicatorStyles.smallHorizontal),
    selected && disabled && activeIndicatorStyles.disabled,
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(tabClassNames.icon, iconStyles.base, iconStyles[size], state.icon.className);
  }

  state.content.className = mergeClasses(
    tabClassNames.content,
    contentStyles.base,
    selected && contentStyles.selected,
    state.content.className,
  );

  useTabAnimatedIndicatorStyles_unstable(state);

  return state;
};
