import { tokens } from '@fluentui/react-theme';
import { shorthands, mergeClasses, makeStyles } from '@griffel/react';
import { useButtonStyles_unstable } from '../Button/useButtonStyles';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CompoundButtonSlots, CompoundButtonState } from './CompoundButton.types';

export const compoundButtonClassNames: SlotClassNames<CompoundButtonSlots> = {
  root: 'fui-CompoundButton',
  icon: 'fui-CompoundButton__icon',
  contentContainer: 'fui-CompoundButton__contentContainer',
  secondaryContent: 'fui-CompoundButton__secondaryContent',
};

/**
 * @deprecated Use `compoundButtonClassName.root` instead.
 */
export const compoundButtonClassName = compoundButtonClassNames.root;

const useRootStyles = makeStyles({
  // Base styles
  base: {
    height: 'auto',
    maxWidth: 'unset',

    [`& .${compoundButtonClassNames.secondaryContent}`]: {
      color: tokens.colorNeutralForeground2,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForeground2Hover,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForeground2Pressed,
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
      color: tokens.colorNeutralForegroundOnBrand,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForegroundOnBrand,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForegroundOnBrand,
      },
    },
  },
  secondary: {
    /* The secondary styles are exactly the same as the base styles. */
  },
  subtle: {
    [`& .${compoundButtonClassNames.secondaryContent}`]: {
      color: tokens.colorNeutralForeground2,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForeground2BrandHover,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForeground2BrandPressed,
      },
    },
  },
  transparent: {
    [`& .${compoundButtonClassNames.secondaryContent}`]: {
      color: tokens.colorNeutralForeground2,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForeground2BrandHover,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForeground2BrandPressed,
      },
    },
  },

  // Size variations
  small: {
    ...shorthands.padding(
      tokens.spacingHorizontalS,
      tokens.spacingHorizontalS,
      tokens.spacingHorizontalMNudge,
      tokens.spacingHorizontalS,
    ),

    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  medium: {
    ...shorthands.padding('14px', tokens.spacingHorizontalM, tokens.spacingHorizontalL, tokens.spacingHorizontalM),

    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  large: {
    ...shorthands.padding('18px', tokens.spacingHorizontalL, tokens.spacingHorizontalXL, tokens.spacingHorizontalL),

    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },

  // Disabled styles
  disabled: {
    [`& .${compoundButtonClassNames.secondaryContent}`]: {
      color: tokens.colorNeutralForegroundDisabled,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForegroundDisabled,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForegroundDisabled,
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
    ...shorthands.padding(tokens.spacingHorizontalXS),

    maxWidth: '48px',
    minWidth: '48px',
  },
  medium: {
    ...shorthands.padding(tokens.spacingHorizontalSNudge),

    maxWidth: '52px',
    minWidth: '52px',
  },
  large: {
    ...shorthands.padding(tokens.spacingHorizontalS),

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
    fontWeight: tokens.fontWeightRegular,
  },

  // Size variations
  small: {
    fontSize: tokens.fontSizeBase200,
  },
  medium: {
    fontSize: tokens.fontSizeBase200,
  },
  large: {
    fontSize: tokens.fontSizeBase300,
  },
});

export const useCompoundButtonStyles_unstable = (state: CompoundButtonState): CompoundButtonState => {
  const rootStyles = useRootStyles();
  const rootIconOnlyStyles = useRootIconOnlyStyles();
  const iconStyles = useIconStyles();
  const contentContainerStyles = useContentContainerStyles();
  const secondaryContentStyles = useSecondaryContentStyles();

  const { appearance, disabled, disabledFocusable, iconOnly, iconPosition, size } = state;

  state.root.className = mergeClasses(
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

    // User provided class name
    state.root.className,
  );

  state.contentContainer.className = mergeClasses(
    compoundButtonClassNames.contentContainer,
    contentContainerStyles.base,
    state.contentContainer.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      compoundButtonClassNames.icon,
      iconStyles.base,
      state.root.children !== undefined && state.root.children !== null && iconStyles[iconPosition],
      state.icon.className,
    );
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      compoundButtonClassNames.secondaryContent,
      secondaryContentStyles.base,
      secondaryContentStyles[size],
      state.secondaryContent.className,
    );
  }

  useButtonStyles_unstable(state);

  return state;
};
