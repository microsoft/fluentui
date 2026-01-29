import { tokens } from '@fluentui/react-theme';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { mergeClasses, makeStyles } from '@griffel/react';
import { useSemanticButtonStyles } from './useSemanticButtonStyles.styles';
import { compoundButtonClassNames, type CompoundButtonState } from '@fluentui/react-button';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useRootStyles = makeStyles({
  // Base styles
  base: {
    height: 'auto',

    [`& .${compoundButtonClassNames.secondaryContent}`]: {
      color: semanticTokens.foregroundCtrlNeutralSecondaryRest,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.foregroundCtrlNeutralSecondaryHover,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.foregroundCtrlNeutralSecondaryPressed,
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
      color: semanticTokens.foregroundCtrlOnBrandRest,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.foregroundCtrlOnBrandHover,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.foregroundCtrlOnBrandPressed,
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
      color: semanticTokens.foregroundCtrlOnSubtleRest,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.foregroundCtrlOnSubtleHover,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.foregroundCtrlOnSubtlePressed,
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
      color: semanticTokens.foregroundCtrlOnTransparentRest,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.foregroundCtrlOnTransparentHover,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.foregroundCtrlOnTransparentPressed,
      },
    },
  },

  // Size variations
  small: {
    padding: `${tokens.spacingHorizontalS} ${tokens.spacingHorizontalS} ${tokens.spacingHorizontalMNudge} ${tokens.spacingHorizontalS}`,

    fontSize: semanticTokens.textRampItemBodyFontSize,
    lineHeight: semanticTokens.textRampItemBodyLineHeight,
  },
  medium: {
    padding: `14px ${tokens.spacingHorizontalM} ${tokens.spacingHorizontalL} ${tokens.spacingHorizontalM}`,

    fontSize: semanticTokens.textRampItemBodyFontSize,
    lineHeight: semanticTokens.textRampItemBodyLineHeight,
  },
  large: {
    padding: `18px ${tokens.spacingHorizontalL} ${tokens.spacingHorizontalXL} ${tokens.spacingHorizontalL}`,

    fontSize: semanticTokens.textRampLgItemBodyFontSize,
    lineHeight: semanticTokens.textRampLgItemBodyLineHeight,
  },

  // Disabled styles
  disabled: {
    [`& .${compoundButtonClassNames.secondaryContent}`]: {
      color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,
      },
    },
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

const useRootIconOnlyStyles = makeStyles({
  // Size variations
  small: {
    padding: tokens.spacingHorizontalXS,

    maxWidth: '48px',
    minWidth: '48px',
  },
  medium: {
    padding: tokens.spacingHorizontalSNudge,

    maxWidth: '52px',
    minWidth: '52px',
  },
  large: {
    padding: tokens.spacingHorizontalS,

    maxWidth: '56px',
    minWidth: '56px',
  },
});

const useIconStyles = makeStyles({
  // Base styles
  base: {
    fontSize: '40px',
    height: '40px',
    width: '40px',
  },

  // Icon position variations
  before: {
    marginRight: tokens.spacingHorizontalM,
  },
  after: {
    marginLeft: tokens.spacingHorizontalM,
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
    lineHeight: '100%',
    fontWeight: semanticTokens.textStyleDefaultRegularWeight,
  },

  // Size variations
  small: {
    fontSize: semanticTokens.textRampSmItemBodyFontSize,
  },
  medium: {
    fontSize: semanticTokens.textRampSmItemBodyFontSize,
  },
  large: {
    fontSize: semanticTokens.textRampItemBodyFontSize,
  },
});

export const useSemanticCompoundButtonStyles = (_state: unknown): CompoundButtonState => {
  'use no memo';

  const state = _state as CompoundButtonState;

  const rootStyles = useRootStyles();
  const rootIconOnlyStyles = useRootIconOnlyStyles();
  const iconStyles = useIconStyles();
  const contentContainerStyles = useContentContainerStyles();
  const secondaryContentStyles = useSecondaryContentStyles();

  const { appearance, disabled, disabledFocusable, iconOnly, iconPosition, size } = state;

  state.root.className = mergeClasses(
    state.root.className,
    compoundButtonClassNames.root,

    // Root styles
    rootStyles.base,
    rootStyles.highContrast,
    appearance && rootStyles[appearance],
    rootStyles[size],

    // Disabled styles
    (disabled || disabledFocusable) && rootStyles.disabled,
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
    state.icon.className = mergeClasses(
      state.icon.className,
      compoundButtonClassNames.icon,
      iconStyles.base,
      state.root.children !== undefined && state.root.children !== null && iconStyles[iconPosition],
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

  useSemanticButtonStyles(state);

  return state;
};
