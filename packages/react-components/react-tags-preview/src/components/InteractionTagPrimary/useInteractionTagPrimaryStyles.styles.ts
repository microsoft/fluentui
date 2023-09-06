import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
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
  useTagWithSecondaryTextContrastStyles,
} from '../Tag/useTagStyles.styles';

export const interactionTagPrimaryClassNames: SlotClassNames<InteractionTagPrimarySlots> = {
  root: 'fui-InteractionTagPrimary',
  media: 'fui-InteractionTagPrimary__media',
  icon: 'fui-InteractionTagPrimary__icon',
  primaryText: 'fui-InteractionTagPrimary__primaryText',
  secondaryText: 'fui-InteractionTagPrimary__secondaryText',
};

const useRootBaseClassName = makeResetStyles({
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
    ...shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorStrokeFocus2),
    zIndex: 1,
  }),

  // windows high contrast:
  '@media (forced-colors: active)': {
    ':hover': {
      backgroundColor: 'HighlightText',
    },
    ':active': {
      backgroundColor: 'HighlightText',
    },
  },
});

const useRootStyles = makeStyles({
  filled: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    ':hover': {
      cursor: 'pointer',
      backgroundColor: tokens.colorNeutralBackground3Hover,
      color: tokens.colorNeutralForeground2Hover,
    },
    ':active': {
      backgroundColor: tokens.colorNeutralBackground3Pressed,
      color: tokens.colorNeutralForeground2Pressed,
    },
  },
  outline: {
    backgroundColor: tokens.colorSubtleBackground,
    color: tokens.colorNeutralForeground2,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    ':hover': {
      cursor: 'pointer',
      backgroundColor: tokens.colorSubtleBackgroundHover,
      color: tokens.colorNeutralForeground2Hover,

      [`& .${iconFilledClassName}`]: {
        display: 'inline',
        color: tokens.colorNeutralForeground2BrandHover,
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },
    ':active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      color: tokens.colorNeutralForeground2Pressed,

      [`& .${iconFilledClassName}`]: {
        display: 'inline',
        color: tokens.colorNeutralForeground2BrandPressed,
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },
  },
  brand: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    ':hover': {
      cursor: 'pointer',
      backgroundColor: tokens.colorBrandBackground2Hover,
      color: tokens.colorCompoundBrandForeground1Hover,
    },
    ':active': {
      backgroundColor: tokens.colorBrandBackground2Pressed,
      color: tokens.colorCompoundBrandForeground1Pressed,
    },
  },

  rounded: shorthands.borderRadius(tokens.borderRadiusMedium),
  circular: shorthands.borderRadius(tokens.borderRadiusCircular),

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
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    color: tokens.colorNeutralForegroundDisabled,
    ...shorthands.borderColor(tokens.colorTransparentStrokeDisabled),
  },
  outline: {
    cursor: 'not-allowed',
    backgroundColor: tokens.colorSubtleBackground,
    color: tokens.colorNeutralForegroundDisabled,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
  },
  brand: {
    cursor: 'not-allowed',
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    color: tokens.colorNeutralForegroundDisabled,
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
    borderTopRightRadius: tokens.borderRadiusNone,
    borderBottomRightRadius: tokens.borderRadiusNone,
    borderRightStyle: 'none',
    ...createCustomFocusIndicatorStyle({
      borderTopRightRadius: tokens.borderRadiusNone,
      borderBottomRightRadius: tokens.borderRadiusNone,
    }),
  },
  medium: {
    paddingRight: tokens.spacingHorizontalS,
  },
  small: {
    paddingRight: tokens.spacingHorizontalSNudge,
  },
  'extra-small': {
    paddingRight: tokens.spacingHorizontalSNudge,
  },
});

export const useInteractionTagPrimaryStyles_unstable = (
  state: InteractionTagPrimaryState,
): InteractionTagPrimaryState => {
  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles();
  const rootDisabledAppearances = useRootDisabledAppearances();
  const rootWithoutMediaStyles = useRootWithoutMediaStyles();
  const rootWithSecondaryActionStyles = useRootWithSecondaryActionStyles();

  const iconStyles = useIconStyles();
  const mediaStyles = useMediaStyles();
  const primaryTextStyles = usePrimaryTextStyles();
  const secondaryTextBaseClassName = useSecondaryTextBaseClassName();

  const tagWithSecondaryTextContrastStyles = useTagWithSecondaryTextContrastStyles();

  const { shape, size, appearance } = state;

  state.root.className = mergeClasses(
    interactionTagPrimaryClassNames.root,

    rootBaseClassName,
    state.disabled ? rootDisabledAppearances[appearance] : rootStyles[appearance],
    rootStyles[shape],
    rootStyles[size],

    !state.media && !state.icon && rootWithoutMediaStyles[size],
    state.hasSecondaryAction && rootWithSecondaryActionStyles.base,
    state.hasSecondaryAction && rootWithSecondaryActionStyles[size],

    state.secondaryText && tagWithSecondaryTextContrastStyles[shape],

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
