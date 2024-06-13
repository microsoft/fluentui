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
  borderLeftColor: `var(--ctrl-token-InteractionTagSecondary-2375, var(--semantic-token-InteractionTagSecondary-2376, ${tokens.colorNeutralStroke1}))`,
  borderTopLeftRadius: `var(--ctrl-token-InteractionTagSecondary-2377, var(--semantic-token-InteractionTagSecondary-2378, ${tokens.borderRadiusNone}))`,
  borderBottomLeftRadius: `var(--ctrl-token-InteractionTagSecondary-2379, var(--semantic-token-InteractionTagSecondary-2380, ${tokens.borderRadiusNone}))`,
});

const useRootStyles = makeStyles({
  filled: {
    backgroundColor: `var(--ctrl-token-InteractionTagSecondary-2381, var(--semantic-token-InteractionTagSecondary-2382, ${tokens.colorNeutralBackground3}))`,
    color: `var(--ctrl-token-InteractionTagSecondary-2383, var(--semantic-token-InteractionTagSecondary-2384, ${tokens.colorNeutralForeground2}))`,
    ':hover': {
      cursor: 'pointer',
      backgroundColor: `var(--ctrl-token-InteractionTagSecondary-2385, var(--semantic-token-InteractionTagSecondary-2386, ${tokens.colorNeutralBackground3Hover}))`,
      color: `var(--ctrl-token-InteractionTagSecondary-2387, var(--semantic-token-InteractionTagSecondary-2388, ${tokens.colorNeutralForeground2BrandHover}))`,
    },
    ':active': {
      backgroundColor: `var(--ctrl-token-InteractionTagSecondary-2389, var(--semantic-token-InteractionTagSecondary-2390, ${tokens.colorNeutralBackground3Pressed}))`,
      color: `var(--ctrl-token-InteractionTagSecondary-2391, var(--semantic-token-InteractionTagSecondary-2392, ${tokens.colorNeutralForeground2BrandPressed}))`,
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
    backgroundColor: `var(--ctrl-token-InteractionTagSecondary-2393, var(--semantic-token-InteractionTagSecondary-2394, ${tokens.colorSubtleBackground}))`,
    color: `var(--ctrl-token-InteractionTagSecondary-2395, var(--semantic-token-InteractionTagSecondary-2396, ${tokens.colorNeutralForeground2}))`,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    ':hover': {
      cursor: 'pointer',
      backgroundColor: `var(--ctrl-token-InteractionTagSecondary-2397, var(--semantic-token-InteractionTagSecondary-2398, ${tokens.colorSubtleBackgroundHover}))`,
      color: `var(--ctrl-token-InteractionTagSecondary-2399, var(--semantic-token-InteractionTagSecondary-2400, ${tokens.colorNeutralForeground2BrandHover}))`,
    },
    ':active': {
      backgroundColor: `var(--ctrl-token-InteractionTagSecondary-2401, var(--semantic-token-InteractionTagSecondary-2402, ${tokens.colorSubtleBackgroundPressed}))`,
      color: `var(--ctrl-token-InteractionTagSecondary-2403, var(--semantic-token-InteractionTagSecondary-2404, ${tokens.colorNeutralForeground2BrandPressed}))`,
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
    backgroundColor: `var(--ctrl-token-InteractionTagSecondary-2405, var(--semantic-token-InteractionTagSecondary-2406, ${tokens.colorBrandBackground2}))`,
    color: `var(--ctrl-token-InteractionTagSecondary-2407, var(--semantic-token-InteractionTagSecondary-2408, ${tokens.colorBrandForeground2}))`,
    borderLeftColor: `var(--ctrl-token-InteractionTagSecondary-2409, var(--semantic-token-InteractionTagSecondary-2410, ${tokens.colorBrandStroke2}))`, // divider
    ':hover': {
      cursor: 'pointer',
      backgroundColor: `var(--ctrl-token-InteractionTagSecondary-2411, var(--semantic-token-InteractionTagSecondary-2412, ${tokens.colorBrandBackground2Hover}))`,
      color: `var(--ctrl-token-InteractionTagSecondary-2413, var(--semantic-token-InteractionTagSecondary-2414, ${tokens.colorCompoundBrandForeground1Hover}))`,
    },
    ':active': {
      backgroundColor: `var(--ctrl-token-InteractionTagSecondary-2415, var(--semantic-token-InteractionTagSecondary-2416, ${tokens.colorBrandBackground2Pressed}))`,
      color: `var(--ctrl-token-InteractionTagSecondary-2417, var(--semantic-token-InteractionTagSecondary-2418, ${tokens.colorCompoundBrandForeground1Pressed}))`,
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
    borderTopRightRadius: `var(--ctrl-token-InteractionTagSecondary-2419, var(--semantic-token-InteractionTagSecondary-2420, ${tokens.borderRadiusMedium}))`,
    borderBottomRightRadius: `var(--ctrl-token-InteractionTagSecondary-2421, var(--semantic-token-InteractionTagSecondary-2422, ${tokens.borderRadiusMedium}))`,
  },
  circular: {
    borderTopRightRadius: `var(--ctrl-token-InteractionTagSecondary-2423, var(--semantic-token-InteractionTagSecondary-2424, ${tokens.borderRadiusCircular}))`,
    borderBottomRightRadius: `var(--ctrl-token-InteractionTagSecondary-2425, var(--semantic-token-InteractionTagSecondary-2426, ${tokens.borderRadiusCircular}))`,
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
    backgroundColor: `var(--ctrl-token-InteractionTagSecondary-2427, var(--semantic-token-InteractionTagSecondary-2428, ${tokens.colorNeutralBackgroundDisabled}))`,
    color: `var(--ctrl-token-InteractionTagSecondary-2429, var(--semantic-token-InteractionTagSecondary-2430, ${tokens.colorNeutralForegroundDisabled}))`,
    ...shorthands.borderColor(tokens.colorTransparentStrokeDisabled),
    borderLeftColor: `var(--ctrl-token-InteractionTagSecondary-2431, var(--semantic-token-InteractionTagSecondary-2432, ${tokens.colorNeutralStrokeDisabled}))`, // divider
  },
  outline: {
    cursor: 'not-allowed',
    backgroundColor: `var(--ctrl-token-InteractionTagSecondary-2433, var(--semantic-token-InteractionTagSecondary-2434, ${tokens.colorSubtleBackground}))`,
    color: `var(--ctrl-token-InteractionTagSecondary-2435, var(--semantic-token-InteractionTagSecondary-2436, ${tokens.colorNeutralForegroundDisabled}))`,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
  },
  brand: {
    cursor: 'not-allowed',
    backgroundColor: `var(--ctrl-token-InteractionTagSecondary-2437, var(--semantic-token-InteractionTagSecondary-2438, ${tokens.colorNeutralBackgroundDisabled}))`,
    color: `var(--ctrl-token-InteractionTagSecondary-2439, var(--semantic-token-InteractionTagSecondary-2440, ${tokens.colorNeutralForegroundDisabled}))`,
    ...shorthands.borderColor(tokens.colorTransparentStrokeDisabled),
    borderLeftColor: `var(--ctrl-token-InteractionTagSecondary-2441, var(--semantic-token-InteractionTagSecondary-2442, ${tokens.colorNeutralStrokeDisabled}))`, // divider
  },
});

export const useInteractionTagSecondaryStyles_unstable = (
  state: InteractionTagSecondaryState,
): InteractionTagSecondaryState => {
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
