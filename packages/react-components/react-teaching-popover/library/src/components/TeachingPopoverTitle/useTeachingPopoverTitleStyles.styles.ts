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
    fontSize: `var(--ctrl-token-TeachingPopoverTitle-2629, var(--semantic-token-TeachingPopoverTitle-2630, ${tokens.fontSizeBase400}))`,
    fontWeight: `var(--ctrl-token-TeachingPopoverTitle-2631, var(--semantic-token-TeachingPopoverTitle-2632, ${tokens.fontWeightSemibold}))`,
    color: `var(--ctrl-token-TeachingPopoverTitle-2633, var(--semantic-token-TeachingPopoverTitle-2634, ${tokens.colorNeutralForeground1}))`,
    lineHeight: `var(--ctrl-token-TeachingPopoverTitle-2635, var(--semantic-token-TeachingPopoverTitle-2636, ${tokens.lineHeightBase400}))`,
    paddingBottom: `var(--ctrl-token-TeachingPopoverTitle-2637, var(--semantic-token-TeachingPopoverTitle-2638, ${tokens.spacingVerticalS}))`,
    marginTop: `var(--ctrl-token-TeachingPopoverTitle-2639, var(--semantic-token-TeachingPopoverTitle-2640, ${tokens.spacingHorizontalNone}))`,
    marginBottom: `var(--ctrl-token-TeachingPopoverTitle-2641, var(--semantic-token-TeachingPopoverTitle-2642, ${tokens.spacingHorizontalNone}))`,
  },
  rootBrand: {
    color: `var(--ctrl-token-TeachingPopoverTitle-2643, var(--semantic-token-TeachingPopoverTitle-2644, ${tokens.colorNeutralForegroundOnBrand}))`,
  },
  dismissButton: {
    position: 'relative',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    ...typographyStyles.body1,
    backgroundColor: `var(--ctrl-token-TeachingPopoverTitle-2645, var(--semantic-token-TeachingPopoverTitle-2646, ${tokens.colorTransparentBackground}))`,
    boxSizing: 'border-box',
    borderTopRightRadius: `var(--ctrl-token-TeachingPopoverTitle-2647, var(--semantic-token-TeachingPopoverTitle-2648, ${tokens.borderRadiusNone}))`,
    borderBottomRightRadius: `var(--ctrl-token-TeachingPopoverTitle-2649, var(--semantic-token-TeachingPopoverTitle-2650, ${tokens.borderRadiusNone}))`,
    borderRightStyle: 'none',
    ...createCustomFocusIndicatorStyle({
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      borderRadius: `var(--ctrl-token-TeachingPopoverTitle-2651, var(--semantic-token-TeachingPopoverTitle-2652, ${tokens.borderRadiusMedium}))`,
      ...shorthands.borderColor('transparent'),
    }),
    marginInlineStart: 'auto',
  },
  dismissBrand: {
    color: `var(--ctrl-token-TeachingPopoverTitle-2653, var(--semantic-token-TeachingPopoverTitle-2654, ${tokens.colorNeutralForegroundOnBrand}))`,
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
