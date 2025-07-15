import { makeResetStyles, mergeClasses } from '@griffel/react';
import { breadcrumbItemClassNames, type BreadcrumbItemState } from '@fluentui/react-breadcrumb';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

const useBreadcrumbItemResetStyles = makeResetStyles({
  display: 'flex',
  alignItems: 'center',
  color: semanticTokens.foregroundContentNeutralSecondary,
  boxSizing: 'border-box',
  textWrap: 'nowrap',
});

/**
 * Apply styling to the BreadcrumbItem slots based on the state
 */
export const useSemanticBreadcrumbItemStyles = (_state: unknown): BreadcrumbItemState => {
  'use no memo';

  const state = _state as BreadcrumbItemState;

  const resetStyles = useBreadcrumbItemResetStyles();

  state.root.className = mergeClasses(
    state.root.className,
    breadcrumbItemClassNames.root,
    resetStyles,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
