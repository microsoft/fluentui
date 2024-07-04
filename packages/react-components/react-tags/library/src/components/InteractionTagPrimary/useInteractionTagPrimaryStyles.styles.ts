import { GriffelResetStyle, makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { InteractionTagPrimarySlots, InteractionTagPrimaryState } from './InteractionTagPrimary.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import {
  useIconStyles,
  useMediaStyles,
  usePrimaryTextStyles,
  useSecondaryTextBaseClassName,
} from '../Tag/useTagStyles.styles';

export const interactionTagPrimaryClassNames: SlotClassNames<InteractionTagPrimarySlots> = {
  root: 'fui-InteractionTagPrimary',
  media: 'fui-InteractionTagPrimary__media',
  icon: 'fui-InteractionTagPrimary__icon',
  primaryText: 'fui-InteractionTagPrimary__primaryText',
  secondaryText: 'fui-InteractionTagPrimary__secondaryText',
};

const baseStyles: GriffelResetStyle = {
  // reset default button style:
  color: 'inherit',
  fontFamily: 'inherit',
  padding: '0px',
  borderStyle: 'none',
  appearance: 'button',
  textAlign: 'unset',
  backgroundColor: 'transparent',

  display: 'inline-grid',
  height: '100%',
  alignItems: 'center',
  gridTemplateAreas: `
  "media primary  "
  "media secondary"
  `,

  border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
  ...createCustomFocusIndicatorStyle({
    outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
    zIndex: 1,
  }),
};

const useRootRoundedBaseClassName = makeResetStyles({
  ...baseStyles,
  borderRadius: `var(--ctrl-token-InteractionTagPrimary-2293, var(--semantic-token-InteractionTagPrimary-2294, ${tokens.borderRadiusMedium}))`,

  /**
   * Pseudo element to draw the border for windows high contrast mode -
   * when Tag is with secondary text, primary text has negative margin that covers the border.
   */
  '@media (forced-colors: active)': {
    position: 'relative',
    '::before': {
      content: '""',
      borderTop: `${tokens.strokeWidthThin} solid`,
      position: 'absolute',
      top: '-1px',
      left: '-1px',
      right: '-1px',
      bottom: '-1px',
      borderTopLeftRadius: `var(--ctrl-token-InteractionTagPrimary-2295, var(--semantic-token-InteractionTagPrimary-2296, ${tokens.borderRadiusMedium}))`,
      borderTopRightRadius: `var(--ctrl-token-InteractionTagPrimary-2297, var(--semantic-token-InteractionTagPrimary-2298, ${tokens.borderRadiusMedium}))`,
    },
  },
});

const useRootCircularBaseClassName = makeResetStyles({
  ...baseStyles,
  borderRadius: `var(--ctrl-token-InteractionTagPrimary-2299, var(--semantic-token-InteractionTagPrimary-2300, ${tokens.borderRadiusCircular}))`,

  /**
   * Pseudo element to draw the border for windows high contrast mode -
   * when Tag is with secondary text, primary text has negative margin that covers the border.
   */
  '@media (forced-colors: active)': {
    position: 'relative',
    '::before': {
      content: '""',
      borderTop: `${tokens.strokeWidthThin} solid`,
      borderLeft: `${tokens.strokeWidthThin} solid`,
      position: 'absolute',
      top: '-1px',
      left: '-1px',
      right: '-1px',
      bottom: '-1px',
      borderTopLeftRadius: `var(--ctrl-token-InteractionTagPrimary-2301, var(--semantic-token-InteractionTagPrimary-2302, ${tokens.borderRadiusCircular}))`,
      borderBottomLeftRadius: `var(--ctrl-token-InteractionTagPrimary-2303, var(--semantic-token-InteractionTagPrimary-2304, ${tokens.borderRadiusCircular}))`,
    },
  },
});

/**
 * Style override for pseudo element that draws the border for windows high contrast mode
 */
const useRootCircularContrastStyles = makeStyles({
  withoutSecondaryAction: {
    '@media (forced-colors: active)': {
      position: 'relative',
      '::before': {
        borderRight: `${tokens.strokeWidthThin} solid transparent`,
        borderTopRightRadius: `var(--ctrl-token-InteractionTagPrimary-2305, var(--semantic-token-InteractionTagPrimary-2306, ${tokens.borderRadiusCircular}))`,
        borderBottomRightRadius: `var(--ctrl-token-InteractionTagPrimary-2307, var(--semantic-token-InteractionTagPrimary-2308, ${tokens.borderRadiusCircular}))`,
      },
    },
  },
});

