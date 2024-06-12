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
    borderRadius: `var(--2011, var(--2012, ${tokens.borderRadiusMedium}))`,
    cursor: 'pointer',
    display: 'grid',
    flexShrink: 0,
    gridAutoFlow: 'column',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto',
    fontFamily: `var(--2013, var(--2014, ${tokens.fontFamilyBase}))`,
    lineHeight: `var(--2015, var(--2016, ${tokens.lineHeightBase300}))`,
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
    columnGap: `var(--2017, var(--2018, ${tokens.spacingHorizontalXXS}))`,
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalSNudge}`,
  },
  smallVertical: {
    // horizontal spacing is deliberate. This is the gap between icon and content.
    columnGap: `var(--2019, var(--2020, ${tokens.spacingHorizontalXXS}))`,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalSNudge}`,
  },
  mediumHorizontal: {
    columnGap: `var(--2021, var(--2022, ${tokens.spacingHorizontalSNudge}))`,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalMNudge}`,
  },
  mediumVertical: {
    // horizontal spacing is deliberate. This is the gap between icon and content.
    columnGap: `var(--2023, var(--2024, ${tokens.spacingHorizontalSNudge}))`,
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalMNudge}`,
  },
  largeHorizontal: {
    columnGap: `var(--2025, var(--2026, ${tokens.spacingHorizontalSNudge}))`,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalMNudge}`,
  },
  largeVertical: {
    // horizontal spacing is deliberate. This is the gap between icon and content.
    columnGap: `var(--2027, var(--2028, ${tokens.spacingHorizontalSNudge}))`,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalMNudge}`,
  },
  transparent: {
    backgroundColor: `var(--2029, var(--2030, ${tokens.colorTransparentBackground}))`,
    ':hover': {
      backgroundColor: `var(--2031, var(--2032, ${tokens.colorTransparentBackgroundHover}))`,
    },
    ':active': {
      backgroundColor: `var(--2033, var(--2034, ${tokens.colorTransparentBackgroundPressed}))`,
    },
    '& .fui-Tab__icon': {
      color: `var(--2035, var(--2036, ${tokens.colorNeutralForeground2}))`,
    },
    ':hover .fui-Tab__icon': {
      color: `var(--2037, var(--2038, ${tokens.colorNeutralForeground2Hover}))`,
    },
    ':active .fui-Tab__icon': {
      color: `var(--2039, var(--2040, ${tokens.colorNeutralForeground2Pressed}))`,
    },
    '& .fui-Tab__content': {
      color: `var(--2041, var(--2042, ${tokens.colorNeutralForeground2}))`,
    },
    ':hover .fui-Tab__content': {
      color: `var(--2043, var(--2044, ${tokens.colorNeutralForeground2Hover}))`,
    },
    ':active .fui-Tab__content': {
      color: `var(--2045, var(--2046, ${tokens.colorNeutralForeground2Pressed}))`,
    },
  },
  subtle: {
    backgroundColor: `var(--2047, var(--2048, ${tokens.colorSubtleBackground}))`,
    ':hover': {
      backgroundColor: `var(--2049, var(--2050, ${tokens.colorSubtleBackgroundHover}))`,
    },
    ':active': {
      backgroundColor: `var(--2051, var(--2052, ${tokens.colorSubtleBackgroundPressed}))`,
    },
    '& .fui-Tab__icon': {
      color: `var(--2053, var(--2054, ${tokens.colorNeutralForeground2}))`,
    },
    ':hover .fui-Tab__icon': {
      color: `var(--2055, var(--2056, ${tokens.colorNeutralForeground2Hover}))`,
    },
    ':active .fui-Tab__icon': {
      color: `var(--2057, var(--2058, ${tokens.colorNeutralForeground2Pressed}))`,
    },
    '& .fui-Tab__content': {
      color: `var(--2059, var(--2060, ${tokens.colorNeutralForeground2}))`,
    },
    ':hover .fui-Tab__content': {
      color: `var(--2061, var(--2062, ${tokens.colorNeutralForeground2Hover}))`,
    },
    ':active .fui-Tab__content': {
      color: `var(--2063, var(--2064, ${tokens.colorNeutralForeground2Pressed}))`,
    },
  },
  disabled: {
    backgroundColor: `var(--2065, var(--2066, ${tokens.colorTransparentBackground}))`,

    '& .fui-Tab__icon': {
      color: `var(--2067, var(--2068, ${tokens.colorNeutralForegroundDisabled}))`,
    },
    '& .fui-Tab__content': {
      color: `var(--2069, var(--2070, ${tokens.colorNeutralForegroundDisabled}))`,
    },
    cursor: 'not-allowed',
  },
  selected: {
    '& .fui-Tab__icon': {
      color: `var(--2071, var(--2072, ${tokens.colorCompoundBrandForeground1}))`,
    },
    ':hover .fui-Tab__icon': {
      color: `var(--2073, var(--2074, ${tokens.colorCompoundBrandForeground1Hover}))`,
    },
    ':active .fui-Tab__icon': {
      color: `var(--2075, var(--2076, ${tokens.colorCompoundBrandForeground1Pressed}))`,
    },
    '& .fui-Tab__content': {
      color: `var(--2077, var(--2078, ${tokens.colorNeutralForeground1}))`,
    },
    ':hover .fui-Tab__content': {
      color: `var(--2079, var(--2080, ${tokens.colorNeutralForeground1Hover}))`,
    },
    ':active .fui-Tab__content': {
      color: `var(--2081, var(--2082, ${tokens.colorNeutralForeground1Pressed}))`,
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
      outlineWidth: `var(--2083, var(--2084, ${tokens.strokeWidthThick}))`,
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
      backgroundColor: `var(--2085, var(--2086, ${tokens.colorNeutralStroke1Hover}))`,
      borderRadius: `var(--2087, var(--2088, ${tokens.borderRadiusCircular}))`,
      content: '""',
      position: 'absolute',
    },
    ':active::before': {
      backgroundColor: `var(--2089, var(--2090, ${tokens.colorNeutralStroke1Pressed}))`,
      borderRadius: `var(--2091, var(--2092, ${tokens.borderRadiusCircular}))`,
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
      backgroundColor: `var(--2093, var(--2094, ${tokens.colorTransparentStroke}))`,
    },
    ':active::before': {
      backgroundColor: `var(--2095, var(--2096, ${tokens.colorTransparentStroke}))`,
    },
  },
  smallHorizontal: {
    '::before': {
      bottom: 0,
      height: `var(--2097, var(--2098, ${tokens.strokeWidthThick}))`,
      left: `var(--2099, var(--2100, ${tokens.spacingHorizontalSNudge}))`,
      right: `var(--2101, var(--2102, ${tokens.spacingHorizontalSNudge}))`,
    },
  },
  smallVertical: {
    '::before': {
      bottom: `var(--2103, var(--2104, ${tokens.spacingVerticalXS}))`,
      left: 0,
      top: `var(--2105, var(--2106, ${tokens.spacingVerticalXS}))`,
      width: `var(--2107, var(--2108, ${tokens.strokeWidthThicker}))`,
    },
  },
  mediumHorizontal: {
    '::before': {
      bottom: 0,
      height: `var(--2109, var(--2110, ${tokens.strokeWidthThicker}))`,
      left: `var(--2111, var(--2112, ${tokens.spacingHorizontalM}))`,
      right: `var(--2113, var(--2114, ${tokens.spacingHorizontalM}))`,
    },
  },
  mediumVertical: {
    '::before': {
      bottom: `var(--2115, var(--2116, ${tokens.spacingVerticalS}))`,
      left: 0,
      top: `var(--2117, var(--2118, ${tokens.spacingVerticalS}))`,
      width: `var(--2119, var(--2120, ${tokens.strokeWidthThicker}))`,
    },
  },
  largeHorizontal: {
    '::before': {
      bottom: 0,
      height: `var(--2121, var(--2122, ${tokens.strokeWidthThicker}))`,
      left: `var(--2123, var(--2124, ${tokens.spacingHorizontalM}))`,
      right: `var(--2125, var(--2126, ${tokens.spacingHorizontalM}))`,
    },
  },
  largeVertical: {
    '::before': {
      bottom: `var(--2127, var(--2128, ${tokens.spacingVerticalMNudge}))`,
      left: 0,
      top: `var(--2129, var(--2130, ${tokens.spacingVerticalMNudge}))`,
      width: `var(--2131, var(--2132, ${tokens.strokeWidthThicker}))`,
    },
  },
});

