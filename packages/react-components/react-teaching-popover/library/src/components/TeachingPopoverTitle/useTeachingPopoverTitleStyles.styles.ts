import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TeachingPopoverTitleSlots, TeachingPopoverTitleState } from './TeachingPopoverTitle.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const teachingPopoverTitleClassNames: SlotClassNames<TeachingPopoverTitleSlots> = {
  root: 'fui-TeachingPopoverTitle',
  dismissButton: 'fui-TeachingPopoverTitle__dismissButton',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase400,
    paddingBottom: tokens.spacingVerticalS,
    marginTop: tokens.spacingHorizontalNone,
    marginBottom: tokens.spacingHorizontalNone,
  },
  rootBrand: {
    color: tokens.colorNeutralForegroundOnBrand,
  },
  dismissButton: {
    position: 'relative',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    ...typographyStyles.body1,
    backgroundColor: tokens.colorTransparentBackground,
    boxSizing: 'border-box',
    borderTopRightRadius: tokens.borderRadiusNone,
    borderBottomRightRadius: tokens.borderRadiusNone,
    borderRightStyle: 'none',
    ...createCustomFocusIndicatorStyle({
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      borderRadius: tokens.borderRadiusMedium,
      ...shorthands.borderColor('transparent'),
    }),
    marginInlineStart: 'auto',
  },
  dismissBrand: {
    color: tokens.colorNeutralForegroundOnBrand,
  },
});

/** Applies style classnames to slots */
export const useTeachingPopoverTitleStyles_unstable = (state: TeachingPopoverTitleState) => {
  'use no memo';

  const styles = useStyles();
  const { appearance } = state;

  state.root.className = mergeClasses(
    teachingPopoverTitleClassNames.root,
    styles.root,
    appearance === 'brand' && styles.rootBrand,
    state.root.className,
  );

  if (state.dismissButton) {
    state.dismissButton.className = mergeClasses(
      teachingPopoverTitleClassNames.dismissButton,
      styles.dismissButton,
      appearance === 'brand' ? styles.dismissBrand : undefined,
      state.dismissButton.className,
    );
  }

  return state;
};
