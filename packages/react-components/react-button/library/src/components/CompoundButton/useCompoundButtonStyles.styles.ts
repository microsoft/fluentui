import { tokens } from '@fluentui/react-theme';
import { mergeClasses, makeStyles } from '@griffel/react';
import { useButtonStyles_unstable } from '../Button/useButtonStyles.styles';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CompoundButtonSlots, CompoundButtonState } from './CompoundButton.types';

export const compoundButtonClassNames: SlotClassNames<CompoundButtonSlots> = {
  root: 'fui-CompoundButton',
  icon: 'fui-CompoundButton__icon',
  contentContainer: 'fui-CompoundButton__contentContainer',
  secondaryContent: 'fui-CompoundButton__secondaryContent',
};

const useRootStyles = makeStyles({
  // Base styles
  base: {
    height: 'auto',

    [`& .${compoundButtonClassNames.secondaryContent}`]: {
      color: `var(--ctrl-token-CompoundButton-1, var(--semantic-token-CompoundButton-2, ${tokens.colorNeutralForeground2}))`,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: `var(--ctrl-token-CompoundButton-3, var(--semantic-token-CompoundButton-4, ${tokens.colorNeutralForeground2Hover}))`,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: `var(--ctrl-token-CompoundButton-5, var(--semantic-token-CompoundButton-6, ${tokens.colorNeutralForeground2Pressed}))`,
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
      color: `var(--ctrl-token-CompoundButton-7, var(--semantic-token-CompoundButton-8, ${tokens.colorNeutralForegroundOnBrand}))`,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: `var(--ctrl-token-CompoundButton-9, var(--semantic-token-CompoundButton-10, ${tokens.colorNeutralForegroundOnBrand}))`,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: `var(--ctrl-token-CompoundButton-11, var(--semantic-token-CompoundButton-12, ${tokens.colorNeutralForegroundOnBrand}))`,
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
      color: `var(--ctrl-token-CompoundButton-13, var(--semantic-token-CompoundButton-14, ${tokens.colorNeutralForeground2}))`,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: `var(--ctrl-token-CompoundButton-15, var(--semantic-token-CompoundButton-16, ${tokens.colorNeutralForeground2Hover}))`,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: `var(--ctrl-token-CompoundButton-17, var(--semantic-token-CompoundButton-18, ${tokens.colorNeutralForeground2Pressed}))`,
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
      color: `var(--ctrl-token-CompoundButton-19, var(--semantic-token-CompoundButton-20, ${tokens.colorNeutralForeground2}))`,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: `var(--ctrl-token-CompoundButton-21, var(--semantic-token-CompoundButton-22, ${tokens.colorNeutralForeground2BrandHover}))`,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: `var(--ctrl-token-CompoundButton-23, var(--semantic-token-CompoundButton-24, ${tokens.colorNeutralForeground2BrandPressed}))`,
      },
    },
  },

  // Size variations
  small: {
    padding: `${tokens.spacingHorizontalS} ${tokens.spacingHorizontalS} ${tokens.spacingHorizontalMNudge} ${tokens.spacingHorizontalS}`,

    fontSize: `var(--ctrl-token-CompoundButton-25, var(--semantic-token-CompoundButton-26, ${tokens.fontSizeBase300}))`,
    lineHeight: `var(--ctrl-token-CompoundButton-27, var(--semantic-token-CompoundButton-28, ${tokens.lineHeightBase300}))`,
  },
  medium: {
    padding: `14px ${tokens.spacingHorizontalM} ${tokens.spacingHorizontalL} ${tokens.spacingHorizontalM}`,

    fontSize: `var(--ctrl-token-CompoundButton-29, var(--semantic-token-CompoundButton-30, ${tokens.fontSizeBase300}))`,
    lineHeight: `var(--ctrl-token-CompoundButton-31, var(--semantic-token-CompoundButton-32, ${tokens.lineHeightBase300}))`,
  },
  large: {
    padding: `18px ${tokens.spacingHorizontalL} ${tokens.spacingHorizontalXL} ${tokens.spacingHorizontalL}`,

    fontSize: `var(--ctrl-token-CompoundButton-33, var(--semantic-token-CompoundButton-34, ${tokens.fontSizeBase400}))`,
    lineHeight: `var(--ctrl-token-CompoundButton-35, var(--semantic-token-CompoundButton-36, ${tokens.lineHeightBase400}))`,
  },

  // Disabled styles
  disabled: {
    [`& .${compoundButtonClassNames.secondaryContent}`]: {
      color: `var(--ctrl-token-CompoundButton-37, var(--semantic-token-CompoundButton-38, ${tokens.colorNeutralForegroundDisabled}))`,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: `var(--ctrl-token-CompoundButton-39, var(--semantic-token-CompoundButton-40, ${tokens.colorNeutralForegroundDisabled}))`,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: `var(--ctrl-token-CompoundButton-41, var(--semantic-token-CompoundButton-42, ${tokens.colorNeutralForegroundDisabled}))`,
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
    padding: `var(--ctrl-token-CompoundButton-43, var(--semantic-token-CompoundButton-44, ${tokens.spacingHorizontalXS}))`,

    maxWidth: '48px',
    minWidth: '48px',
  },
  medium: {
    padding: `var(--ctrl-token-CompoundButton-45, var(--semantic-token-CompoundButton-46, ${tokens.spacingHorizontalSNudge}))`,

    maxWidth: '52px',
    minWidth: '52px',
  },
  large: {
    padding: `var(--ctrl-token-CompoundButton-47, var(--semantic-token-CompoundButton-48, ${tokens.spacingHorizontalS}))`,

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
    marginRight: `var(--ctrl-token-CompoundButton-49, var(--semantic-token-CompoundButton-50, ${tokens.spacingHorizontalM}))`,
  },
  after: {
    marginLeft: `var(--ctrl-token-CompoundButton-51, var(--semantic-token-CompoundButton-52, ${tokens.spacingHorizontalM}))`,
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
    fontWeight: `var(--ctrl-token-CompoundButton-53, var(--semantic-token-CompoundButton-54, ${tokens.fontWeightRegular}))`,
  },

  // Size variations
  small: {
    fontSize: `var(--ctrl-token-CompoundButton-55, var(--semantic-token-CompoundButton-56, ${tokens.fontSizeBase200}))`,
  },
  medium: {
    fontSize: `var(--ctrl-token-CompoundButton-57, var(--semantic-token-CompoundButton-58, ${tokens.fontSizeBase200}))`,
  },
  large: {
    fontSize: `var(--ctrl-token-CompoundButton-59, var(--semantic-token-CompoundButton-60, ${tokens.fontSizeBase300}))`,
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
