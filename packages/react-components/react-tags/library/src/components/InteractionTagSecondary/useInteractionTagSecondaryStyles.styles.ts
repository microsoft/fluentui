import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { InteractionTagSecondarySlots, InteractionTagSecondaryState } from './InteractionTagSecondary.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';

export const interactionTagSecondaryClassNames: SlotClassNames<InteractionTagSecondarySlots> = {
  root: 'fui-InteractionTagSecondary',
};

const mediumIconSize = '20px';
const smallIconSize = '16px';
const extraSmallIconSize = '12px';

const useRootBaseClassName = makeResetStyles({
  // reset default button style:
  color: 'inherit',
  fontFamily: 'inherit',
  padding: '0px',
  borderStyle: 'none',
  appearance: 'button',
  textAlign: 'unset',
  backgroundColor: 'transparent',

  display: 'flex',
  height: '100%',
  alignItems: 'center',

  ...createCustomFocusIndicatorStyle({
    outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
  }),

  border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,

  // divider:
  borderLeftColor: `var(--2375, var(--2376, ${tokens.colorNeutralStroke1}))`,
  borderTopLeftRadius: `var(--2377, var(--2378, ${tokens.borderRadiusNone}))`,
  borderBottomLeftRadius: `var(--2379, var(--2380, ${tokens.borderRadiusNone}))`,
});

const useRootStyles = makeStyles({
  filled: {
    backgroundColor: `var(--2381, var(--2382, ${tokens.colorNeutralBackground3}))`,
    color: `var(--2383, var(--2384, ${tokens.colorNeutralForeground2}))`,
    ':hover': {
      cursor: 'pointer',
      backgroundColor: `var(--2385, var(--2386, ${tokens.colorNeutralBackground3Hover}))`,
      color: `var(--2387, var(--2388, ${tokens.colorNeutralForeground2BrandHover}))`,
    },
    ':active': {
      backgroundColor: `var(--2389, var(--2390, ${tokens.colorNeutralBackground3Pressed}))`,
      color: `var(--2391, var(--2392, ${tokens.colorNeutralForeground2BrandPressed}))`,
    },
    '@media (forced-colors: active)': {
      ':hover': {
        backgroundColor: 'HighlightText',
      },
      ':active': {
        backgroundColor: 'HighlightText',
      },
    },
  },
  outline: {
    backgroundColor: `var(--2393, var(--2394, ${tokens.colorSubtleBackground}))`,
    color: `var(--2395, var(--2396, ${tokens.colorNeutralForeground2}))`,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    ':hover': {
      cursor: 'pointer',
      backgroundColor: `var(--2397, var(--2398, ${tokens.colorSubtleBackgroundHover}))`,
      color: `var(--2399, var(--2400, ${tokens.colorNeutralForeground2BrandHover}))`,
    },
    ':active': {
      backgroundColor: `var(--2401, var(--2402, ${tokens.colorSubtleBackgroundPressed}))`,
      color: `var(--2403, var(--2404, ${tokens.colorNeutralForeground2BrandPressed}))`,
    },
    '@media (forced-colors: active)': {
      ':hover': {
        backgroundColor: 'HighlightText',
      },
      ':active': {
        backgroundColor: 'HighlightText',
      },
    },
  },
  brand: {
    backgroundColor: `var(--2405, var(--2406, ${tokens.colorBrandBackground2}))`,
    color: `var(--2407, var(--2408, ${tokens.colorBrandForeground2}))`,
    borderLeftColor: `var(--2409, var(--2410, ${tokens.colorBrandStroke2}))`, // divider
    ':hover': {
      cursor: 'pointer',
      backgroundColor: `var(--2411, var(--2412, ${tokens.colorBrandBackground2Hover}))`,
      color: `var(--2413, var(--2414, ${tokens.colorCompoundBrandForeground1Hover}))`,
    },
    ':active': {
      backgroundColor: `var(--2415, var(--2416, ${tokens.colorBrandBackground2Pressed}))`,
      color: `var(--2417, var(--2418, ${tokens.colorCompoundBrandForeground1Pressed}))`,
    },
    '@media (forced-colors: active)': {
      ':hover': {
        backgroundColor: 'HighlightText',
      },
      ':active': {
        backgroundColor: 'HighlightText',
      },
    },
  },

  rounded: {
    borderTopRightRadius: `var(--2419, var(--2420, ${tokens.borderRadiusMedium}))`,
    borderBottomRightRadius: `var(--2421, var(--2422, ${tokens.borderRadiusMedium}))`,
  },
  circular: {
    borderTopRightRadius: `var(--2423, var(--2424, ${tokens.borderRadiusCircular}))`,
    borderBottomRightRadius: `var(--2425, var(--2426, ${tokens.borderRadiusCircular}))`,
  },

  medium: {
    fontSize: mediumIconSize,
    paddingLeft: '5px',
    paddingRight: '5px',
  },
  small: {
    fontSize: smallIconSize,
    paddingLeft: '3px',
    paddingRight: '3px',
  },
  'extra-small': {
    fontSize: extraSmallIconSize,
    paddingLeft: '5px',
    paddingRight: '5px',
  },
});
const useRootDisabledStyles = makeStyles({
  filled: {
    cursor: 'not-allowed',
    backgroundColor: `var(--2427, var(--2428, ${tokens.colorNeutralBackgroundDisabled}))`,
    color: `var(--2429, var(--2430, ${tokens.colorNeutralForegroundDisabled}))`,
    ...shorthands.borderColor(tokens.colorTransparentStrokeDisabled),
    borderLeftColor: `var(--2431, var(--2432, ${tokens.colorNeutralStrokeDisabled}))`, // divider
  },
  outline: {
    cursor: 'not-allowed',
    backgroundColor: `var(--2433, var(--2434, ${tokens.colorSubtleBackground}))`,
    color: `var(--2435, var(--2436, ${tokens.colorNeutralForegroundDisabled}))`,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
  },
  brand: {
    cursor: 'not-allowed',
    backgroundColor: `var(--2437, var(--2438, ${tokens.colorNeutralBackgroundDisabled}))`,
    color: `var(--2439, var(--2440, ${tokens.colorNeutralForegroundDisabled}))`,
    ...shorthands.borderColor(tokens.colorTransparentStrokeDisabled),
    borderLeftColor: `var(--2441, var(--2442, ${tokens.colorNeutralStrokeDisabled}))`, // divider
  },
});

export const useInteractionTagSecondaryStyles_unstable = (
  state: InteractionTagSecondaryState,
): InteractionTagSecondaryState => {
  'use no memo';

  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles();
  const rootDisabledStyles = useRootDisabledStyles();

  const { shape, size, appearance } = state;

  state.root.className = mergeClasses(
    interactionTagSecondaryClassNames.root,
    rootBaseClassName,
    state.disabled ? rootDisabledStyles[appearance] : rootStyles[appearance],
    rootStyles[shape],
    rootStyles[size],
    state.root.className,
  );

  return state;
};
