import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { TeachingPopoverHeaderSlots, TeachingPopoverHeaderState } from './TeachingPopoverHeader.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const teachingPopoverHeaderClassNames: SlotClassNames<TeachingPopoverHeaderSlots> = {
  root: 'fui-TeachingPopoverHeader',
  dismissButton: 'fui-TeachingPopoverHeader__dismissButton',
  icon: 'fui-TeachingPopoverHeader__icon',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    color: tokens.colorNeutralForeground3,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    paddingBottom: tokens.spacingVerticalXS,
    alignItems: 'center',
    marginTop: tokens.spacingHorizontalNone,
    marginBottom: tokens.spacingHorizontalNone,
  },
  rootBrand: {
    color: tokens.colorNeutralForegroundOnBrand,
  },
  dismissButton: {
    color: tokens.colorNeutralForeground2,
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
    marginInlineStart: 'auto',
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS}`,
    ...createCustomFocusIndicatorStyle({
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      borderRadius: tokens.borderRadiusMedium,
      ...shorthands.borderColor('transparent'),
    }),
  },
  dismissBrand: {
    color: tokens.colorNeutralForegroundOnBrand,
  },
  icon: {
    height: tokens.fontSizeBase200,
    width: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    fontSize: tokens.fontSizeBase200,
    alignItems: 'center',
    boxSizing: 'content-box',
    display: 'inline-flex',
    justifyContent: 'center',
    textDecorationLine: 'none',
    verticalAlign: 'middle',
    position: 'relative',
    backgroundColor: tokens.colorTransparentBackground,
    color: tokens.colorNeutralForeground2,
    marginInlineEnd: tokens.spacingHorizontalXS,
  },
  iconBrand: {
    color: tokens.colorNeutralForegroundOnBrand,
  },
});

/** Applies style classnames to slots */
export const useTeachingPopoverHeaderStyles_unstable = (state: TeachingPopoverHeaderState) => {
  'use no memo';

  const styles = useStyles();
  const { appearance } = state;

  state.root.className = mergeClasses(
    teachingPopoverHeaderClassNames.root,
    styles.root,
    appearance === 'brand' && styles.rootBrand,
    state.root.className,
  );

  if (state.dismissButton) {
    state.dismissButton.className = mergeClasses(
      teachingPopoverHeaderClassNames.dismissButton,
      styles.dismissButton,
      appearance === 'brand' ? styles.dismissBrand : undefined,
      state.dismissButton.className,
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(
      teachingPopoverHeaderClassNames.icon,
      styles.icon,
      appearance === 'brand' ? styles.iconBrand : undefined,
      state.icon.className,
    );
  }
  return state;
};
