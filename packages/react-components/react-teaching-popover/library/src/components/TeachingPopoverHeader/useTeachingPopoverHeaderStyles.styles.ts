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
    color: `var(--ctrl-token-TeachingPopoverHeader-2583, var(--semantic-token-TeachingPopoverHeader-2584, ${tokens.colorNeutralForeground3}))`,
    fontWeight: `var(--ctrl-token-TeachingPopoverHeader-2585, var(--semantic-token-TeachingPopoverHeader-2586, ${tokens.fontWeightSemibold}))`,
    fontSize: `var(--ctrl-token-TeachingPopoverHeader-2587, var(--semantic-token-TeachingPopoverHeader-2588, ${tokens.fontSizeBase200}))`,
    lineHeight: `var(--ctrl-token-TeachingPopoverHeader-2589, var(--semantic-token-TeachingPopoverHeader-2590, ${tokens.lineHeightBase200}))`,
    paddingBottom: `var(--ctrl-token-TeachingPopoverHeader-2591, var(--semantic-token-TeachingPopoverHeader-2592, ${tokens.spacingVerticalXS}))`,
    alignItems: 'center',
    marginTop: `var(--ctrl-token-TeachingPopoverHeader-2593, var(--semantic-token-TeachingPopoverHeader-2594, ${tokens.spacingHorizontalNone}))`,
    marginBottom: `var(--ctrl-token-TeachingPopoverHeader-2595, var(--semantic-token-TeachingPopoverHeader-2596, ${tokens.spacingHorizontalNone}))`,
  },
  rootBrand: {
    color: `var(--ctrl-token-TeachingPopoverHeader-2597, var(--semantic-token-TeachingPopoverHeader-2598, ${tokens.colorNeutralForegroundOnBrand}))`,
  },
  dismissButton: {
    color: `var(--ctrl-token-TeachingPopoverHeader-2599, var(--semantic-token-TeachingPopoverHeader-2600, ${tokens.colorNeutralForeground2}))`,
    position: 'relative',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorTransparentStroke}`,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    ...typographyStyles.body1,
    backgroundColor: `var(--ctrl-token-TeachingPopoverHeader-2601, var(--semantic-token-TeachingPopoverHeader-2602, ${tokens.colorTransparentBackground}))`,
    boxSizing: 'border-box',
    borderTopRightRadius: `var(--ctrl-token-TeachingPopoverHeader-2603, var(--semantic-token-TeachingPopoverHeader-2604, ${tokens.borderRadiusNone}))`,
    borderBottomRightRadius: `var(--ctrl-token-TeachingPopoverHeader-2605, var(--semantic-token-TeachingPopoverHeader-2606, ${tokens.borderRadiusNone}))`,
    borderRightStyle: 'none',
    marginInlineStart: 'auto',
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXS}`,
    ...createCustomFocusIndicatorStyle({
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      borderRadius: `var(--ctrl-token-TeachingPopoverHeader-2607, var(--semantic-token-TeachingPopoverHeader-2608, ${tokens.borderRadiusMedium}))`,
      ...shorthands.borderColor('transparent'),
    }),
  },
  dismissBrand: {
    color: `var(--ctrl-token-TeachingPopoverHeader-2609, var(--semantic-token-TeachingPopoverHeader-2610, ${tokens.colorNeutralForegroundOnBrand}))`,
  },
  icon: {
    height: `var(--ctrl-token-TeachingPopoverHeader-2611, var(--semantic-token-TeachingPopoverHeader-2612, ${tokens.fontSizeBase200}))`,
    width: `var(--ctrl-token-TeachingPopoverHeader-2613, var(--semantic-token-TeachingPopoverHeader-2614, ${tokens.fontSizeBase200}))`,
    lineHeight: `var(--ctrl-token-TeachingPopoverHeader-2615, var(--semantic-token-TeachingPopoverHeader-2616, ${tokens.lineHeightBase200}))`,
    fontSize: `var(--ctrl-token-TeachingPopoverHeader-2617, var(--semantic-token-TeachingPopoverHeader-2618, ${tokens.fontSizeBase200}))`,
    alignItems: 'center',
    boxSizing: 'content-box',
    display: 'inline-flex',
    justifyContent: 'center',
    textDecorationLine: 'none',
    verticalAlign: 'middle',
    position: 'relative',
    backgroundColor: `var(--ctrl-token-TeachingPopoverHeader-2619, var(--semantic-token-TeachingPopoverHeader-2620, ${tokens.colorTransparentBackground}))`,
    color: `var(--ctrl-token-TeachingPopoverHeader-2621, var(--semantic-token-TeachingPopoverHeader-2622, ${tokens.colorNeutralForeground2}))`,
    marginInlineEnd: `var(--ctrl-token-TeachingPopoverHeader-2623, var(--semantic-token-TeachingPopoverHeader-2624, ${tokens.spacingHorizontalXS}))`,
  },
  iconBrand: {
    color: `var(--ctrl-token-TeachingPopoverHeader-2625, var(--semantic-token-TeachingPopoverHeader-2626, ${tokens.colorNeutralForegroundOnBrand}))`,
  },
});

/** Applies style classnames to slots */
export const useTeachingPopoverHeaderStyles_unstable = (state: TeachingPopoverHeaderState) => {
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
