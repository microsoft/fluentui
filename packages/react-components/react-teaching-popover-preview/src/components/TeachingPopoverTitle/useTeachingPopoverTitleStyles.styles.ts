import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TeachingPopoverTitleSlots, TeachingPopoverTitleState } from './TeachingPopoverTitle.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { useTeachingPopoverContext_unstable } from '../../TeachingPopoverContext';

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
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorTransparentStroke),
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
      borderTopRightRadius: tokens.borderRadiusNone,
      borderBottomRightRadius: tokens.borderRadiusNone,
    }),
    marginInlineStart: 'auto',
  },
  dismissBrand: {
    color: tokens.colorNeutralForegroundOnBrand,
  },
});

/** Applies style classnames to slots */
export const useTeachingPopoverTitleStyles_unstable = (state: TeachingPopoverTitleState) => {
  const styles = useStyles();
  const appearance = useTeachingPopoverContext_unstable(context => context.appearance);

  state.root.className = mergeClasses(
    teachingPopoverTitleClassNames.root,
    styles.root,
    appearance === 'brand' && styles.rootBrand,
    state.root.className,
  );

  if (state.showDismiss && state.dismissButton) {
    state.dismissButton.className = mergeClasses(
      teachingPopoverTitleClassNames.dismissButton,
      styles.dismissButton,
      appearance === 'brand' ? styles.dismissBrand : undefined,
      state.dismissButton.className,
    );
  }

  return state;
};
