import { makeStyles, mergeClasses } from '@griffel/core';
import { useRenderer_unstable } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { FluentProviderSlots, FluentProviderState } from './FluentProvider.types';
import { SlotClassNames } from '@fluentui/react-utilities';

export const fluentProviderClassNames: SlotClassNames<FluentProviderSlots> = {
  root: 'fui-FluentProvider',
};

const reducedAnimationsStyles = {
  animationDelay: '-1ms !important',
  animationDuration: '-1ms !important',
  animationIterationCount: '-1ms !important',
  scrollBehavior: 'auto !important' as 'auto',
  transitionDuration: '0.1s !important',
  transitionDelay: '0.1s !important',
};

const disabledAnimationsStyles = {
  animationDelay: '-1ms !important',
  animationDuration: '-1ms !important',
  animationIterationCount: '-1ms !important',
  scrollBehavior: 'auto !important' as 'auto',
  transitionDuration: '0s !important',
  transitionDelay: '0s !important',
};

const useStyles = makeStyles({
  root: {
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    textAlign: 'left',
    ...typographyStyles.body1,
  },

  reducedAnimations: {
    '& *': reducedAnimationsStyles,

    '& *::before': reducedAnimationsStyles,

    '& *::after': reducedAnimationsStyles,
  },

  disabledAnimations: {
    '& *': disabledAnimationsStyles,

    '& *::before': disabledAnimationsStyles,

    '& *::after': disabledAnimationsStyles,
  },
});

/** Applies style classnames to slots */
export const useFluentProviderStyles_unstable = (state: FluentProviderState) => {
  const renderer = useRenderer_unstable();
  const styles = useStyles({ dir: state.dir, renderer });

  state.root.className = mergeClasses(
    fluentProviderClassNames.root,
    state.themeClassName,
    styles.root,
    state.root.className,
    state.animations === 'disabled' && styles.disabledAnimations,
    state.animations === 'reduced' && styles.reducedAnimations,
  );

  return state;
};
