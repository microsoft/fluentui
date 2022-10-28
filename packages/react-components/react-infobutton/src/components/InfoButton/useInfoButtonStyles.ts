import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { InfoButtonSlots, InfoButtonState } from './InfoButton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const infoButtonClassNames: SlotClassNames<InfoButtonSlots> = {
  root: 'fui-InfoButton',
  // this className won't be used, but it's needed to satisfy the type checker
  popover: 'fui-InfoButton__popover',
  content: 'fui-InfoButton__content',
};

/**
 * Styles for the root slot
 */
const useButtonStyles = makeStyles({
  base: {
    alignItems: 'center',
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderColor('transparent'),
    color: tokens.colorNeutralForeground2,
    display: 'inline-flex',
    justifyContent: 'center',
    maxWidth: '28px',
    minWidth: '28px',
    outlineStyle: 'none',
    ...shorthands.padding(tokens.spacingHorizontalXS),

    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2BrandHover,

      cursor: 'pointer',

      [`& .${iconFilledClassName}`]: {
        display: 'inline-flex',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },

    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2BrandPressed,

      outlineStyle: 'none',

      [`& .${iconFilledClassName}`]: {
        display: 'inline-flex',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },
  },

  selected: {
    color: tokens.colorNeutralForeground2BrandPressed,

    [`& .${iconFilledClassName}`]: {
      display: 'inline-flex',
    },

    [`& .${iconRegularClassName}`]: {
      display: 'none',
    },

    '@media (forced-colors: active)': {
      color: 'Highlight',
    },
  },

  focusIndicator: createCustomFocusIndicatorStyle({
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    outlineColor: tokens.colorTransparentStroke,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: 'solid',
    boxShadow: `
      ${tokens.shadow4},
      0 0 0 2px ${tokens.colorStrokeFocus2}
    `,
    zIndex: 1,
  }),

  transition: {
    transitionDuration: tokens.durationFaster,
    transitionProperty: 'background, border, color',
    transitionTimingFunction: tokens.curveEasyEase,

    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
    },
  },
});

const useDisabledButtonStyles = makeStyles({
  base: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderColor('transparent'),
    color: tokens.colorNeutralForegroundDisabled,

    cursor: 'not-allowed',

    ':hover': {
      backgroundColor: tokens.colorTransparentBackground,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForegroundDisabled,

      [`& .${iconFilledClassName}`]: {
        display: 'none',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'inline-flex',
      },
    },

    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackground,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForegroundDisabled,

      [`& .${iconFilledClassName}`]: {
        display: 'none',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'inline-flex',
      },
    },
  },
});

/**
 * Apply styling to the InfoButton slots based on the state
 */
export const useInfoButtonStyles_unstable = (state: InfoButtonState): InfoButtonState => {
  const { open } = state.popover;
  const { disabled } = state.root;
  const buttonStyles = useButtonStyles();
  const disabledButtonStyles = useDisabledButtonStyles();

  state.content.className = mergeClasses(infoButtonClassNames.content, state.content.className);
  state.root.className = mergeClasses(
    infoButtonClassNames.root,
    buttonStyles.base,
    buttonStyles.focusIndicator,
    buttonStyles.transition,
    open && buttonStyles.selected,

    disabled && disabledButtonStyles.base,

    state.root.className,
  );

  return state;
};
