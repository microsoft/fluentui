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
    backgroundColor: `var(--ctrl-token-ToggleButton-117, var(--semantic-token-ToggleButton-118, ${tokens.colorNeutralBackground1Selected}))`,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    color: `var(--ctrl-token-ToggleButton-119, var(--semantic-token-ToggleButton-120, ${tokens.colorNeutralForeground1Selected}))`,

    ...shorthands.borderWidth(tokens.strokeWidthThin),

    [`& .${iconFilledClassName}`]: {
      display: 'inline',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'none',
    },

    ':hover': {
      backgroundColor: `var(--ctrl-token-ToggleButton-121, var(--semantic-token-ToggleButton-122, ${tokens.colorNeutralBackground1Hover}))`,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      color: `var(--ctrl-token-ToggleButton-123, var(--semantic-token-ToggleButton-124, ${tokens.colorNeutralForeground1Hover}))`,
    },

    ':hover:active': {
      backgroundColor: `var(--ctrl-token-ToggleButton-125, var(--semantic-token-ToggleButton-126, ${tokens.colorNeutralBackground1Pressed}))`,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      color: `var(--ctrl-token-ToggleButton-127, var(--semantic-token-ToggleButton-128, ${tokens.colorNeutralForeground1Pressed}))`,
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
    backgroundColor: `var(--ctrl-token-ToggleButton-129, var(--semantic-token-ToggleButton-130, ${tokens.colorTransparentBackgroundSelected}))`,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    ...shorthands.borderWidth(tokens.strokeWidthThicker),

    ':hover': {
      backgroundColor: `var(--ctrl-token-ToggleButton-131, var(--semantic-token-ToggleButton-132, ${tokens.colorTransparentBackgroundHover}))`,
    },

    ':hover:active': {
      backgroundColor: `var(--ctrl-token-ToggleButton-133, var(--semantic-token-ToggleButton-134, ${tokens.colorTransparentBackgroundPressed}))`,
    },

    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderColor(tokens.colorNeutralStroke1),
    }),
  },
  primary: {
    backgroundColor: `var(--ctrl-token-ToggleButton-135, var(--semantic-token-ToggleButton-136, ${tokens.colorBrandBackgroundSelected}))`,
    ...shorthands.borderColor('transparent'),
    color: `var(--ctrl-token-ToggleButton-137, var(--semantic-token-ToggleButton-138, ${tokens.colorNeutralForegroundOnBrand}))`,

    ':hover': {
      backgroundColor: `var(--ctrl-token-ToggleButton-139, var(--semantic-token-ToggleButton-140, ${tokens.colorBrandBackgroundHover}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--ctrl-token-ToggleButton-141, var(--semantic-token-ToggleButton-142, ${tokens.colorNeutralForegroundOnBrand}))`,
    },

    ':hover:active': {
      backgroundColor: `var(--ctrl-token-ToggleButton-143, var(--semantic-token-ToggleButton-144, ${tokens.colorBrandBackgroundPressed}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--ctrl-token-ToggleButton-145, var(--semantic-token-ToggleButton-146, ${tokens.colorNeutralForegroundOnBrand}))`,
    },
  },
  secondary: {
    /* The secondary styles are exactly the same as the base styles. */
  },
  subtle: {
    backgroundColor: `var(--ctrl-token-ToggleButton-147, var(--semantic-token-ToggleButton-148, ${tokens.colorSubtleBackgroundSelected}))`,
    ...shorthands.borderColor('transparent'),
    color: `var(--ctrl-token-ToggleButton-149, var(--semantic-token-ToggleButton-150, ${tokens.colorNeutralForeground2Selected}))`,

    ':hover': {
      backgroundColor: `var(--ctrl-token-ToggleButton-151, var(--semantic-token-ToggleButton-152, ${tokens.colorSubtleBackgroundHover}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--ctrl-token-ToggleButton-153, var(--semantic-token-ToggleButton-154, ${tokens.colorNeutralForeground2Hover}))`,
    },

    ':hover:active': {
      backgroundColor: `var(--ctrl-token-ToggleButton-155, var(--semantic-token-ToggleButton-156, ${tokens.colorSubtleBackgroundPressed}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--ctrl-token-ToggleButton-157, var(--semantic-token-ToggleButton-158, ${tokens.colorNeutralForeground2Pressed}))`,
    },
  },
  transparent: {
    backgroundColor: `var(--ctrl-token-ToggleButton-159, var(--semantic-token-ToggleButton-160, ${tokens.colorTransparentBackgroundSelected}))`,
    ...shorthands.borderColor('transparent'),
    color: `var(--ctrl-token-ToggleButton-161, var(--semantic-token-ToggleButton-162, ${tokens.colorNeutralForeground2BrandSelected}))`,

    ':hover': {
      backgroundColor: `var(--ctrl-token-ToggleButton-163, var(--semantic-token-ToggleButton-164, ${tokens.colorTransparentBackgroundHover}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--ctrl-token-ToggleButton-165, var(--semantic-token-ToggleButton-166, ${tokens.colorNeutralForeground2BrandHover}))`,
    },

    ':hover:active': {
      backgroundColor: `var(--ctrl-token-ToggleButton-167, var(--semantic-token-ToggleButton-168, ${tokens.colorTransparentBackgroundPressed}))`,
      ...shorthands.borderColor('transparent'),
      color: `var(--ctrl-token-ToggleButton-169, var(--semantic-token-ToggleButton-170, ${tokens.colorNeutralForeground2BrandPressed}))`,
    },
  },
});

const useRootDisabledStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: `var(--ctrl-token-ToggleButton-171, var(--semantic-token-ToggleButton-172, ${tokens.colorNeutralBackgroundDisabled}))`,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    color: `var(--ctrl-token-ToggleButton-173, var(--semantic-token-ToggleButton-174, ${tokens.colorNeutralForegroundDisabled}))`,

    ':hover': {
      backgroundColor: `var(--ctrl-token-ToggleButton-175, var(--semantic-token-ToggleButton-176, ${tokens.colorNeutralBackgroundDisabled}))`,
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: `var(--ctrl-token-ToggleButton-177, var(--semantic-token-ToggleButton-178, ${tokens.colorNeutralForegroundDisabled}))`,
    },

    ':hover:active': {
      backgroundColor: `var(--ctrl-token-ToggleButton-179, var(--semantic-token-ToggleButton-180, ${tokens.colorNeutralBackgroundDisabled}))`,
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: `var(--ctrl-token-ToggleButton-181, var(--semantic-token-ToggleButton-182, ${tokens.colorNeutralForegroundDisabled}))`,
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
    backgroundColor: `var(--ctrl-token-ToggleButton-183, var(--semantic-token-ToggleButton-184, ${tokens.colorTransparentBackground}))`,
    ...shorthands.borderColor('transparent'),

    ':hover': {
      backgroundColor: `var(--ctrl-token-ToggleButton-185, var(--semantic-token-ToggleButton-186, ${tokens.colorTransparentBackgroundHover}))`,
      ...shorthands.borderColor('transparent'),
    },

    ':hover:active': {
      backgroundColor: `var(--ctrl-token-ToggleButton-187, var(--semantic-token-ToggleButton-188, ${tokens.colorTransparentBackgroundPressed}))`,
      ...shorthands.borderColor('transparent'),
    },
  },
  transparent: {
    backgroundColor: `var(--ctrl-token-ToggleButton-189, var(--semantic-token-ToggleButton-190, ${tokens.colorTransparentBackground}))`,
    ...shorthands.borderColor('transparent'),

    ':hover': {
      backgroundColor: `var(--ctrl-token-ToggleButton-191, var(--semantic-token-ToggleButton-192, ${tokens.colorTransparentBackgroundHover}))`,
      ...shorthands.borderColor('transparent'),
    },

    ':hover:active': {
      backgroundColor: `var(--ctrl-token-ToggleButton-193, var(--semantic-token-ToggleButton-194, ${tokens.colorTransparentBackgroundPressed}))`,
      ...shorthands.borderColor('transparent'),
    },
  },
});

const useIconCheckedStyles = makeStyles({
  // Appearance variations
  subtleOrTransparent: {
    color: `var(--ctrl-token-ToggleButton-195, var(--semantic-token-ToggleButton-196, ${tokens.colorNeutralForeground2BrandSelected}))`,
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
