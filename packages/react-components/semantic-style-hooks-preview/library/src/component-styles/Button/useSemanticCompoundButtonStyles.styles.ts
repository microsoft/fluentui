import * as semanticTokens from '@fluentui/semantic-tokens';
import { mergeClasses, makeStyles } from '@griffel/react';
import { useSemanticButtonStyles } from './useSemanticButtonStyles.styles';
import { compoundButtonClassNames, type CompoundButtonState } from '@fluentui/react-button';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const iconSpacingVar = '--fui-Button__icon--spacing';
const useRootStyles = makeStyles({
  // Base styles
  base: {
    height: 'auto',

    [`& .${compoundButtonClassNames.secondaryContent}`]: {
      color: semanticTokens.groupButtonNeutralTextSecondaryForeground,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.groupButtonNeutralTextSecondaryForegroundHover,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.groupButtonNeutralTextSecondaryForegroundPressed,
      },
    },
  },

  // High contrast styles
  highContrast: {
    '@media (forced-colors: active)': {
      ':hover': {
        [`& .${compoundButtonClassNames.secondaryContent}`]: {
          color: 'Highlight',
        },
      },

      ':hover:active': {
        [`& .${compoundButtonClassNames.secondaryContent}`]: {
          color: 'Highlight',
        },
      },
    },
  },

  // Appearance variations
  outline: {
    /* No styles */
  },
  primary: {
    [`& .${compoundButtonClassNames.secondaryContent}`]: {
      color: semanticTokens.groupButtonPrimaryTextSecondaryForeground,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.groupButtonPrimaryTextSecondaryForegroundHover,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.groupButtonPrimaryTextSecondaryForegroundPressed,
      },
    },

    '@media (forced-colors: active)': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: 'HighlightText',
      },
    },
  },
  secondary: {
    /* The secondary styles are exactly the same as the base styles. */
  },
  subtle: {
    [`& .${compoundButtonClassNames.secondaryContent}`]: {
      color: semanticTokens.groupButtonSubtleTextSecondaryForeground,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.groupButtonSubtleTextSecondaryForegroundHover,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.groupButtonSubtleTextSecondaryForegroundPressed,
      },
    },

    '@media (forced-colors: active)': {
      ':hover': {
        [`& .${compoundButtonClassNames.secondaryContent}`]: {
          color: 'Canvas',
        },
      },
      ':hover:active': {
        [`& .${compoundButtonClassNames.secondaryContent}`]: {
          color: 'Canvas',
        },
      },
    },
  },
  transparent: {
    [`& .${compoundButtonClassNames.secondaryContent}`]: {
      color: semanticTokens.groupButtonTransparentTextSecondaryForeground,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.groupButtonTransparentTextSecondaryForegroundHover,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.groupButtonTransparentTextSecondaryForegroundPressed,
      },
    },
  },

  // Size variations
  small: {
    padding: `${semanticTokens.ctrlCompoundbuttonSmallPaddingTop}
    ${semanticTokens.ctrlCompoundbuttonSmallPaddingHorizontal}
    ${semanticTokens.ctrlCompoundbuttonSmallPaddingBottom}
    ${semanticTokens.ctrlCompoundbuttonSmallPaddingHorizontal}`,

    // Small compound button uses medium text styles
    fontSize: semanticTokens.groupButtonMediumTextFontsize,
    lineHeight: semanticTokens.groupButtonMediumTextLineheight,
  },
  medium: {
    padding: `${semanticTokens.ctrlCompoundbuttonMediumPaddingTop}
    ${semanticTokens.ctrlCompoundbuttonMediumPaddingHorizontal}
    ${semanticTokens.ctrlCompoundbuttonMediumPaddingBottom}
    ${semanticTokens.ctrlCompoundbuttonMediumPaddingHorizontal}`,

    fontSize: semanticTokens.groupButtonMediumTextFontsize,
    lineHeight: semanticTokens.groupButtonMediumTextLineheight,
  },
  large: {
    padding: `${semanticTokens.ctrlCompoundbuttonLargePaddingTop}
    ${semanticTokens.ctrlCompoundbuttonLargePaddingHorizontal}
    ${semanticTokens.ctrlCompoundbuttonLargePaddingBottom}
    ${semanticTokens.ctrlCompoundbuttonLargePaddingHorizontal}`,

    fontSize: semanticTokens.groupButtonLargeTextFontsize,
    lineHeight: semanticTokens.groupButtonLargeTextLineheight,
  },

  // Disabled high contrast styles
  disabledHighContrast: {
    '@media (forced-colors: active)': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: 'GrayText',
      },

      ':hover': {
        [`& .${compoundButtonClassNames.secondaryContent}`]: {
          color: 'GrayText',
        },
      },

      ':hover:active': {
        [`& .${compoundButtonClassNames.secondaryContent}`]: {
          color: 'GrayText',
        },
      },
    },
  },
});

