import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

import type { InlineDrawerSlots, InlineDrawerState } from './InlineDrawer.types';
import { drawerCSSVars, drawerDefaultStyles, useDrawerBaseClassNames } from '../../shared/useDrawerBaseStyles.styles';

export const inlineDrawerClassNames: SlotClassNames<Omit<InlineDrawerSlots, 'surfaceMotion'>> = {
  root: 'fui-InlineDrawer',
};

const useDrawerResetStyles = makeResetStyles({
  ...drawerDefaultStyles,
  position: 'relative',
});

/**
 * Styles for the root slot
 */
const borderValue = `1px solid ${tokens.colorNeutralBackground3}`;
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
export const useInlineDrawerStyles_unstable = (state: InlineDrawerState): InlineDrawerState => {
  'use no memo';

  const resetStyles = useDrawerResetStyles();
  const baseClassNames = useDrawerBaseClassNames(state);
  const rootStyles = useDrawerRootStyles();

  state.root.className = mergeClasses(
    inlineDrawerClassNames.root,
    resetStyles,
    baseClassNames,
    getSeparatorClass(state, rootStyles),
    rootStyles[state.position],
    state.root.className,
  );

  return state;
};
