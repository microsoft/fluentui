import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';
import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { toggleButtonClassNames } from '@fluentui/react-components';
import type { ToggleButtonState } from '@fluentui/react-components';
import { useCapButtonStyles } from './useCapButtonStyles';

const displayInline = { display: 'inline' } as const;
const displayNone = { display: 'none' } as const;

const useRootCheckedStyles = makeStyles({
  base: {
    [`:hover .${iconFilledClassName}`]: {
      color: tokens.colorCompoundBrandForeground1Hover,
    },
  },

  // Appearance variations
  secondary: {
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.borderColor(tokens.colorNeutralBackground3Hover),
    color: tokens.colorNeutralForeground1,
    [`& .${toggleButtonClassNames.icon}`]: {
      color: tokens.colorCompoundBrandForeground1Pressed,
    },
    ':hover': {
      color: tokens.colorCompoundBrandForeground1Hover,
    },
    ':hover:active': {
      color: tokens.colorCompoundBrandForeground1Pressed,
    },
  },
  outline: {
    ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
    color: tokens.colorNeutralForeground3Selected,
  },
  primary: {
    [`:hover .${iconFilledClassName}`]: {
      color: tokens.colorNeutralForegroundOnBrand,
    },
  },
  subtle: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
    color: tokens.colorNeutralForeground3Selected,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  transparent: {
    color: tokens.colorCompoundBrandForeground1Pressed,
  },
  tint: {
    backgroundColor: tokens.colorBrandBackground2Pressed,
    color: tokens.colorCompoundBrandForeground1Pressed,
    ...shorthands.borderColor(tokens.colorBrandStroke2Pressed),
    ...shorthands.borderWidth(tokens.strokeWidthThicker),
  },
  outlineColor: {
    backgroundColor: tokens.colorBrandBackground2Pressed,
    color: tokens.colorCompoundBrandForeground1Pressed,
    ...shorthands.borderColor(tokens.colorBrandStroke2Pressed),
    ...shorthands.borderWidth(tokens.strokeWidthThicker),
  },
});

const useRootCheckedDisabledStyles = makeStyles({
  base: {
    ':hover': {
      [`& .${iconFilledClassName}`]: displayInline,
      [`& .${iconRegularClassName}`]: displayNone,
    },
    ':hover:active': {
      [`& .${iconFilledClassName}`]: displayInline,
      [`& .${iconRegularClassName}`]: displayNone,
    },
    [`:hover .${iconFilledClassName}`]: {
      color: tokens.colorNeutralForegroundDisabled,
    },
    [`:hover:active .${iconFilledClassName}`]: {
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
  tint: {
    ...shorthands.borderWidth(tokens.strokeWidthThicker),
  },
  outlineColor: {
    ...shorthands.borderWidth(tokens.strokeWidthThicker),
  },
});

const useIconCheckedStyles = makeStyles({
  outline: {
    color: tokens.colorCompoundBrandForeground1Pressed,
  },
});

type AppearanceKey = 'outline' | 'primary' | 'secondary' | 'subtle' | 'transparent' | 'tint' | 'outlineColor';

export const useCapToggleButtonStyles = (state: ToggleButtonState): void => {
  const rootCheckedStyles = useRootCheckedStyles();
  const rootCheckedDisabledStyles = useRootCheckedDisabledStyles();
  const iconCheckedStyles = useIconCheckedStyles();

  const { appearance, checked, disabled, disabledFocusable } = state;

  // Apply base CAP button styles first
  useCapButtonStyles(state);

  // Then layer on toggle-specific checked styles
  state.root.className = mergeClasses(
    state.root.className,

    // Checked styles
    checked && rootCheckedStyles.base,
    appearance && checked && rootCheckedStyles[appearance as AppearanceKey],

    // Checked + disabled styles
    checked && (disabled || disabledFocusable) && rootCheckedDisabledStyles.base,
    appearance &&
      checked &&
      (disabled || disabledFocusable) &&
      (appearance === 'tint' || appearance === 'outlineColor') &&
      rootCheckedDisabledStyles[appearance],
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      checked && appearance === 'outline' && iconCheckedStyles.outline,
    );
  }
};
