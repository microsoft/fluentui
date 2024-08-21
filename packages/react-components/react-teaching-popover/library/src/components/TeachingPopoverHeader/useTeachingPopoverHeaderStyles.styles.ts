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
    color: `var(--2583, var(--2584, ${tokens.colorNeutralForeground3}))`,
    fontWeight: `var(--2585, var(--2586, ${tokens.fontWeightSemibold}))`,
    fontSize: `var(--2587, var(--2588, ${tokens.fontSizeBase200}))`,
    lineHeight: `var(--2589, var(--2590, ${tokens.lineHeightBase200}))`,
    paddingBottom: `var(--2591, var(--2592, ${tokens.spacingVerticalXS}))`,
    alignItems: 'center',
    marginTop: `var(--2593, var(--2594, ${tokens.spacingHorizontalNone}))`,
    marginBottom: `var(--2595, var(--2596, ${tokens.spacingHorizontalNone}))`,
  },
  rootBrand: {
    color: `var(--2597, var(--2598, ${tokens.colorNeutralForegroundOnBrand}))`,
  },
  dismissButton: {
    color: `var(--2599, var(--2600, ${tokens.colorNeutralForeground2}))`,
    position: 'relative',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    ...typographyStyles.body1,
    backgroundColor: `var(--2601, var(--2602, ${tokens.colorTransparentBackground}))`,
    boxSizing: 'border-box',
    borderTopRightRadius: `var(--2603, var(--2604, ${tokens.borderRadiusNone}))`,
    borderBottomRightRadius: `var(--2605, var(--2606, ${tokens.borderRadiusNone}))`,
    borderRightStyle: 'none',
    marginInlineStart: 'auto',
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS}`,
    ...createCustomFocusIndicatorStyle({
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      borderRadius: `var(--2607, var(--2608, ${tokens.borderRadiusMedium}))`,
      ...shorthands.borderColor('transparent'),
    }),
  },
  dismissBrand: {
    color: `var(--2609, var(--2610, ${tokens.colorNeutralForegroundOnBrand}))`,
  },
  icon: {
    height: `var(--2611, var(--2612, ${tokens.fontSizeBase200}))`,
    width: `var(--2613, var(--2614, ${tokens.fontSizeBase200}))`,
    lineHeight: `var(--2615, var(--2616, ${tokens.lineHeightBase200}))`,
    fontSize: `var(--2617, var(--2618, ${tokens.fontSizeBase200}))`,
    alignItems: 'center',
    boxSizing: 'content-box',
    display: 'inline-flex',
    justifyContent: 'center',
    textDecorationLine: 'none',
    verticalAlign: 'middle',
    position: 'relative',
    backgroundColor: `var(--2619, var(--2620, ${tokens.colorTransparentBackground}))`,
    color: `var(--2621, var(--2622, ${tokens.colorNeutralForeground2}))`,
    marginInlineEnd: `var(--2623, var(--2624, ${tokens.spacingHorizontalXS}))`,
  },
  iconBrand: {
    color: `var(--2625, var(--2626, ${tokens.colorNeutralForegroundOnBrand}))`,
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
