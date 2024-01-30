import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { TeachingPopoverFooterSlots, TeachingPopoverFooterState } from './TeachingPopoverFooter.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const teachingPopoverFooterClassNames: SlotClassNames<TeachingPopoverFooterSlots> = {
  root: 'fui-TeachingPopoverFooter',
  primary: 'fui-TeachingPopoverFooter__primary',
  secondary: 'fui-TeachingPopoverFooter__secondary',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    ...shorthands.borderRadius('4px'),
    ...shorthands.gap('8px'),
    paddingTop: '12px',
    justifyContent: 'flex-end',
  },
  buttonRoot: {
    minWidth: '96px',
  },
  brandSecondary: {
    ...shorthands.borderColor(tokens.colorNeutralForegroundOnBrand),
  },
  brandPrimary: {
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorNeutralForegroundOnBrand,
    ':hover': {
      color: tokens.colorCompoundBrandForeground1Hover,
      backgroundColor: tokens.colorNeutralForegroundOnBrand,
    },
    ':hover:active': {
      color: tokens.colorCompoundBrandForeground1Pressed,
      backgroundColor: tokens.colorNeutralForegroundOnBrand,
    },
  },
});

/** Applies style classnames to slots */
export const useTeachingPopoverFooterStyles_unstable = (state: TeachingPopoverFooterState) => {
  const styles = useStyles();
  const { appearance } = state;

  state.root.className = mergeClasses(teachingPopoverFooterClassNames.root, styles.root, state.root.className);
  if (state.secondary) {
    state.secondary.className = mergeClasses(
      teachingPopoverFooterClassNames.secondary,
      styles.buttonRoot,
      appearance === 'brand' ? styles.brandSecondary : undefined,
      state.secondary.className,
    );
  }
  state.primary.className = mergeClasses(
    teachingPopoverFooterClassNames.primary,
    styles.buttonRoot,
    appearance === 'brand' ? styles.brandPrimary : undefined,
    state.primary.className,
  );

  return state;
};
