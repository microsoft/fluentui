import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { type DialogSurfaceState } from '@fluentui/react-dialog';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

/**
 * Styles for the backdrop slot
 */
const useBackdropResetStyles = makeResetStyles({
  inset: '0px',
  position: 'fixed',
  backgroundColor: tokens.colorBackgroundOverlay,
});

const useBackdropStyles = makeStyles({
  nested: {
    backgroundColor: semanticTokens.nullColor,
  },
});

/**
 * Apply styling to the OverlayDrawerSurface slots based on the state
 */
export const useSemanticOverlayDrawerSurfaceStyles = (_state: unknown): DialogSurfaceState => {
  'use no memo';

  const state = _state as DialogSurfaceState;

  const backdropResetStyles = useBackdropResetStyles();
  const backdropStyles = useBackdropStyles();

  if (state.backdrop) {
    state.backdrop.className = mergeClasses(
      backdropResetStyles,
      state.isNestedDialog && backdropStyles.nested,
      state.backdrop.className,
      getSlotClassNameProp_unstable(state.backdrop),
    );
  }

  return state;
};
