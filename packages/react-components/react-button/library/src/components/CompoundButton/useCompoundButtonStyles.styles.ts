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
      color: `var(--1, var(--2, ${tokens.colorNeutralForeground2}))`,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: `var(--3, var(--4, ${tokens.colorNeutralForeground2Hover}))`,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: `var(--5, var(--6, ${tokens.colorNeutralForeground2Pressed}))`,
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
      color: `var(--7, var(--8, ${tokens.colorNeutralForegroundOnBrand}))`,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: `var(--9, var(--10, ${tokens.colorNeutralForegroundOnBrand}))`,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: `var(--11, var(--12, ${tokens.colorNeutralForegroundOnBrand}))`,
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
      color: `var(--13, var(--14, ${tokens.colorNeutralForeground2}))`,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: `var(--15, var(--16, ${tokens.colorNeutralForeground2Hover}))`,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: `var(--17, var(--18, ${tokens.colorNeutralForeground2Pressed}))`,
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
      color: `var(--19, var(--20, ${tokens.colorNeutralForeground2}))`,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: `var(--21, var(--22, ${tokens.colorNeutralForeground2BrandHover}))`,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: `var(--23, var(--24, ${tokens.colorNeutralForeground2BrandPressed}))`,
      },
    },
  },

  // Size variations
  small: {
    padding: `${tokens.spacingHorizontalS} ${tokens.spacingHorizontalS} ${tokens.spacingHorizontalMNudge} ${tokens.spacingHorizontalS}`,

    fontSize: `var(--25, var(--26, ${tokens.fontSizeBase300}))`,
    lineHeight: `var(--27, var(--28, ${tokens.lineHeightBase300}))`,
  },
  medium: {
    padding: `14px ${tokens.spacingHorizontalM} ${tokens.spacingHorizontalL} ${tokens.spacingHorizontalM}`,

    fontSize: `var(--29, var(--30, ${tokens.fontSizeBase300}))`,
    lineHeight: `var(--31, var(--32, ${tokens.lineHeightBase300}))`,
  },
  large: {
    padding: `18px ${tokens.spacingHorizontalL} ${tokens.spacingHorizontalXL} ${tokens.spacingHorizontalL}`,

    fontSize: `var(--33, var(--34, ${tokens.fontSizeBase400}))`,
    lineHeight: `var(--35, var(--36, ${tokens.lineHeightBase400}))`,
  },

  // Disabled styles
  disabled: {
    [`& .${compoundButtonClassNames.secondaryContent}`]: {
      color: `var(--37, var(--38, ${tokens.colorNeutralForegroundDisabled}))`,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: `var(--39, var(--40, ${tokens.colorNeutralForegroundDisabled}))`,
      },
    },

    ':hover:active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: `var(--41, var(--42, ${tokens.colorNeutralForegroundDisabled}))`,
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
    padding: `var(--43, var(--44, ${tokens.spacingHorizontalXS}))`,

    maxWidth: '48px',
    minWidth: '48px',
  },
  medium: {
    padding: `var(--45, var(--46, ${tokens.spacingHorizontalSNudge}))`,

    maxWidth: '52px',
    minWidth: '52px',
  },
  large: {
    padding: `var(--47, var(--48, ${tokens.spacingHorizontalS}))`,

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
    marginRight: `var(--49, var(--50, ${tokens.spacingHorizontalM}))`,
  },
  after: {
    marginLeft: `var(--51, var(--52, ${tokens.spacingHorizontalM}))`,
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
    fontWeight: `var(--53, var(--54, ${tokens.fontWeightRegular}))`,
  },

  // Size variations
  small: {
    fontSize: `var(--55, var(--56, ${tokens.fontSizeBase200}))`,
  },
  medium: {
    fontSize: `var(--57, var(--58, ${tokens.fontSizeBase200}))`,
  },
  large: {
    fontSize: `var(--59, var(--60, ${tokens.fontSizeBase300}))`,
  },
});

export const useCompoundButtonStyles_unstable = (state: CompoundButtonState): CompoundButtonState => {
  'use no memo';

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
