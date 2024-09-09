import { makeStyles, mergeClasses } from '@griffel/core';
import { useRenderer_unstable } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { FluentProviderSlots, FluentProviderState } from './FluentProvider.types';
import { SlotClassNames } from '@fluentui/react-utilities';

export const fluentProviderClassNames: SlotClassNames<FluentProviderSlots> = {
  root: 'fui-FluentProvider',
};

const useStyles = makeStyles({
  root: {
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    textAlign: 'left',
    ...typographyStyles.body1,
  },
});

/** Applies style classnames to slots */
export const useFluentProviderStyles_unstable = (state: FluentProviderState) => {
  'use no memo';

  const renderer = useRenderer_unstable();
  const styles = useStyles({ dir: state.dir, renderer });

  state.root.className = mergeClasses(
    fluentProviderClassNames.root,
    state.themeClassName,
    styles.root,
    state.root.className,
  );

  return state;
};