const useRootStyles = makeStyles({
  filled: {
    backgroundColor: `var(--ctrl-token-InteractionTagPrimary-2309, var(--semantic-token-InteractionTagPrimary-2310, ${tokens.colorNeutralBackground3}))`,
    color: `var(--ctrl-token-InteractionTagPrimary-2311, var(--semantic-token-InteractionTagPrimary-2312, ${tokens.colorNeutralForeground2}))`,
    ':hover': {
      cursor: 'pointer',
      backgroundColor: `var(--ctrl-token-InteractionTagPrimary-2313, var(--semantic-token-InteractionTagPrimary-2314, ${tokens.colorNeutralBackground3Hover}))`,
      color: `var(--ctrl-token-InteractionTagPrimary-2315, var(--semantic-token-InteractionTagPrimary-2316, ${tokens.colorNeutralForeground2Hover}))`,
    },
    ':active': {
      backgroundColor: `var(--ctrl-token-InteractionTagPrimary-2317, var(--semantic-token-InteractionTagPrimary-2318, ${tokens.colorNeutralBackground3Pressed}))`,
      color: `var(--ctrl-token-InteractionTagPrimary-2319, var(--semantic-token-InteractionTagPrimary-2320, ${tokens.colorNeutralForeground2Pressed}))`,
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
    backgroundColor: `var(--ctrl-token-InteractionTagPrimary-2321, var(--semantic-token-InteractionTagPrimary-2322, ${tokens.colorSubtleBackground}))`,
    color: `var(--ctrl-token-InteractionTagPrimary-2323, var(--semantic-token-InteractionTagPrimary-2324, ${tokens.colorNeutralForeground2}))`,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    ':hover': {
      cursor: 'pointer',
      backgroundColor: `var(--ctrl-token-InteractionTagPrimary-2325, var(--semantic-token-InteractionTagPrimary-2326, ${tokens.colorSubtleBackgroundHover}))`,
      color: `var(--ctrl-token-InteractionTagPrimary-2327, var(--semantic-token-InteractionTagPrimary-2328, ${tokens.colorNeutralForeground2Hover}))`,

      [`& .${iconFilledClassName}`]: {
        display: 'inline',
        color: `var(--ctrl-token-InteractionTagPrimary-2329, var(--semantic-token-InteractionTagPrimary-2330, ${tokens.colorNeutralForeground2BrandHover}))`,
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },
    ':active': {
      backgroundColor: `var(--ctrl-token-InteractionTagPrimary-2331, var(--semantic-token-InteractionTagPrimary-2332, ${tokens.colorSubtleBackgroundPressed}))`,
      color: `var(--ctrl-token-InteractionTagPrimary-2333, var(--semantic-token-InteractionTagPrimary-2334, ${tokens.colorNeutralForeground2Pressed}))`,

      [`& .${iconFilledClassName}`]: {
        display: 'inline',
        color: `var(--ctrl-token-InteractionTagPrimary-2335, var(--semantic-token-InteractionTagPrimary-2336, ${tokens.colorNeutralForeground2BrandPressed}))`,
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
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
    backgroundColor: `var(--ctrl-token-InteractionTagPrimary-2337, var(--semantic-token-InteractionTagPrimary-2338, ${tokens.colorBrandBackground2}))`,
    color: `var(--ctrl-token-InteractionTagPrimary-2339, var(--semantic-token-InteractionTagPrimary-2340, ${tokens.colorBrandForeground2}))`,
    ':hover': {
      cursor: 'pointer',
      backgroundColor: `var(--ctrl-token-InteractionTagPrimary-2341, var(--semantic-token-InteractionTagPrimary-2342, ${tokens.colorBrandBackground2Hover}))`,
      color: `var(--ctrl-token-InteractionTagPrimary-2343, var(--semantic-token-InteractionTagPrimary-2344, ${tokens.colorCompoundBrandForeground1Hover}))`,
    },
    ':active': {
      backgroundColor: `var(--ctrl-token-InteractionTagPrimary-2345, var(--semantic-token-InteractionTagPrimary-2346, ${tokens.colorBrandBackground2Pressed}))`,
      color: `var(--ctrl-token-InteractionTagPrimary-2347, var(--semantic-token-InteractionTagPrimary-2348, ${tokens.colorCompoundBrandForeground1Pressed}))`,
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

  medium: {
    paddingRight: '7px',
  },
  small: {
    paddingRight: '5px',
  },
  'extra-small': {
    paddingRight: '5px',
  },
});
const useRootDisabledAppearances = makeStyles({
  filled: {
    cursor: 'not-allowed',
    backgroundColor: `var(--ctrl-token-InteractionTagPrimary-2349, var(--semantic-token-InteractionTagPrimary-2350, ${tokens.colorNeutralBackgroundDisabled}))`,
    color: `var(--ctrl-token-InteractionTagPrimary-2351, var(--semantic-token-InteractionTagPrimary-2352, ${tokens.colorNeutralForegroundDisabled}))`,
    ...shorthands.borderColor(tokens.colorTransparentStrokeDisabled),
  },
  outline: {
    cursor: 'not-allowed',
    backgroundColor: `var(--ctrl-token-InteractionTagPrimary-2353, var(--semantic-token-InteractionTagPrimary-2354, ${tokens.colorSubtleBackground}))`,
    color: `var(--ctrl-token-InteractionTagPrimary-2355, var(--semantic-token-InteractionTagPrimary-2356, ${tokens.colorNeutralForegroundDisabled}))`,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
  },
  brand: {
    cursor: 'not-allowed',
    backgroundColor: `var(--ctrl-token-InteractionTagPrimary-2357, var(--semantic-token-InteractionTagPrimary-2358, ${tokens.colorNeutralBackgroundDisabled}))`,
    color: `var(--ctrl-token-InteractionTagPrimary-2359, var(--semantic-token-InteractionTagPrimary-2360, ${tokens.colorNeutralForegroundDisabled}))`,
    ...shorthands.borderColor(tokens.colorTransparentStrokeDisabled),
  },
});

/**
 * Styles for InteractionTagPrimary without leading media/icon
 */
const useRootWithoutMediaStyles = makeStyles({
  medium: {
    paddingLeft: '7px',
  },
  small: {
    paddingLeft: '5px',
  },
  'extra-small': {
    paddingLeft: '5px',
  },
});
/**
 * Styles for InteractionTagPrimary when InteractionTag has a Secondary button
 */
const useRootWithSecondaryActionStyles = makeStyles({
  base: {
    borderTopRightRadius: `var(--ctrl-token-InteractionTagPrimary-2361, var(--semantic-token-InteractionTagPrimary-2362, ${tokens.borderRadiusNone}))`,
    borderBottomRightRadius: `var(--ctrl-token-InteractionTagPrimary-2363, var(--semantic-token-InteractionTagPrimary-2364, ${tokens.borderRadiusNone}))`,
    borderRightStyle: 'none',
    ...createCustomFocusIndicatorStyle({
      borderTopRightRadius: `var(--ctrl-token-InteractionTagPrimary-2365, var(--semantic-token-InteractionTagPrimary-2366, ${tokens.borderRadiusNone}))`,
      borderBottomRightRadius: `var(--ctrl-token-InteractionTagPrimary-2367, var(--semantic-token-InteractionTagPrimary-2368, ${tokens.borderRadiusNone}))`,
    }),
  },
  medium: {
    paddingRight: `var(--ctrl-token-InteractionTagPrimary-2369, var(--semantic-token-InteractionTagPrimary-2370, ${tokens.spacingHorizontalS}))`,
  },
  small: {
    paddingRight: `var(--ctrl-token-InteractionTagPrimary-2371, var(--semantic-token-InteractionTagPrimary-2372, ${tokens.spacingHorizontalSNudge}))`,
  },
  'extra-small': {
    paddingRight: `var(--ctrl-token-InteractionTagPrimary-2373, var(--semantic-token-InteractionTagPrimary-2374, ${tokens.spacingHorizontalSNudge}))`,
  },
});

export const useInteractionTagPrimaryStyles_unstable = (
  state: InteractionTagPrimaryState,
): InteractionTagPrimaryState => {
  'use no memo';

  const rootRoundedBaseClassName = useRootRoundedBaseClassName();
  const rootCircularBaseClassName = useRootCircularBaseClassName();
  const rootStyles = useRootStyles();
  const rootDisabledAppearances = useRootDisabledAppearances();
  const rootWithoutMediaStyles = useRootWithoutMediaStyles();
  const rootWithSecondaryActionStyles = useRootWithSecondaryActionStyles();

  const iconStyles = useIconStyles();
  const mediaStyles = useMediaStyles();
  const primaryTextStyles = usePrimaryTextStyles();
  const secondaryTextBaseClassName = useSecondaryTextBaseClassName();

  const rootCircularContrastStyles = useRootCircularContrastStyles();

  const { shape, size, appearance } = state;

  state.root.className = mergeClasses(
    interactionTagPrimaryClassNames.root,

    shape === 'rounded' ? rootRoundedBaseClassName : rootCircularBaseClassName,

    shape === 'circular' && !state.hasSecondaryAction && rootCircularContrastStyles.withoutSecondaryAction,

    state.disabled ? rootDisabledAppearances[appearance] : rootStyles[appearance],
    rootStyles[size],

    !state.media && !state.icon && rootWithoutMediaStyles[size],
    state.hasSecondaryAction && rootWithSecondaryActionStyles.base,
    state.hasSecondaryAction && rootWithSecondaryActionStyles[size],

    state.root.className,
  );

  if (state.media) {
    state.media.className = mergeClasses(
      interactionTagPrimaryClassNames.media,
      mediaStyles.base,
      mediaStyles[size],
      state.media.className,
    );
  }
  if (state.icon) {
    state.icon.className = mergeClasses(
      interactionTagPrimaryClassNames.icon,
      iconStyles.base,
      iconStyles[size],
      state.icon.className,
    );
  }
  if (state.primaryText) {
    state.primaryText.className = mergeClasses(
      interactionTagPrimaryClassNames.primaryText,

      primaryTextStyles.base,
      primaryTextStyles[size],

      state.secondaryText ? primaryTextStyles.withSecondaryText : primaryTextStyles.withoutSecondaryText,

      state.primaryText.className,
    );
  }
  if (state.secondaryText) {
    state.secondaryText.className = mergeClasses(
      interactionTagPrimaryClassNames.secondaryText,
      secondaryTextBaseClassName,
      state.secondaryText.className,
    );
  }

  return state;
};
