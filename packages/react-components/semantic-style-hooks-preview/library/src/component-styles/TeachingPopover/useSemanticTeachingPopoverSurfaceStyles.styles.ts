import { makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { teachingPopoverSurfaceClassNames, type TeachingPopoverSurfaceState } from '@fluentui/react-teaching-popover';
import { useSemanticPopoverSurfaceStyles } from '../Popover';
import * as semanticTokens from '@fluentui/semantic-tokens';

const useStyles = makeStyles({
  root: {
    padding: `${semanticTokens.paddingCtrlLgHorizontalDefault} ${semanticTokens.paddingCtrlLgHorizontalDefault}`,
    borderRadius: semanticTokens._ctrlTeachingPopoverSurfaceCorner,
    minWidth: '320px',
    boxSizing: 'border-box',
  },
});

/**
 * Apply styling to the TeachingPopoverSurface slots based on the state
 */
export const useSemanticTeachingPopoverSurfaceStyles = (_state: unknown): TeachingPopoverSurfaceState => {
  'use no memo';

  const state = _state as TeachingPopoverSurfaceState;

  const styles = useStyles();

  // Make sure to merge teaching bubble surface prior to popover styles
  state.root.className = mergeClasses(
    state.root.className,
    teachingPopoverSurfaceClassNames.root,
    styles.root,
    getSlotClassNameProp_unstable(state.root),
  );

  const updatedState = useSemanticPopoverSurfaceStyles(state);

  return updatedState;
};
