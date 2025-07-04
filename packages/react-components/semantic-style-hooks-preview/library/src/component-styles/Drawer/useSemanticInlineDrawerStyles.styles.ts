import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

import {
  drawerCSSVars,
  drawerDefaultStyles,
  useSemanticDrawerBaseClassNames,
} from './useSemanticDrawerBaseStyles.styles';
import { inlineDrawerClassNames, type InlineDrawerState } from '@fluentui/react-drawer';

const useDrawerResetStyles = makeResetStyles({
  ...drawerDefaultStyles,
  position: 'relative',
});

/**
 * Styles for the root slot
 */
const borderValue = ` ${semanticTokens.strokeWidthDefault} solid ${semanticTokens.strokeFlyout}`;
const useDrawerRootStyles = makeStyles({
  /* Separator */
  separatorStart: { borderRight: borderValue },
  separatorEnd: { borderLeft: borderValue },
  separatorBottom: { borderTop: borderValue },

  /* Positioning */
  start: {},
  end: {},
  bottom: {
    width: '100%',
    height: `var(${drawerCSSVars.drawerSizeVar})`,
  },
});

function getSeparatorClass(state: InlineDrawerState, classNames: ReturnType<typeof useDrawerRootStyles>) {
  if (!state.separator) {
    return undefined;
  }

  switch (state.position) {
    case 'start':
      return classNames.separatorStart;

    case 'end':
      return classNames.separatorEnd;

    case 'bottom':
      return classNames.separatorBottom;

    default:
      return undefined;
  }
}

/**
 * Apply styling to the InlineDrawer slots based on the state
 */
export const useSemanticInlineDrawerStyles = (_state: unknown): InlineDrawerState => {
  'use no memo';

  const state = _state as InlineDrawerState;

  const resetStyles = useDrawerResetStyles();
  const baseClassNames = useSemanticDrawerBaseClassNames(state);
  const rootStyles = useDrawerRootStyles();

  state.root.className = mergeClasses(
    inlineDrawerClassNames.root,
    resetStyles,
    baseClassNames,
    getSeparatorClass(state, rootStyles),
    rootStyles[state.position],
    state.root.className,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
