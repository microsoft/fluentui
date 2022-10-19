import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';
import type { InfoButtonSlots, InfoButtonState } from './InfoButton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const infoButtonClassNames: SlotClassNames<InfoButtonSlots> = {
  // This classname is not applied, but it's left here to prevent a linting error.
  root: 'fui-InfoButton',
  content: 'fui-InfoButton__content',
  button: 'fui-InfoButton__button',
};

/**
 * Styles for the button slot
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
    transitionDuration: '100ms',
    transitionProperty: 'background, border, color',
    transitionTimingFunction: 'cubic-bezier(0.33, 0, 0.67, 1)',

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

      cursor: 'not-allowed',

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

      cursor: 'not-allowed',

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
  const { popoverOpen } = state;
  const { disabled } = state.button;
  const buttonStyles = useButtonStyles();
  const disabledButtonStyles = useDisabledButtonStyles();

  state.content.className = mergeClasses(infoButtonClassNames.content, state.content.className);
  state.button.className = mergeClasses(
    infoButtonClassNames.button,
    buttonStyles.base,
    buttonStyles.focusIndicator,
    buttonStyles.transition,
    popoverOpen && buttonStyles.selected,

    // Disabled styles
    disabled && disabledButtonStyles.base,

    state.button.className,
  );

  return state;
};