const useDisabledStyles = makeStyles({
  base: {
    [`& .${compoundButtonClassNames.secondaryContent}`]: {
      color: semanticTokens.groupButtonNeutralTextSecondaryForegroundDisabled,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.groupButtonNeutralTextSecondaryForegroundDisabled,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.groupButtonNeutralTextSecondaryForegroundDisabled,
      },
    },
  },
  secondary: {
    // Covered in base
  },
  outline: {
    [`& .${compoundButtonClassNames.secondaryContent}`]: {
      color: semanticTokens.groupButtonOutlineTextSecondaryForegroundDisabled,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.groupButtonOutlineTextSecondaryForegroundDisabled,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.groupButtonOutlineTextSecondaryForegroundDisabled,
      },
    },
  },
  transparent: {
    [`& .${compoundButtonClassNames.secondaryContent}`]: {
      color: semanticTokens.groupButtonTransparentTextSecondaryForegroundDisabled,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.groupButtonTransparentTextSecondaryForegroundDisabled,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.groupButtonTransparentTextSecondaryForegroundDisabled,
      },
    },
  },
  primary: {
    [`& .${compoundButtonClassNames.secondaryContent}`]: {
      color: semanticTokens.groupButtonPrimaryTextSecondaryForegroundDisabled,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.groupButtonPrimaryTextSecondaryForegroundDisabled,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.groupButtonPrimaryTextSecondaryForegroundDisabled,
      },
    },
  },
  subtle: {
    [`& .${compoundButtonClassNames.secondaryContent}`]: {
      color: semanticTokens.groupButtonSubtleTextSecondaryForegroundDisabled,
    },
    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.groupButtonSubtleTextSecondaryForegroundDisabled,
      },
    },
    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.groupButtonSubtleTextSecondaryForegroundDisabled,
      },
    },
  },
});

const useRootIconOnlyStyles = makeStyles({
  // Size variations
  small: {
    padding: semanticTokens.ctrlCompoundbuttonSmallIcononlyPadding,

    maxWidth: 'unset',
    minWidth: '48px',
  },
  medium: {
    padding: semanticTokens.ctrlCompoundbuttonMediumIcononlyPadding,

    maxWidth: 'unset',
    minWidth: '52px',
  },
  large: {
    padding: semanticTokens.ctrlCompoundbuttonLargeIcononlyPadding,

    maxWidth: 'unset',
    minWidth: '56px',
  },
});

const useIconStyles = makeStyles({
  // Base styles
  base: {
    fontSize: semanticTokens.ctrlCompoundbuttonIconSize,
    height: semanticTokens.ctrlCompoundbuttonIconSize,
    width: semanticTokens.ctrlCompoundbuttonIconSize,
    [iconSpacingVar]: semanticTokens.ctrlCompoundbuttonGap,
  },
});

const useContentContainerStyles = makeStyles({
  // Base styles
  base: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
});

const useSecondaryContentStyles = makeStyles({
  // Base styles
  base: {
    fontSize: semanticTokens.groupButtonMediumTextSecondaryFontsize,
    lineHeight: semanticTokens.groupButtonMediumTextSecondaryLineheight,
    fontWeight: semanticTokens.groupButtonMediumTextSecondaryFontweight,
  },

  // Size variations
  small: {
    fontSize: semanticTokens.groupButtonSmallTextSecondaryFontsize,
    lineHeight: semanticTokens.groupButtonSmallTextSecondaryLineheight,
    fontWeight: semanticTokens.groupButtonSmallTextSecondaryFontweight,
  },
  medium: {
    // Covered by base
  },
  large: {
    fontSize: semanticTokens.groupButtonLargeTextSecondaryFontsize,
    lineHeight: semanticTokens.groupButtonLargeTextSecondaryLineheight,
    fontWeight: semanticTokens.groupButtonLargeTextSecondaryFontweight,
  },
});

export const useSemanticCompoundButtonStyles = (_state: unknown): CompoundButtonState => {
  'use no memo';

  const state = _state as CompoundButtonState;

  const rootStyles = useRootStyles();
  const disabledStyles = useDisabledStyles();
  const rootIconOnlyStyles = useRootIconOnlyStyles();
  const iconStyles = useIconStyles();
  const contentContainerStyles = useContentContainerStyles();
  const secondaryContentStyles = useSecondaryContentStyles();

  const { appearance, disabled, disabledFocusable, iconOnly, iconPosition, size } = state;

  useSemanticButtonStyles(state);

  state.root.className = mergeClasses(
    state.root.className,
    compoundButtonClassNames.root,

    // Root styles
    rootStyles.base,
    rootStyles.highContrast,
    appearance && rootStyles[appearance],
    rootStyles[size],

    // Disabled styles
    (disabled || disabledFocusable) && disabledStyles.base,
    (disabled || disabledFocusable) && disabledStyles[appearance],
    (disabled || disabledFocusable) && rootStyles.disabledHighContrast,

    // Icon-only styles
    iconOnly && rootIconOnlyStyles[size],

    getSlotClassNameProp_unstable(state.root),
  );

  state.contentContainer.className = mergeClasses(
    state.contentContainer.className,
    compoundButtonClassNames.contentContainer,
    contentContainerStyles.base,
    getSlotClassNameProp_unstable(state.contentContainer),
  );

  if (state.icon) {
    console.log('iconPosition', iconPosition);
    state.icon.className = mergeClasses(
      state.icon.className,
      compoundButtonClassNames.icon,
      iconStyles.base,
      getSlotClassNameProp_unstable(state.icon),
    );
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      state.secondaryContent.className,
      compoundButtonClassNames.secondaryContent,
      secondaryContentStyles.base,
      secondaryContentStyles[size],
      getSlotClassNameProp_unstable(state.secondaryContent),
    );
  }

  return state;
};
