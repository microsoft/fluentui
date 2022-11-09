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
    boxSizing: 'border-box',
    display: 'inline-flex',
    justifyContent: 'center',
    textDecorationLine: 'none',
    verticalAlign: 'middle',

    backgroundColor: tokens.colorTransparentBackground,
    color: tokens.colorNeutralForeground2,
    fontFamily: tokens.fontFamilyBase,

    ...shorthands.overflow('hidden'),
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorTransparentStroke),
    ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalXS),
    ...shorthands.margin(0),

    [`& .${iconFilledClassName}`]: {
      display: 'none',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'inline-flex',
    },

    ':enabled:hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
      color: tokens.colorNeutralForeground2BrandHover,

      [`& .${iconFilledClassName}`]: {
        display: 'inline-flex',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
    },
    ':enabled:hover:active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
      color: tokens.colorNeutralForeground2BrandPressed,
    },
    ':disabled': {
      cursor: 'not-allowed',
      color: tokens.colorNeutralForegroundDisabled,
    },
  },

  focusIndicator: createCustomFocusIndicatorStyle({
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    outlineColor: tokens.colorTransparentStroke,
    outlineWidth: tokens.strokeWidthThick,
    outlineStyle: 'solid',
    boxShadow: `
      ${tokens.shadow4},
      0 0 0 ${tokens.borderRadiusSmall} ${tokens.colorStrokeFocus2}
    `,
    zIndex: 1,
  }),

  selected: {
    backgroundColor: tokens.colorTransparentBackgroundSelected,
    color: tokens.colorNeutralForeground2BrandSelected,

    [`& .${iconFilledClassName}`]: {
      display: 'inline-flex',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'none',
    },
  },
});

/**
 * Apply styling to the InfoButton slots based on the state
 */
export const useInfoButtonStyles_unstable = (state: InfoButtonState): InfoButtonState => {
  const { open } = state.popover;
  const buttonStyles = useButtonStyles();

  state.content.className = mergeClasses(infoButtonClassNames.content, state.content.className);
  state.root.className = mergeClasses(
    infoButtonClassNames.root,
    buttonStyles.base,
    buttonStyles.focusIndicator,
    open && buttonStyles.selected,
    state.root.className,
  );

  return state;
};
