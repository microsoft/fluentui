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
  borderRadius: `var(--2293, var(--2294, ${tokens.borderRadiusMedium}))`,

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
      borderTopLeftRadius: `var(--2295, var(--2296, ${tokens.borderRadiusMedium}))`,
      borderTopRightRadius: `var(--2297, var(--2298, ${tokens.borderRadiusMedium}))`,
    },
  },
});

const useRootCircularBaseClassName = makeResetStyles({
  ...baseStyles,
  borderRadius: `var(--2299, var(--2300, ${tokens.borderRadiusCircular}))`,

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
      borderTopLeftRadius: `var(--2301, var(--2302, ${tokens.borderRadiusCircular}))`,
      borderBottomLeftRadius: `var(--2303, var(--2304, ${tokens.borderRadiusCircular}))`,
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
        borderTopRightRadius: `var(--2305, var(--2306, ${tokens.borderRadiusCircular}))`,
        borderBottomRightRadius: `var(--2307, var(--2308, ${tokens.borderRadiusCircular}))`,
      },
    },
  },
});

const useRootStyles = makeStyles({
  filled: {
    backgroundColor: `var(--2309, var(--2310, ${tokens.colorNeutralBackground3}))`,
    color: `var(--2311, var(--2312, ${tokens.colorNeutralForeground2}))`,
    ':hover': {
      cursor: 'pointer',
      backgroundColor: `var(--2313, var(--2314, ${tokens.colorNeutralBackground3Hover}))`,
      color: `var(--2315, var(--2316, ${tokens.colorNeutralForeground2Hover}))`,
    },
    ':active': {
      backgroundColor: `var(--2317, var(--2318, ${tokens.colorNeutralBackground3Pressed}))`,
      color: `var(--2319, var(--2320, ${tokens.colorNeutralForeground2Pressed}))`,
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
    backgroundColor: `var(--2321, var(--2322, ${tokens.colorSubtleBackground}))`,
    color: `var(--2323, var(--2324, ${tokens.colorNeutralForeground2}))`,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    ':hover': {
      cursor: 'pointer',
      backgroundColor: `var(--2325, var(--2326, ${tokens.colorSubtleBackgroundHover}))`,
      color: `var(--2327, var(--2328, ${tokens.colorNeutralForeground2Hover}))`,

      [`& .${iconFilledClassName}`]: {
        display: 'inline',
        color: `var(--2329, var(--2330, ${tokens.colorNeutralForeground2BrandHover}))`,
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },
    ':active': {
      backgroundColor: `var(--2331, var(--2332, ${tokens.colorSubtleBackgroundPressed}))`,
      color: `var(--2333, var(--2334, ${tokens.colorNeutralForeground2Pressed}))`,

      [`& .${iconFilledClassName}`]: {
        display: 'inline',
        color: `var(--2335, var(--2336, ${tokens.colorNeutralForeground2BrandPressed}))`,
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
    backgroundColor: `var(--2337, var(--2338, ${tokens.colorBrandBackground2}))`,
    color: `var(--2339, var(--2340, ${tokens.colorBrandForeground2}))`,
    ':hover': {
      cursor: 'pointer',
      backgroundColor: `var(--2341, var(--2342, ${tokens.colorBrandBackground2Hover}))`,
      color: `var(--2343, var(--2344, ${tokens.colorCompoundBrandForeground1Hover}))`,
    },
    ':active': {
      backgroundColor: `var(--2345, var(--2346, ${tokens.colorBrandBackground2Pressed}))`,
      color: `var(--2347, var(--2348, ${tokens.colorCompoundBrandForeground1Pressed}))`,
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
    backgroundColor: `var(--2349, var(--2350, ${tokens.colorNeutralBackgroundDisabled}))`,
    color: `var(--2351, var(--2352, ${tokens.colorNeutralForegroundDisabled}))`,
    ...shorthands.borderColor(tokens.colorTransparentStrokeDisabled),
  },
  outline: {
    cursor: 'not-allowed',
    backgroundColor: `var(--2353, var(--2354, ${tokens.colorSubtleBackground}))`,
    color: `var(--2355, var(--2356, ${tokens.colorNeutralForegroundDisabled}))`,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
  },
  brand: {
    cursor: 'not-allowed',
    backgroundColor: `var(--2357, var(--2358, ${tokens.colorNeutralBackgroundDisabled}))`,
    color: `var(--2359, var(--2360, ${tokens.colorNeutralForegroundDisabled}))`,
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
    borderTopRightRadius: `var(--2361, var(--2362, ${tokens.borderRadiusNone}))`,
    borderBottomRightRadius: `var(--2363, var(--2364, ${tokens.borderRadiusNone}))`,
    borderRightStyle: 'none',
    ...createCustomFocusIndicatorStyle({
      borderTopRightRadius: `var(--2365, var(--2366, ${tokens.borderRadiusNone}))`,
      borderBottomRightRadius: `var(--2367, var(--2368, ${tokens.borderRadiusNone}))`,
    }),
  },
  medium: {
    paddingRight: `var(--2369, var(--2370, ${tokens.spacingHorizontalS}))`,
  },
  small: {
    paddingRight: `var(--2371, var(--2372, ${tokens.spacingHorizontalSNudge}))`,
  },
  'extra-small': {
    paddingRight: `var(--2373, var(--2374, ${tokens.spacingHorizontalSNudge}))`,
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
