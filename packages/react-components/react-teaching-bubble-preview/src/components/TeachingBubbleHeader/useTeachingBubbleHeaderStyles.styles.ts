import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { TeachingBubbleHeaderSlots, TeachingBubbleHeaderState } from './TeachingBubbleHeader.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useTeachingBubbleContext_unstable } from '../../teachingBubbleContext';

export const TeachingBubbleHeaderClassNames: SlotClassNames<TeachingBubbleHeaderSlots> = {
  root: 'fui-TeachingBubbleHeader',
  dismissButton: 'fui-TeachingBubbleHeader__dismissButton',
  icon: 'fui-TeachingBubbleHeader__icon',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    color: tokens.colorNeutralForeground3,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: '12px',
    lineHeight: '16px',
    paddingBottom: '6px',
    alignItems: 'center',
  },
  rootBrand: {
    color: tokens.colorNeutralForegroundOnBrand,
  },
  dismissButton: {
    color: tokens.colorNeutralForeground2,
    position: 'relative',
    ...shorthands.border('1px', 'solid', 'transparent'),
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    ...typographyStyles.body1,
    backgroundColor: 'transparent',
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
  icon: {
    height: '16px',
    width: 'auto',
    lineHeight: tokens.lineHeightBase500,
    fontSize: tokens.fontSizeBase500,
    alignItems: 'center',
    boxSizing: 'content-box',
    display: 'inline-flex',
    justifyContent: 'center',
    textDecorationLine: 'none',
    verticalAlign: 'middle',
    position: 'relative',
    backgroundColor: tokens.colorTransparentBackground,
    color: tokens.colorNeutralForeground2,
    paddingRight: tokens.spacingHorizontalXS,
    marginTop: '4px',
  },
  iconBrand: {
    color: tokens.colorNeutralForegroundOnBrand,
  },
});

/** Applies style classnames to slots */
export const useTeachingBubbleHeaderStyles_unstable = (state: TeachingBubbleHeaderState) => {
  const styles = useStyles();
  const appearance = useTeachingBubbleContext_unstable(context => context.appearance);

  state.root.className = mergeClasses(
    TeachingBubbleHeaderClassNames.root,
    styles.root,
    appearance === 'brand' ? styles.rootBrand : undefined,
    state.root.className,
  );

  if (state.dismissButton) {
    state.dismissButton.className = mergeClasses(
      TeachingBubbleHeaderClassNames.dismissButton,
      styles.dismissButton,
      appearance === 'brand' ? styles.dismissBrand : undefined,
      state.dismissButton.className,
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(
      TeachingBubbleHeaderClassNames.icon,
      styles.icon,
      appearance === 'brand' ? styles.iconBrand : undefined,
      state.icon.className,
    );
  }
  return state;
};
