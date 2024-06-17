import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { shorthands, mergeClasses, makeStyles } from '@griffel/react';
import { useButtonStyles_unstable } from '../Button/useButtonStyles.styles';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ButtonSlots } from '../Button/Button.types';
import type { ToggleButtonState } from './ToggleButton.types';

export const toggleButtonClassNames: SlotClassNames<ButtonSlots> = {
  root: 'fui-ToggleButton',
  icon: 'fui-ToggleButton__icon',
};

const useRootCheckedStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: `var(--117, var(--118, ${tokens.colorNeutralBackground1Selected}))`,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    color: `var(--119, var(--120, ${tokens.colorNeutralForeground1Selected}))`,

    ...shorthands.borderWidth(tokens.strokeWidthThin),

    [`& .${iconFilledClassName}`]: {
      display: 'inline',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'none',
    },

    ':hover': {
      backgroundColor: `var(--121, var(--122, ${tokens.colorNeutralBackground1Hover}))`,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      color: `var(--123, var(--124, ${tokens.colorNeutralForeground1Hover}))`,
    },

    ':hover:active': {
      backgroundColor: `var(--125, var(--126, ${tokens.colorNeutralBackground1Pressed}))`,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      color: `var(--127, var(--128, ${tokens.colorNeutralForeground1Pressed}))`,
    },
  },

  // High contrast styles
  highContrast: {
    '@media (forced-colors: active)': {
      backgroundColor: 'Highlight',
      ...shorthands.borderColor('Highlight'),
      color: 'HighlightText',
      forcedColorAdjust: 'none',

      ':hover': {
        backgroundColor: 'HighlightText',
        ...shorthands.borderColor('Highlight'),
        color: 'Highlight',
      },

      ':hover:active': {
        backgroundColor: 'HighlightText',
        ...shorthands.borderColor('Highlight'),
        color: 'Highlight',
      },

      ':focus': {
        border: '1px solid HighlightText',
        outlineColor: 'Highlight',
      },
    },
  },

  // Appearance variations
  outline: {
    backgroundColor: `var(--129, var(--130, ${tokens.colorTransparentBackgroundSelected}))`,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    ...shorthands.borderWidth(tokens.strokeWidthThicker),

    ':hover': {
      backgroundColor: `var(--131, var(--132, ${tokens.colorTransparentBackgroundHover}))`,
    },

    ':hover:active': {
      backgroundColor: `var(--133, var(--134, ${tokens.colorTransparentBackgroundPressed}))`,
    },

    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderColor(tokens.colorNeutralStroke1),
    }),
  },
  primary: {
    backgroundColor: `var(--135, var(--136, ${tokens.colorBrandBackgroundSelected}))`,
    ...shorthands.borderColor('transparent'),
    color: `var(--137, var(--138, ${tokens.colorNeutralForegroundOnBrand}))`,

    ':hover': {
      backgroundColor: `var(--139, var(--140, ${tokens.colorBrandBackgroundHover}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--141, var(--142, ${tokens.colorNeutralForegroundOnBrand}))`,
    },

    ':hover:active': {
      backgroundColor: `var(--143, var(--144, ${tokens.colorBrandBackgroundPressed}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--145, var(--146, ${tokens.colorNeutralForegroundOnBrand}))`,
    },
  },
  secondary: {
    /* The secondary styles are exactly the same as the base styles. */
  },
  subtle: {
    backgroundColor: `var(--147, var(--148, ${tokens.colorSubtleBackgroundSelected}))`,
    ...shorthands.borderColor('transparent'),
    color: `var(--149, var(--150, ${tokens.colorNeutralForeground2Selected}))`,

    ':hover': {
      backgroundColor: `var(--151, var(--152, ${tokens.colorSubtleBackgroundHover}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--153, var(--154, ${tokens.colorNeutralForeground2Hover}))`,
    },

    ':hover:active': {
      backgroundColor: `var(--155, var(--156, ${tokens.colorSubtleBackgroundPressed}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--157, var(--158, ${tokens.colorNeutralForeground2Pressed}))`,
    },
  },
  transparent: {
    backgroundColor: `var(--159, var(--160, ${tokens.colorTransparentBackgroundSelected}))`,
    ...shorthands.borderColor('transparent'),
    color: `var(--161, var(--162, ${tokens.colorNeutralForeground2BrandSelected}))`,

    ':hover': {
      backgroundColor: `var(--163, var(--164, ${tokens.colorTransparentBackgroundHover}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--165, var(--166, ${tokens.colorNeutralForeground2BrandHover}))`,
    },

    ':hover:active': {
      backgroundColor: `var(--167, var(--168, ${tokens.colorTransparentBackgroundPressed}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--169, var(--170, ${tokens.colorNeutralForeground2BrandPressed}))`,
    },
  },
});

const useRootDisabledStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: `var(--171, var(--172, ${tokens.colorNeutralBackgroundDisabled}))`,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    color: `var(--173, var(--174, ${tokens.colorNeutralForegroundDisabled}))`,

    ':hover': {
      backgroundColor: `var(--175, var(--176, ${tokens.colorNeutralBackgroundDisabled}))`,
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: `var(--177, var(--178, ${tokens.colorNeutralForegroundDisabled}))`,
    },

    ':hover:active': {
      backgroundColor: `var(--179, var(--180, ${tokens.colorNeutralBackgroundDisabled}))`,
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: `var(--181, var(--182, ${tokens.colorNeutralForegroundDisabled}))`,
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
    backgroundColor: `var(--183, var(--184, ${tokens.colorTransparentBackground}))`,
    ...shorthands.borderColor('transparent'),

    ':hover': {
      backgroundColor: `var(--185, var(--186, ${tokens.colorTransparentBackgroundHover}))`,
      ...shorthands.borderColor('transparent'),
    },

    ':hover:active': {
      backgroundColor: `var(--187, var(--188, ${tokens.colorTransparentBackgroundPressed}))`,
      ...shorthands.borderColor('transparent'),
    },
  },
  transparent: {
    backgroundColor: `var(--189, var(--190, ${tokens.colorTransparentBackground}))`,
    ...shorthands.borderColor('transparent'),

    ':hover': {
      backgroundColor: `var(--191, var(--192, ${tokens.colorTransparentBackgroundHover}))`,
      ...shorthands.borderColor('transparent'),
    },

    ':hover:active': {
      backgroundColor: `var(--193, var(--194, ${tokens.colorTransparentBackgroundPressed}))`,
      ...shorthands.borderColor('transparent'),
    },
  },
});

const useIconCheckedStyles = makeStyles({
  // Appearance variations
  subtleOrTransparent: {
    color: `var(--195, var(--196, ${tokens.colorNeutralForeground2BrandSelected}))`,
  },
  // High contrast styles
  highContrast: {
    '@media (forced-colors: active)': {
      forcedColorAdjust: 'auto',
    },
  },
});

const usePrimaryHighContrastStyles = makeStyles({
  // Do not use primary variant high contrast styles for toggle buttons
  // otherwise there isn't enough difference between on/off states
  base: {
    '@media (forced-colors: active)': {
      backgroundColor: 'ButtonFace',
      ...shorthands.borderColor('ButtonBorder'),
      color: 'ButtonText',
      forcedColorAdjust: 'auto',
    },
  },

  disabled: {
    '@media (forced-colors: active)': {
      ...shorthands.borderColor('GrayText'),
      color: 'GrayText',

      ':focus': {
        ...shorthands.borderColor('GrayText'),
      },
    },
  },
});

export const useToggleButtonStyles_unstable = (state: ToggleButtonState): ToggleButtonState => {
  'use no memo';

  const rootCheckedStyles = useRootCheckedStyles();
  const rootDisabledStyles = useRootDisabledStyles();
  const iconCheckedStyles = useIconCheckedStyles();
  const primaryHighContrastStyles = usePrimaryHighContrastStyles();

  const { appearance, checked, disabled, disabledFocusable } = state;

  state.root.className = mergeClasses(
    toggleButtonClassNames.root,

    // Primary high contrast styles
    appearance === 'primary' && primaryHighContrastStyles.base,
    appearance === 'primary' && (disabled || disabledFocusable) && primaryHighContrastStyles.disabled,

    // Checked styles
    checked && rootCheckedStyles.base,
    checked && rootCheckedStyles.highContrast,
    appearance && checked && rootCheckedStyles[appearance],

    // Disabled styles
    (disabled || disabledFocusable) && rootDisabledStyles.base,
    appearance && (disabled || disabledFocusable) && rootDisabledStyles[appearance],

    // User provided class name
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      toggleButtonClassNames.icon,
      checked && (appearance === 'subtle' || appearance === 'transparent') && iconCheckedStyles.subtleOrTransparent,
      iconCheckedStyles.highContrast,
      state.icon.className,
    );
  }

  useButtonStyles_unstable(state);

  return state;
};
