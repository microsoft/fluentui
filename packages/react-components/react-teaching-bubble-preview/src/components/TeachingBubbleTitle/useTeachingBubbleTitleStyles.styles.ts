import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TeachingBubbleTitleSlots, TeachingBubbleTitleState } from './TeachingBubbleTitle.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { useTeachingBubbleContext_unstable } from '../../teachingBubbleContext';

export const TeachingBubbleTitleClassNames: SlotClassNames<TeachingBubbleTitleSlots> = {
  root: 'fui-TeachingBubbleTitle',
  dismissButton: 'fui-TeachingBubbleTitle__dismiss',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: '16px',
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: '22px',
    paddingBottom: '8px',
  },
  rootBrand: {
    color: tokens.colorNeutralForegroundOnBrand,
  },
  dismissButton: {
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
});

/** Applies style classnames to slots */
export const useTeachingBubbleTitleStyles_unstable = (state: TeachingBubbleTitleState) => {
  const styles = useStyles();
  const appearance = useTeachingBubbleContext_unstable(context => context.appearance);

  state.root.className = mergeClasses(
    TeachingBubbleTitleClassNames.root,
    styles.root,
    appearance === 'brand' ? styles.rootBrand : undefined,
    state.root.className,
  );

  if (state.dismissButton) {
    state.dismissButton.className = mergeClasses(
      TeachingBubbleTitleClassNames.dismissButton,
      styles.dismissButton,
      appearance === 'brand' ? styles.dismissBrand : undefined,
      state.dismissButton.className,
    );
  }

  return state;
};
