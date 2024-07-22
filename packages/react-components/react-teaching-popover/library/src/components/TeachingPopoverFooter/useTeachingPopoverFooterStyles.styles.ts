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
    gap: '8px',
    paddingTop: '12px',
  },
  rootVertical: {
    flexDirection: 'column',
  },
  rootHorizontal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonRootVertical: {
    width: 'auto',
    borderRadius: '4px',
  },
  buttonRootHorizontal: {
    minWidth: '96px',
    borderRadius: '4px',
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
  'use no memo';

  const styles = useStyles();
  const { appearance, footerLayout } = state;

  state.root.className = mergeClasses(
    teachingPopoverFooterClassNames.root,
    styles.root,
    footerLayout === 'horizontal' ? styles.rootHorizontal : styles.rootVertical,
    state.root.className,
  );
  if (state.secondary) {
    state.secondary.className = mergeClasses(
      teachingPopoverFooterClassNames.secondary,
      footerLayout === 'horizontal' ? styles.buttonRootHorizontal : styles.buttonRootVertical,
      appearance === 'brand' ? styles.brandSecondary : undefined,
      state.secondary.className,
    );
  }
  state.primary.className = mergeClasses(
    teachingPopoverFooterClassNames.primary,
    footerLayout === 'horizontal' ? styles.buttonRootHorizontal : styles.buttonRootVertical,
    appearance === 'brand' ? styles.brandPrimary : undefined,
    state.primary.className,
  );

  return state;
};
