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
    borderRadius: `var(--ctrl-token-Tab-2011, var(--semantic-token-Tab-2012, ${tokens.borderRadiusMedium}))`,
    cursor: 'pointer',
    display: 'grid',
    flexShrink: 0,
    gridAutoFlow: 'column',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto',
    fontFamily: `var(--ctrl-token-Tab-2013, var(--semantic-token-Tab-2014, ${tokens.fontFamilyBase}))`,
    lineHeight: `var(--ctrl-token-Tab-2015, var(--semantic-token-Tab-2016, ${tokens.lineHeightBase300}))`,
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
    columnGap: `var(--ctrl-token-Tab-2017, var(--semantic-token-Tab-2018, ${tokens.spacingHorizontalXXS}))`,
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalSNudge}`,
  },
  smallVertical: {
    // horizontal spacing is deliberate. This is the gap between icon and content.
    columnGap: `var(--ctrl-token-Tab-2019, var(--semantic-token-Tab-2020, ${tokens.spacingHorizontalXXS}))`,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalSNudge}`,
  },
  mediumHorizontal: {
    columnGap: `var(--ctrl-token-Tab-2021, var(--semantic-token-Tab-2022, ${tokens.spacingHorizontalSNudge}))`,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalMNudge}`,
  },
  mediumVertical: {
    // horizontal spacing is deliberate. This is the gap between icon and content.
    columnGap: `var(--ctrl-token-Tab-2023, var(--semantic-token-Tab-2024, ${tokens.spacingHorizontalSNudge}))`,
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalMNudge}`,
  },
  largeHorizontal: {
    columnGap: `var(--ctrl-token-Tab-2025, var(--semantic-token-Tab-2026, ${tokens.spacingHorizontalSNudge}))`,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalMNudge}`,
  },
  largeVertical: {
    // horizontal spacing is deliberate. This is the gap between icon and content.
    columnGap: `var(--ctrl-token-Tab-2027, var(--semantic-token-Tab-2028, ${tokens.spacingHorizontalSNudge}))`,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalMNudge}`,
  },
  transparent: {
    backgroundColor: `var(--ctrl-token-Tab-2029, var(--semantic-token-Tab-2030, ${tokens.colorTransparentBackground}))`,
    ':hover': {
      backgroundColor: `var(--ctrl-token-Tab-2031, var(--semantic-token-Tab-2032, ${tokens.colorTransparentBackgroundHover}))`,
    },
    ':active': {
      backgroundColor: `var(--ctrl-token-Tab-2033, var(--semantic-token-Tab-2034, ${tokens.colorTransparentBackgroundPressed}))`,
    },
    '& .fui-Tab__icon': {
      color: `var(--ctrl-token-Tab-2035, var(--semantic-token-Tab-2036, ${tokens.colorNeutralForeground2}))`,
    },
    ':hover .fui-Tab__icon': {
      color: `var(--ctrl-token-Tab-2037, var(--semantic-token-Tab-2038, ${tokens.colorNeutralForeground2Hover}))`,
    },
    ':active .fui-Tab__icon': {
      color: `var(--ctrl-token-Tab-2039, var(--semantic-token-Tab-2040, ${tokens.colorNeutralForeground2Pressed}))`,
    },
    '& .fui-Tab__content': {
      color: `var(--ctrl-token-Tab-2041, var(--semantic-token-Tab-2042, ${tokens.colorNeutralForeground2}))`,
    },
    ':hover .fui-Tab__content': {
      color: `var(--ctrl-token-Tab-2043, var(--semantic-token-Tab-2044, ${tokens.colorNeutralForeground2Hover}))`,
    },
    ':active .fui-Tab__content': {
      color: `var(--ctrl-token-Tab-2045, var(--semantic-token-Tab-2046, ${tokens.colorNeutralForeground2Pressed}))`,
    },
  },
  subtle: {
    backgroundColor: `var(--ctrl-token-Tab-2047, var(--semantic-token-Tab-2048, ${tokens.colorSubtleBackground}))`,
    ':hover': {
      backgroundColor: `var(--ctrl-token-Tab-2049, var(--semantic-token-Tab-2050, ${tokens.colorSubtleBackgroundHover}))`,
    },
    ':active': {
      backgroundColor: `var(--ctrl-token-Tab-2051, var(--semantic-token-Tab-2052, ${tokens.colorSubtleBackgroundPressed}))`,
    },
    '& .fui-Tab__icon': {
      color: `var(--ctrl-token-Tab-2053, var(--semantic-token-Tab-2054, ${tokens.colorNeutralForeground2}))`,
    },
    ':hover .fui-Tab__icon': {
      color: `var(--ctrl-token-Tab-2055, var(--semantic-token-Tab-2056, ${tokens.colorNeutralForeground2Hover}))`,
    },
    ':active .fui-Tab__icon': {
      color: `var(--ctrl-token-Tab-2057, var(--semantic-token-Tab-2058, ${tokens.colorNeutralForeground2Pressed}))`,
    },
    '& .fui-Tab__content': {
      color: `var(--ctrl-token-Tab-2059, var(--semantic-token-Tab-2060, ${tokens.colorNeutralForeground2}))`,
    },
    ':hover .fui-Tab__content': {
      color: `var(--ctrl-token-Tab-2061, var(--semantic-token-Tab-2062, ${tokens.colorNeutralForeground2Hover}))`,
    },
    ':active .fui-Tab__content': {
      color: `var(--ctrl-token-Tab-2063, var(--semantic-token-Tab-2064, ${tokens.colorNeutralForeground2Pressed}))`,
    },
  },
  disabled: {
    backgroundColor: `var(--ctrl-token-Tab-2065, var(--semantic-token-Tab-2066, ${tokens.colorTransparentBackground}))`,

    '& .fui-Tab__icon': {
      color: `var(--ctrl-token-Tab-2067, var(--semantic-token-Tab-2068, ${tokens.colorNeutralForegroundDisabled}))`,
    },
    '& .fui-Tab__content': {
      color: `var(--ctrl-token-Tab-2069, var(--semantic-token-Tab-2070, ${tokens.colorNeutralForegroundDisabled}))`,
    },
    cursor: 'not-allowed',
  },
  selected: {
    '& .fui-Tab__icon': {
      color: `var(--ctrl-token-Tab-2071, var(--semantic-token-Tab-2072, ${tokens.colorCompoundBrandForeground1}))`,
    },
    ':hover .fui-Tab__icon': {
      color: `var(--ctrl-token-Tab-2073, var(--semantic-token-Tab-2074, ${tokens.colorCompoundBrandForeground1Hover}))`,
    },
    ':active .fui-Tab__icon': {
      color: `var(--ctrl-token-Tab-2075, var(--semantic-token-Tab-2076, ${tokens.colorCompoundBrandForeground1Pressed}))`,
    },
    '& .fui-Tab__content': {
      color: `var(--ctrl-token-Tab-2077, var(--semantic-token-Tab-2078, ${tokens.colorNeutralForeground1}))`,
    },
    ':hover .fui-Tab__content': {
      color: `var(--ctrl-token-Tab-2079, var(--semantic-token-Tab-2080, ${tokens.colorNeutralForeground1Hover}))`,
    },
    ':active .fui-Tab__content': {
      color: `var(--ctrl-token-Tab-2081, var(--semantic-token-Tab-2082, ${tokens.colorNeutralForeground1Pressed}))`,
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
      outlineWidth: `var(--ctrl-token-Tab-2083, var(--semantic-token-Tab-2084, ${tokens.strokeWidthThick}))`,
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
      backgroundColor: `var(--ctrl-token-Tab-2085, var(--semantic-token-Tab-2086, ${tokens.colorNeutralStroke1Hover}))`,
      borderRadius: `var(--ctrl-token-Tab-2087, var(--semantic-token-Tab-2088, ${tokens.borderRadiusCircular}))`,
      content: '""',
      position: 'absolute',
    },
    ':active::before': {
      backgroundColor: `var(--ctrl-token-Tab-2089, var(--semantic-token-Tab-2090, ${tokens.colorNeutralStroke1Pressed}))`,
      borderRadius: `var(--ctrl-token-Tab-2091, var(--semantic-token-Tab-2092, ${tokens.borderRadiusCircular}))`,
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
      backgroundColor: `var(--ctrl-token-Tab-2093, var(--semantic-token-Tab-2094, ${tokens.colorTransparentStroke}))`,
    },
    ':active::before': {
      backgroundColor: `var(--ctrl-token-Tab-2095, var(--semantic-token-Tab-2096, ${tokens.colorTransparentStroke}))`,
    },
  },
  smallHorizontal: {
    '::before': {
      bottom: 0,
      height: `var(--ctrl-token-Tab-2097, var(--semantic-token-Tab-2098, ${tokens.strokeWidthThick}))`,
      left: `var(--ctrl-token-Tab-2099, var(--semantic-token-Tab-2100, ${tokens.spacingHorizontalSNudge}))`,
      right: `var(--ctrl-token-Tab-2101, var(--semantic-token-Tab-2102, ${tokens.spacingHorizontalSNudge}))`,
    },
  },
  smallVertical: {
    '::before': {
      bottom: `var(--ctrl-token-Tab-2103, var(--semantic-token-Tab-2104, ${tokens.spacingVerticalXS}))`,
      left: 0,
      top: `var(--ctrl-token-Tab-2105, var(--semantic-token-Tab-2106, ${tokens.spacingVerticalXS}))`,
      width: `var(--ctrl-token-Tab-2107, var(--semantic-token-Tab-2108, ${tokens.strokeWidthThicker}))`,
    },
  },
  mediumHorizontal: {
    '::before': {
      bottom: 0,
      height: `var(--ctrl-token-Tab-2109, var(--semantic-token-Tab-2110, ${tokens.strokeWidthThicker}))`,
      left: `var(--ctrl-token-Tab-2111, var(--semantic-token-Tab-2112, ${tokens.spacingHorizontalM}))`,
      right: `var(--ctrl-token-Tab-2113, var(--semantic-token-Tab-2114, ${tokens.spacingHorizontalM}))`,
    },
  },
  mediumVertical: {
    '::before': {
      bottom: `var(--ctrl-token-Tab-2115, var(--semantic-token-Tab-2116, ${tokens.spacingVerticalS}))`,
      left: 0,
      top: `var(--ctrl-token-Tab-2117, var(--semantic-token-Tab-2118, ${tokens.spacingVerticalS}))`,
      width: `var(--ctrl-token-Tab-2119, var(--semantic-token-Tab-2120, ${tokens.strokeWidthThicker}))`,
    },
  },
  largeHorizontal: {
    '::before': {
      bottom: 0,
      height: `var(--ctrl-token-Tab-2121, var(--semantic-token-Tab-2122, ${tokens.strokeWidthThicker}))`,
      left: `var(--ctrl-token-Tab-2123, var(--semantic-token-Tab-2124, ${tokens.spacingHorizontalM}))`,
      right: `var(--ctrl-token-Tab-2125, var(--semantic-token-Tab-2126, ${tokens.spacingHorizontalM}))`,
    },
  },
  largeVertical: {
    '::before': {
      bottom: `var(--ctrl-token-Tab-2127, var(--semantic-token-Tab-2128, ${tokens.spacingVerticalMNudge}))`,
      left: 0,
      top: `var(--ctrl-token-Tab-2129, var(--semantic-token-Tab-2130, ${tokens.spacingVerticalMNudge}))`,
      width: `var(--ctrl-token-Tab-2131, var(--semantic-token-Tab-2132, ${tokens.strokeWidthThicker}))`,
    },
  },
});

