import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { PrimarySlots, PrimaryState } from './Primary.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import {
  useIconStyles,
  useMediaStyles,
  usePrimaryTextStyles,
  useSecondaryTextStyles,
} from '../Tag/useTagStyles.styles';

export const primaryClassNames: SlotClassNames<PrimarySlots> = {
  root: 'fui-Primary',
  media: 'fui-Primary__media',
  icon: 'fui-Primary__icon',
  primaryText: 'fui-Primary__primaryText',
  secondaryText: 'fui-Primary__secondaryText',
};

const useRootStyles = makeStyles({
  base: {
    // TODO use makeResetStyle when styles are settled

    // reset default button style:
    color: 'inherit',
    fontFamily: 'inherit',
    ...shorthands.padding(0),
    ...shorthands.borderStyle('none'),
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

    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorTransparentStroke),
    ...createCustomFocusIndicatorStyle({
      ...shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorStrokeFocus2),
      zIndex: 1,
    }),
  },

  filled: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    ':hover': {
      cursor: 'pointer',
      backgroundColor: tokens.colorNeutralBackground3Hover,
      color: tokens.colorNeutralForeground2Hover,
    },
    ':hover:active': {
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
    ':hover:active': {
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
    ':hover:active': {
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
 * Styles for Primary without leading media/icon
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
 * Styles for Primary when InteractionTag has a Secondary button
 */
const useRootWithSecondaryStyles = makeStyles({
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

export const usePrimaryStyles_unstable = (state: PrimaryState): PrimaryState => {
  const rootStyles = useRootStyles();
  const rootDisabledAppearances = useRootDisabledAppearances();
  const rootWithoutMediaStyles = useRootWithoutMediaStyles();
  const rootWithSecondaryStyles = useRootWithSecondaryStyles();

  const iconStyles = useIconStyles();
  const mediaStyles = useMediaStyles();
  const primaryTextStyles = usePrimaryTextStyles();
  const secondaryTextStyles = useSecondaryTextStyles();

  const { shape, size, appearance } = state;

  state.root.className = mergeClasses(
    primaryClassNames.root,

    rootStyles.base,
    state.disabled ? rootDisabledAppearances[appearance] : rootStyles[appearance],
    rootStyles[shape],
    rootStyles[size],

    !state.media && !state.icon && rootWithoutMediaStyles[size],
    state.hasSecondary && rootWithSecondaryStyles.base,
    state.hasSecondary && rootWithSecondaryStyles[size],

    state.root.className,
  );

  if (state.media) {
    state.media.className = mergeClasses(
      primaryClassNames.media,
      mediaStyles.base,
      mediaStyles[size],
      state.media.className,
    );
  }
  if (state.icon) {
    state.icon.className = mergeClasses(
      primaryClassNames.icon,
      iconStyles.base,
      iconStyles[size],
      state.icon.className,
    );
  }
  if (state.primaryText) {
    state.primaryText.className = mergeClasses(
      primaryClassNames.primaryText,

      primaryTextStyles.base,
      primaryTextStyles[size],

      state.secondaryText ? primaryTextStyles.withSecondaryText : primaryTextStyles.withoutSecondaryText,

      state.primaryText.className,
    );
  }
  if (state.secondaryText) {
    state.secondaryText.className = mergeClasses(
      primaryClassNames.secondaryText,
      secondaryTextStyles.base,
      state.secondaryText.className,
    );
  }

  return state;
};
