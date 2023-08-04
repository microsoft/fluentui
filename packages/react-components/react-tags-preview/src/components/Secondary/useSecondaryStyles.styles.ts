import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SecondarySlots, SecondaryState } from './Secondary.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';

export const secondaryClassNames: SlotClassNames<SecondarySlots> = {
  root: 'fui-Secondary',
};

const mediumIconSize = '20px';
const smallIconSize = '16px';
const extraSmallIconSize = '12px';

const useRootStyles = makeStyles({
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

export const useSecondaryStyles_unstable = (state: SecondaryState): SecondaryState => {
  const rootStyles = useRootStyles();
  const rootDisabledStyles = useRootDisabledStyles();

  const { shape, size, appearance } = state;

  state.root.className = mergeClasses(
    secondaryClassNames.root,
    rootStyles.base,
    state.disabled ? rootDisabledStyles[appearance] : rootStyles[appearance],
    rootStyles[shape],
    rootStyles[size],
    state.root.className,
  );

  return state;
};