const useActiveIndicatorStyles = makeStyles({
  base: {
    '::after': {
      backgroundColor: `var(--ctrl-token-Tab-2133, var(--semantic-token-Tab-2134, ${tokens.colorTransparentStroke}))`,
      borderRadius: `var(--ctrl-token-Tab-2135, var(--semantic-token-Tab-2136, ${tokens.borderRadiusCircular}))`,
      content: '""',
      position: 'absolute',
    },
  },
  selected: {
    '::after': {
      backgroundColor: `var(--ctrl-token-Tab-2137, var(--semantic-token-Tab-2138, ${tokens.colorCompoundBrandStroke}))`,
    },
    ':hover::after': {
      backgroundColor: `var(--ctrl-token-Tab-2139, var(--semantic-token-Tab-2140, ${tokens.colorCompoundBrandStrokeHover}))`,
    },
    ':active::after': {
      backgroundColor: `var(--ctrl-token-Tab-2141, var(--semantic-token-Tab-2142, ${tokens.colorCompoundBrandStrokePressed}))`,
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
      backgroundColor: `var(--ctrl-token-Tab-2143, var(--semantic-token-Tab-2144, ${tokens.colorNeutralForegroundDisabled}))`,
    },
  },
  smallHorizontal: {
    '::after': {
      bottom: 0,
      height: `var(--ctrl-token-Tab-2145, var(--semantic-token-Tab-2146, ${tokens.strokeWidthThick}))`,
      left: `var(--ctrl-token-Tab-2147, var(--semantic-token-Tab-2148, ${tokens.spacingHorizontalSNudge}))`,
      right: `var(--ctrl-token-Tab-2149, var(--semantic-token-Tab-2150, ${tokens.spacingHorizontalSNudge}))`,
    },
  },
  smallVertical: {
    '::after': {
      bottom: `var(--ctrl-token-Tab-2151, var(--semantic-token-Tab-2152, ${tokens.spacingVerticalXS}))`,
      left: '0',
      top: `var(--ctrl-token-Tab-2153, var(--semantic-token-Tab-2154, ${tokens.spacingVerticalXS}))`,
      width: `var(--ctrl-token-Tab-2155, var(--semantic-token-Tab-2156, ${tokens.strokeWidthThicker}))`,
    },
  },
  mediumHorizontal: {
    '::after': {
      bottom: '0',
      height: `var(--ctrl-token-Tab-2157, var(--semantic-token-Tab-2158, ${tokens.strokeWidthThicker}))`,
      left: `var(--ctrl-token-Tab-2159, var(--semantic-token-Tab-2160, ${tokens.spacingHorizontalM}))`,
      right: `var(--ctrl-token-Tab-2161, var(--semantic-token-Tab-2162, ${tokens.spacingHorizontalM}))`,
    },
  },
  mediumVertical: {
    '::after': {
      bottom: `var(--ctrl-token-Tab-2163, var(--semantic-token-Tab-2164, ${tokens.spacingVerticalS}))`,
      left: 0,
      top: `var(--ctrl-token-Tab-2165, var(--semantic-token-Tab-2166, ${tokens.spacingVerticalS}))`,
      width: `var(--ctrl-token-Tab-2167, var(--semantic-token-Tab-2168, ${tokens.strokeWidthThicker}))`,
    },
  },
  largeHorizontal: {
    '::after': {
      bottom: 0,
      height: `var(--ctrl-token-Tab-2169, var(--semantic-token-Tab-2170, ${tokens.strokeWidthThicker}))`,
      left: `var(--ctrl-token-Tab-2171, var(--semantic-token-Tab-2172, ${tokens.spacingHorizontalM}))`,
      right: `var(--ctrl-token-Tab-2173, var(--semantic-token-Tab-2174, ${tokens.spacingHorizontalM}))`,
    },
  },
  largeVertical: {
    '::after': {
      bottom: `var(--ctrl-token-Tab-2175, var(--semantic-token-Tab-2176, ${tokens.spacingVerticalMNudge}))`,
      left: 0,
      top: `var(--ctrl-token-Tab-2177, var(--semantic-token-Tab-2178, ${tokens.spacingVerticalMNudge}))`,
      width: `var(--ctrl-token-Tab-2179, var(--semantic-token-Tab-2180, ${tokens.strokeWidthThicker}))`,
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
