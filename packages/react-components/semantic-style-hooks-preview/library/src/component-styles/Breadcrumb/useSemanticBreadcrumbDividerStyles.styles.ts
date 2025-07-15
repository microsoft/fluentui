import { makeStyles, makeResetStyles, mergeClasses } from '@griffel/react';
import { breadcrumbDividerClassNames, type BreadcrumbDividerState } from '@fluentui/react-breadcrumb';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  display: 'flex',
});

const useIconStyles = makeStyles({
  small: {
    fontSize: '12px',
  },
  medium: {
    fontSize: semanticTokens._ctrlBreadcrumbSizeSmIcon,
  },
  large: {
    fontSize: semanticTokens.sizeCtrlIcon,
  },
});

/**
 * Apply styling to the BreadcrumbDivider slots based on the state
 */
export const useSemanticBreadcrumbDividerStyles = (_state: unknown): BreadcrumbDividerState => {
  'use no memo';

  const state = _state as BreadcrumbDividerState;

  const styles = useStyles();
  const iconStyles = useIconStyles();
  const { size = 'medium' } = state;

  state.root.className = mergeClasses(
    state.root.className,
    breadcrumbDividerClassNames.root,
    styles,
    iconStyles[size],
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
