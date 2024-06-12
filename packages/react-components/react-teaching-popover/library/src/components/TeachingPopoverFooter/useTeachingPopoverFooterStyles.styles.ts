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
    color: `var(--2571, var(--2572, ${tokens.colorBrandForeground1}))`,
    backgroundColor: `var(--2573, var(--2574, ${tokens.colorNeutralForegroundOnBrand}))`,
    ':hover': {
      color: `var(--2575, var(--2576, ${tokens.colorCompoundBrandForeground1Hover}))`,
      backgroundColor: `var(--2577, var(--2578, ${tokens.colorNeutralForegroundOnBrand}))`,
    },
    ':hover:active': {
      color: `var(--2579, var(--2580, ${tokens.colorCompoundBrandForeground1Pressed}))`,
      backgroundColor: `var(--2581, var(--2582, ${tokens.colorNeutralForegroundOnBrand}))`,
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