const useActiveIndicatorStyles = makeStyles({
  base: {
    '::after': {
      backgroundColor: `var(--2133, var(--2134, ${tokens.colorTransparentStroke}))`,
      borderRadius: `var(--2135, var(--2136, ${tokens.borderRadiusCircular}))`,
      content: '""',
      position: 'absolute',
    },
  },
  selected: {
    '::after': {
      backgroundColor: `var(--2137, var(--2138, ${tokens.colorCompoundBrandStroke}))`,
    },
    ':hover::after': {
      backgroundColor: `var(--2139, var(--2140, ${tokens.colorCompoundBrandStrokeHover}))`,
    },
    ':active::after': {
      backgroundColor: `var(--2141, var(--2142, ${tokens.colorCompoundBrandStrokePressed}))`,
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
      backgroundColor: `var(--2143, var(--2144, ${tokens.colorNeutralForegroundDisabled}))`,
    },
  },
  smallHorizontal: {
    '::after': {
      bottom: 0,
      height: `var(--2145, var(--2146, ${tokens.strokeWidthThick}))`,
      left: `var(--2147, var(--2148, ${tokens.spacingHorizontalSNudge}))`,
      right: `var(--2149, var(--2150, ${tokens.spacingHorizontalSNudge}))`,
    },
  },
  smallVertical: {
    '::after': {
      bottom: `var(--2151, var(--2152, ${tokens.spacingVerticalXS}))`,
      left: '0',
      top: `var(--2153, var(--2154, ${tokens.spacingVerticalXS}))`,
      width: `var(--2155, var(--2156, ${tokens.strokeWidthThicker}))`,
    },
  },
  mediumHorizontal: {
    '::after': {
      bottom: '0',
      height: `var(--2157, var(--2158, ${tokens.strokeWidthThicker}))`,
      left: `var(--2159, var(--2160, ${tokens.spacingHorizontalM}))`,
      right: `var(--2161, var(--2162, ${tokens.spacingHorizontalM}))`,
    },
  },
  mediumVertical: {
    '::after': {
      bottom: `var(--2163, var(--2164, ${tokens.spacingVerticalS}))`,
      left: 0,
      top: `var(--2165, var(--2166, ${tokens.spacingVerticalS}))`,
      width: `var(--2167, var(--2168, ${tokens.strokeWidthThicker}))`,
    },
  },
  largeHorizontal: {
    '::after': {
      bottom: 0,
      height: `var(--2169, var(--2170, ${tokens.strokeWidthThicker}))`,
      left: `var(--2171, var(--2172, ${tokens.spacingHorizontalM}))`,
      right: `var(--2173, var(--2174, ${tokens.spacingHorizontalM}))`,
    },
  },
  largeVertical: {
    '::after': {
      bottom: `var(--2175, var(--2176, ${tokens.spacingVerticalMNudge}))`,
      left: 0,
      top: `var(--2177, var(--2178, ${tokens.spacingVerticalMNudge}))`,
      width: `var(--2179, var(--2180, ${tokens.strokeWidthThicker}))`,
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
