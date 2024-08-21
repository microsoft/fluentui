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
    fontSize: `var(--2629, var(--2630, ${tokens.fontSizeBase400}))`,
    fontWeight: `var(--2631, var(--2632, ${tokens.fontWeightSemibold}))`,
    color: `var(--2633, var(--2634, ${tokens.colorNeutralForeground1}))`,
    lineHeight: `var(--2635, var(--2636, ${tokens.lineHeightBase400}))`,
    paddingBottom: `var(--2637, var(--2638, ${tokens.spacingVerticalS}))`,
    marginTop: `var(--2639, var(--2640, ${tokens.spacingHorizontalNone}))`,
    marginBottom: `var(--2641, var(--2642, ${tokens.spacingHorizontalNone}))`,
  },
  rootBrand: {
    color: `var(--2643, var(--2644, ${tokens.colorNeutralForegroundOnBrand}))`,
  },
  dismissButton: {
    position: 'relative',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    ...typographyStyles.body1,
    backgroundColor: `var(--2645, var(--2646, ${tokens.colorTransparentBackground}))`,
    boxSizing: 'border-box',
    borderTopRightRadius: `var(--2647, var(--2648, ${tokens.borderRadiusNone}))`,
    borderBottomRightRadius: `var(--2649, var(--2650, ${tokens.borderRadiusNone}))`,
    borderRightStyle: 'none',
    ...createCustomFocusIndicatorStyle({
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      borderRadius: `var(--2651, var(--2652, ${tokens.borderRadiusMedium}))`,
      ...shorthands.borderColor('transparent'),
    }),
    marginInlineStart: 'auto',
  },
  dismissBrand: {
    color: `var(--2653, var(--2654, ${tokens.colorNeutralForegroundOnBrand}))`,
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
