import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses } from '@griffel/react';
import { splitButtonClassNames } from '@fluentui/react-components';
import type { SplitButtonState } from '@fluentui/react-components';

const useRootStyles = makeStyles({
  base: {
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      position: 'relative',
      borderRightWidth: 0,
      '::after': {
        content: '""',
        borderRight: `${tokens.strokeWidthThin} solid`,
        borderRightColor: 'inherit',
        boxSizing: 'border-box',
        height: `calc(100% - ${tokens.strokeWidthThin} * 2 - ${tokens.spacingVerticalS} * 2)`,
        opacity: 0.3,
        position: 'absolute',
        right: 0,
      },
    },
  },

  primary: {
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: tokens.colorNeutralStrokeOnBrand2,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStrokeOnBrand2Hover,
      },
    },

    ':hover:active,:active:focus-visible': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStrokeOnBrand2Pressed,
      },
    },
  },
  secondary: {
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: tokens.colorNeutralStroke4,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStroke4Hover,
      },
    },

    ':hover:active,:active:focus-visible': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStroke4Pressed,
      },
    },
  },
  subtle: {
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: tokens.colorNeutralStroke1,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStroke1Hover,
      },
    },

    ':hover:active,:active:focus-visible': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStroke1Pressed,
      },
    },
  },
  transparent: {
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: tokens.colorNeutralStroke1,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStroke1Hover,
      },
    },

    ':hover:active,:active:focus-visible': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStroke1Pressed,
      },
    },
  },
});

type AppearanceKey = 'primary' | 'secondary' | 'subtle' | 'transparent';

export const useCapSplitButtonStyles = (state: SplitButtonState): void => {
  const rootStyles = useRootStyles();

  const { appearance } = state;

  state.root.className = mergeClasses(
    state.root.className,
    rootStyles.base,
    appearance && appearance in rootStyles && rootStyles[appearance as AppearanceKey],
  );
};
