import { shorthands, mergeClasses, makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
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
    ...shorthands.gap('12px'),

    height: 'auto',

    [`& .${compoundButtonClassNames.secondaryContent}`]: {
      color: tokens.colorNeutralForeground2,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForeground2Hover,
      },
    },

    ':active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForeground2Pressed,
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

    ':active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForegroundOnBrand,
      },
    },
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

    ':active': {
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

    ':active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
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
    [`& .${compoundButtonClassNames.secondaryContent}`]: {
      color: tokens.colorNeutralForegroundDisabled,
    },

    ':hover': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
        color: tokens.colorNeutralForegroundDisabled,
      },
    },

    ':active': {
      [`& .${compoundButtonClassNames.secondaryContent}`]: {
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
    compoundButtonClassNames.root,

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

  state.contentContainer.className = mergeClasses(
    compoundButtonClassNames.contentContainer,
    contentContainerStyles.base,
    state.contentContainer.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(compoundButtonClassNames.icon, iconStyles.base, state.icon.className);
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
