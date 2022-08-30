import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { shorthands, mergeClasses, makeStyles } from '@griffel/react';
import { useButtonStyles_unstable } from '../Button/useButtonStyles';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ButtonSlots } from '../Button/Button.types';
import type { ToggleButtonState } from './ToggleButton.types';

export const toggleButtonClassNames: SlotClassNames<ButtonSlots> = {
  root: 'fui-ToggleButton',
  icon: 'fui-ToggleButton__icon',
};

const useCheckedStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @griffel/no-shorthands
    borderColor: tokens.colorNeutralStroke1,
    color: tokens.colorNeutralForeground1Selected,

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @griffel/no-shorthands
    borderWidth: tokens.strokeWidthThin,

    [`& .${iconFilledClassName}`]: {
      display: 'inline',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'none',
    },

    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @griffel/no-shorthands
      borderColor: tokens.colorNeutralStroke1Hover,
      color: tokens.colorNeutralForeground1Hover,
    },

    ':hover:active': {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @griffel/no-shorthands
      borderColor: tokens.colorNeutralStroke1Pressed,
      color: tokens.colorNeutralForeground1Pressed,
    },
  },

  // High contrast styles
  highContrast: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    '@media (forced-colors: active)': {
      backgroundColor: 'Highlight',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @griffel/no-shorthands
      borderColor: 'Highlight',
      color: 'HighlightText',
      forcedColorAdjust: 'none',

      ':hover': {
        backgroundColor: 'HighlightText',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @griffel/no-shorthands
        borderColor: 'Highlight',
        color: 'Highlight',
      },

      ':hover:active': {
        backgroundColor: 'HighlightText',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @griffel/no-shorthands
        borderColor: 'Highlight',
        color: 'Highlight',
      },

      ':focus': {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @griffel/no-shorthands
        borderColor: 'Highlight',
      },
    },
  },
  highContrastFocusStyles: createCustomFocusIndicatorStyle({
    ...shorthands.border('1px', 'solid', 'HighlightText'),
    outlineColor: 'Highlight',
  }),

  // Appearance variations
  outline: {
    backgroundColor: tokens.colorTransparentBackgroundSelected,
    ...shorthands.borderWidth(tokens.strokeWidthThicker),

    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
    },

    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
    },

    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderColor(tokens.colorNeutralStroke1),
    }),
  },
  primary: {
    backgroundColor: tokens.colorBrandBackgroundSelected,
    ...shorthands.borderColor('transparent'),
    color: tokens.colorNeutralForegroundOnBrand,

    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForegroundOnBrand,
    },

    ':hover:active': {
      backgroundColor: tokens.colorBrandBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForegroundOnBrand,
    },
  },
  secondary: {
    /* The secondary styles are exactly the same as the base styles. */
  },
  subtle: {
    backgroundColor: tokens.colorSubtleBackgroundSelected,
    ...shorthands.borderColor('transparent'),
    color: tokens.colorNeutralForeground2BrandSelected,

    ':hover': {
      backgroundColor: tokens.colorSubtleBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2BrandHover,
    },

    ':hover:active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2BrandPressed,
    },
  },
  transparent: {
    backgroundColor: tokens.colorTransparentBackgroundSelected,
    ...shorthands.borderColor('transparent'),
    color: tokens.colorNeutralForeground2BrandSelected,

    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2BrandHover,
    },

    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2BrandPressed,
    },
  },
});

const useDisabledStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    color: tokens.colorNeutralForegroundDisabled,

    ':hover': {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: tokens.colorNeutralForegroundDisabled,
    },

    ':hover:active': {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: tokens.colorNeutralForegroundDisabled,
    },
  },

  // Appearance variations
  outline: {
    /* No styles */
  },
  primary: {
    ...shorthands.borderColor('transparent'),

    ':hover': {
      ...shorthands.borderColor('transparent'),
    },

    ':hover:active': {
      ...shorthands.borderColor('transparent'),
    },
  },
  secondary: {
    /* The secondary styles are exactly the same as the base styles. */
  },
  subtle: {
    backgroundColor: 'transparent',
    ...shorthands.borderColor('transparent'),

    ':hover': {
      backgroundColor: 'transparent',
      ...shorthands.borderColor('transparent'),
    },

    ':hover:active': {
      backgroundColor: 'transparent',
      ...shorthands.borderColor('transparent'),
    },
  },
  transparent: {
    backgroundColor: 'transparent',
    ...shorthands.borderColor('transparent'),

    ':hover': {
      backgroundColor: 'transparent',
      ...shorthands.borderColor('transparent'),
    },

    ':hover:active': {
      backgroundColor: 'transparent',
      ...shorthands.borderColor('transparent'),
    },
  },
});

export const useToggleButtonStyles_unstable = (state: ToggleButtonState): ToggleButtonState => {
  const checkedStyles = useCheckedStyles();
  const disabledStyles = useDisabledStyles();

  const { appearance, checked, disabled, disabledFocusable } = state;

  state.root.className = mergeClasses(
    toggleButtonClassNames.root,

    // Checked styles
    checked && checkedStyles.base,
    checked && checkedStyles.highContrast,
    appearance && checked && checkedStyles[appearance],

    // Disabled styles
    (disabled || disabledFocusable) && disabledStyles.base,
    appearance && (disabled || disabledFocusable) && disabledStyles[appearance],

    // User provided class name
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(toggleButtonClassNames.icon, state.icon.className);
  }

  useButtonStyles_unstable(state);

  return state;
};
