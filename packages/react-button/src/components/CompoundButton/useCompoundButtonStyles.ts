import { shorthands, mergeClasses, makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { useButtonStyles_unstable } from '../Button/useButtonStyles';
import type { CompoundButtonState } from './CompoundButton.types';

export const compoundButtonClassName = 'fui-CompoundButton';

const CompoundButtonClassNames = {
  secondaryContent: `${compoundButtonClassName}-secondaryContent`,
};

const useRootStyles = makeStyles({
  // Base styles
  base: {
    ...shorthands.gap('12px'),

    height: 'auto',

    [`& .${CompoundButtonClassNames.secondaryContent}`]: {
      color: tokens.colorNeutralForeground2,
    },

    ':hover': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForeground2Hover,
      },
    },

    ':active': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForeground2Pressed,
      },
    },
  },

  // Appearance variations
  outline: {
    /* No styles */
  },
  primary: {
    [`& .${CompoundButtonClassNames.secondaryContent}`]: {
      color: tokens.colorNeutralForegroundOnBrand,
    },

    ':hover': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForegroundOnBrand,
      },
    },

    ':active': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForegroundOnBrand,
      },
    },
  },
  subtle: {
    [`& .${CompoundButtonClassNames.secondaryContent}`]: {
      color: tokens.colorNeutralForeground2,
    },

    ':hover': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForeground2BrandHover,
      },
    },

    ':active': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForeground2BrandPressed,
      },
    },
  },
  transparent: {
    [`& .${CompoundButtonClassNames.secondaryContent}`]: {
      color: tokens.colorNeutralForeground2,
    },

    ':hover': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForeground2BrandHover,
      },
    },

    ':active': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForeground2BrandPressed,
      },
    },
  },

  // Size variations
  small: {
    ...shorthands.padding('8px', '8px', '10px', '8px'),

    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  medium: {
    ...shorthands.padding('14px', '12px', '16px', '12px'),

    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  large: {
    ...shorthands.padding('18px', '16px', '20px', '16px'),

    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },

  // Disabled styles
  disabled: {
    [`& .${CompoundButtonClassNames.secondaryContent}`]: {
      color: tokens.colorNeutralForegroundDisabled,
    },

    ':hover': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForegroundDisabled,
      },
    },

    ':active': {
      [`& .${CompoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForegroundDisabled,
      },
    },
  },
});

const useRootIconOnlyStyles = makeStyles({
  // Size variations
  small: {
    ...shorthands.padding('4px'),

    maxWidth: '48px',
    minWidth: '48px',
  },
  medium: {
    ...shorthands.padding('6px'),

    maxWidth: '52px',
    minWidth: '52px',
  },
  large: {
    ...shorthands.padding('8px'),

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

  const { appearance, disabled, disabledFocusable, iconOnly, size } = state;

  state.root.className = mergeClasses(
    compoundButtonClassName,

    // Root styles
    rootStyles.base,
    appearance && rootStyles[appearance],
    rootStyles[size],

    // Disabled styles
    (disabled || disabledFocusable) && rootStyles.disabled,

    // Icon-only styles
    iconOnly && rootIconOnlyStyles[size],

    // User provided class name
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(iconStyles.base, state.icon.className);
  }

  state.contentContainer.className = mergeClasses(contentContainerStyles.base, state.contentContainer.className);

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      CompoundButtonClassNames.secondaryContent,
      secondaryContentStyles.base,
      secondaryContentStyles[size],
      state.secondaryContent.className,
    );
  }

  useButtonStyles_unstable(state);

  return state;
};
