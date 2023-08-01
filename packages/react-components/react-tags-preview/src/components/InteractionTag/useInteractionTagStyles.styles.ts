import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { InteractionTagSlots, InteractionTagState } from './InteractionTag.types';
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

export const interactionTagClassNames: SlotClassNames<InteractionTagSlots> = {
  root: 'fui-InteractionTag',
  content: 'fui-InteractionTag__content',
  media: 'fui-InteractionTag__media',
  icon: 'fui-InteractionTag__icon',
  primaryText: 'fui-InteractionTag__primaryText',
  secondaryText: 'fui-InteractionTag__secondaryText',
  dismissButton: 'fui-InteractionTag__dismissButton',
};

const mediumIconSize = '20px';
const smallIconSize = '16px';
const extraSmallIconSize = '12px';

const useRootStyles = makeStyles({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: 'fit-content',
  },

  rounded: shorthands.borderRadius(tokens.borderRadiusMedium),
  circular: shorthands.borderRadius(tokens.borderRadiusCircular),

  medium: {
    height: '32px',
  },
  small: {
    height: '24px',
  },
  'extra-small': {
    height: '20px',
  },
});

const useContentButtonStyles = makeStyles({
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
const useContentButtonDisabledStyles = makeStyles({
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
 * Styles for content slot when InteractionTag is without leading media/icon
 */
const useContentButtonWithoutMediaStyles = makeStyles({
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
 * Styles for content slot when InteractionTag has dismiss button
 */
const useDismissibleContentButtonStyles = makeStyles({
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

const useDismissButtonStyles = makeStyles({
  base: {
    // reset default button style:
    color: 'inherit',
    fontFamily: 'inherit',
    ...shorthands.padding(0),
    ...shorthands.borderStyle('none'),
    appearance: 'button',
    textAlign: 'unset',
    backgroundColor: 'transparent',

    display: 'flex',
    height: '100%',
    alignItems: 'center',

    ...createCustomFocusIndicatorStyle(shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorStrokeFocus2)),

    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorTransparentStroke),

    // divider:
    borderLeftColor: tokens.colorNeutralStroke1,
    borderTopLeftRadius: tokens.borderRadiusNone,
    borderBottomLeftRadius: tokens.borderRadiusNone,
  },

  filled: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    ':hover': {
      cursor: 'pointer',
      backgroundColor: tokens.colorNeutralBackground3Hover,
      color: tokens.colorNeutralForeground2BrandHover,
    },
    ':hover:active': {
      backgroundColor: tokens.colorNeutralBackground3Pressed,
      color: tokens.colorNeutralForeground2BrandPressed,
    },
  },
  outline: {
    backgroundColor: tokens.colorSubtleBackground,
    color: tokens.colorNeutralForeground2,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    ':hover': {
      cursor: 'pointer',
      backgroundColor: tokens.colorSubtleBackgroundHover,
      color: tokens.colorNeutralForeground2BrandHover,
    },
    ':hover:active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      color: tokens.colorNeutralForeground2BrandPressed,
    },
  },
  brand: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    borderLeftColor: tokens.colorBrandStroke2, // divider
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

  rounded: {
    borderTopRightRadius: tokens.borderRadiusMedium,
    borderBottomRightRadius: tokens.borderRadiusMedium,
  },
  circular: {
    borderTopRightRadius: tokens.borderRadiusCircular,
    borderBottomRightRadius: tokens.borderRadiusCircular,
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
const useDismissButtonDisabledStyles = makeStyles({
  filled: {
    cursor: 'not-allowed',
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    color: tokens.colorNeutralForegroundDisabled,
    ...shorthands.borderColor(tokens.colorTransparentStrokeDisabled),
    borderLeftColor: tokens.colorNeutralStrokeDisabled, // divider
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
    borderLeftColor: tokens.colorNeutralStrokeDisabled, // divider
  },
});

/**
 * Apply styling to the InteractionTag slots based on the state
 */
export const useInteractionTagStyles_unstable = (state: InteractionTagState): InteractionTagState => {
  const rootStyles = useRootStyles();

  const contentButtonStyles = useContentButtonStyles();
  const contentButtonDisabledStyles = useContentButtonDisabledStyles();
  const contentButtonWithoutMediaStyles = useContentButtonWithoutMediaStyles();
  const dismissibleContentButtonStyles = useDismissibleContentButtonStyles();

  const dismissButtonStyles = useDismissButtonStyles();
  const dismissButtonDisabledStyles = useDismissButtonDisabledStyles();

  const iconStyles = useIconStyles();
  const mediaStyles = useMediaStyles();
  const primaryTextStyles = usePrimaryTextStyles();
  const secondaryTextStyles = useSecondaryTextStyles();

  const { shape, size, appearance } = state;

  state.root.className = mergeClasses(
    interactionTagClassNames.root,
    rootStyles.base,
    rootStyles[shape],
    rootStyles[size],
    state.root.className,
  );

  if (state.content) {
    state.content.className = mergeClasses(
      interactionTagClassNames.content,

      contentButtonStyles.base,
      state.disabled ? contentButtonDisabledStyles[appearance] : contentButtonStyles[appearance],
      contentButtonStyles[shape],
      contentButtonStyles[size],

      !state.media && !state.icon && contentButtonWithoutMediaStyles[size],
      state.dismissible && dismissibleContentButtonStyles.base,
      state.dismissible && dismissibleContentButtonStyles[size],

      state.content.className,
    );
  }

  if (state.media) {
    state.media.className = mergeClasses(
      interactionTagClassNames.media,
      mediaStyles.base,
      mediaStyles[size],
      state.media.className,
    );
  }
  if (state.icon) {
    state.icon.className = mergeClasses(
      interactionTagClassNames.icon,
      iconStyles.base,
      iconStyles[size],
      state.icon.className,
    );
  }
  if (state.primaryText) {
    state.primaryText.className = mergeClasses(
      interactionTagClassNames.primaryText,

      primaryTextStyles.base,
      primaryTextStyles[size],

      state.secondaryText ? primaryTextStyles.withSecondaryText : primaryTextStyles.withoutSecondaryText,

      state.primaryText.className,
    );
  }
  if (state.secondaryText) {
    state.secondaryText.className = mergeClasses(
      interactionTagClassNames.secondaryText,
      secondaryTextStyles.base,
      state.secondaryText.className,
    );
  }
  if (state.dismissButton) {
    state.dismissButton.className = mergeClasses(
      interactionTagClassNames.dismissButton,
      dismissButtonStyles.base,
      state.disabled ? dismissButtonDisabledStyles[appearance] : dismissButtonStyles[appearance],
      dismissButtonStyles[shape],
      dismissButtonStyles[size],
      state.dismissButton.className,
    );
  }

  return state;
};
