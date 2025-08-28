import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { InteractionTagSecondarySlots, InteractionTagSecondaryState } from './InteractionTagSecondary.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';

export const interactionTagSecondaryClassNames: SlotClassNames<InteractionTagSecondarySlots> = {
  root: 'fui-InteractionTagSecondary',
};

const mediumIconSize = '20px';
const smallIconSize = '16px';
const extraSmallIconSize = '12px';

const useRootBaseClassName = makeResetStyles({
  // reset default button style:
  color: 'inherit',
  fontFamily: 'inherit',
  padding: '0px',
  borderStyle: 'none',
  appearance: 'button',
  textAlign: 'unset',
  backgroundColor: 'transparent',

  display: 'flex',
  height: '100%',
  alignItems: 'center',

  ...createCustomFocusIndicatorStyle({
    outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
  }),

  border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,

  // divider:
  borderLeftColor: tokens.colorNeutralStroke1,
  borderTopLeftRadius: tokens.borderRadiusNone,
  borderBottomLeftRadius: tokens.borderRadiusNone,
});

const useRootStyles = makeStyles({
  filled: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    ':hover': {
      cursor: 'pointer',
      backgroundColor: tokens.colorNeutralBackground3Hover,
      color: tokens.colorNeutralForeground2BrandHover,
    },
    ':active': {
      backgroundColor: tokens.colorNeutralBackground3Pressed,
      color: tokens.colorNeutralForeground2BrandPressed,
    },
    '@media (forced-colors: active)': {
      borderTopWidth: `${tokens.strokeWidthThin}`,
      borderBottomWidth: `${tokens.strokeWidthThin}`,
      ':hover': {
        backgroundColor: 'HighlightText',
      },
      ':active': {
        backgroundColor: 'HighlightText',
      },
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
    ':active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      color: tokens.colorNeutralForeground2BrandPressed,
    },
    '@media (forced-colors: active)': {
      ':hover': {
        backgroundColor: 'HighlightText',
      },
      ':active': {
        backgroundColor: 'HighlightText',
      },
    },
  },
  brand: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    borderLeftColor: tokens.colorBrandStroke2, // divider
    borderTopWidth: 0,
    borderBottomWidth: 0,
    ':hover': {
      cursor: 'pointer',
      backgroundColor: tokens.colorBrandBackground2Hover,
      color: tokens.colorCompoundBrandForeground1Hover,
    },
    ':active': {
      backgroundColor: tokens.colorBrandBackground2Pressed,
      color: tokens.colorCompoundBrandForeground1Pressed,
    },
    '@media (forced-colors: active)': {
      borderTopWidth: `${tokens.strokeWidthThin}`,
      borderBottomWidth: `${tokens.strokeWidthThin}`,
      ':hover': {
        backgroundColor: 'HighlightText',
      },
      ':active': {
        backgroundColor: 'HighlightText',
      },
    },
  },
  selected: {
    background: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.borderColor(tokens.colorBrandStroke1),
    '@media (forced-colors: active)': {
      forcedColorAdjust: 'none',
      backgroundColor: 'Highlight',
      color: 'HighlightText',
    },

    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
      color: tokens.colorNeutralForegroundOnBrand,
      '@media (forced-colors: active)': {
        backgroundColor: 'Highlight',
        color: 'HighlightText',
      },
    },
    ':active': {
      backgroundColor: tokens.colorBrandBackgroundPressed,
      color: tokens.colorNeutralForegroundOnBrand,
      '@media (forced-colors: active)': {
        backgroundColor: 'Highlight',
        color: 'HighlightText',
      },
    },
    // divider
    borderLeftColor: tokens.colorNeutralStrokeOnBrand2,
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
    position: 'relative',

    '@media (forced-colors: none)': {
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        height: '2px',
        left: '0',
        width: '100%',
      },
      '&:before': {
        bottom: '100%',
      },
      '&:after': {
        top: '100%',
      },
    },
  },
});
const useRootDisabledStyles = makeStyles({
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

export const useInteractionTagSecondaryStyles_unstable = (
  state: InteractionTagSecondaryState,
): InteractionTagSecondaryState => {
  'use no memo';

  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles();
  const rootDisabledStyles = useRootDisabledStyles();

  const { disabled, selected, shape, size, appearance } = state;

  state.root.className = mergeClasses(
    interactionTagSecondaryClassNames.root,
    rootBaseClassName,
    disabled ? rootDisabledStyles[appearance] : rootStyles[appearance],
    rootStyles[shape],
    rootStyles[size],
    selected && !disabled && rootStyles.selected,
    state.root.className,
  );

  return state;
};
