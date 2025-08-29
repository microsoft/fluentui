import { makeResetStyles, mergeClasses } from '@griffel/react';
import { breadcrumbClassNames, type BreadcrumbState } from '@fluentui/react-breadcrumb';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useListClassName = makeResetStyles({
  listStyleType: 'none',
  display: 'flex',
  alignItems: 'center',
  margin: 0,
  padding: 0,
});

/**
 * Apply styling to the Breadcrumb slots based on the state
 */
export const useSemanticBreadcrumbStyles = (_state: unknown): BreadcrumbState => {
  'use no memo';

  const state = _state as BreadcrumbState;

  const listBaseClassName = useListClassName();
  state.root.className = mergeClasses(
    state.root.className,
    breadcrumbClassNames.root,
    getSlotClassNameProp_unstable(state.root),
  );
  if (state.list) {
    state.list.className = mergeClasses(
      state.list.className,
      listBaseClassName,
      breadcrumbClassNames.list,
      getSlotClassNameProp_unstable(state.list),
    );
  }
  return state;
};
