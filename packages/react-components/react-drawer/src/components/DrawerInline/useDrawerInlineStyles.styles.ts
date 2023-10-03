import * as React from 'react';
import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

import type { DrawerInlineSlots, DrawerInlineState } from './DrawerInline.types';
import { drawerCSSVars, drawerDefaultStyles, useDrawerBaseClassNames } from '../../shared/useDrawerBaseStyles.styles';
import { useMotionClassNames } from '@fluentui/react-motion-preview';

export const drawerInlineClassNames: SlotClassNames<DrawerInlineSlots> = {
  root: 'fui-DrawerInline',
};

const useDrawerResetStyles = makeResetStyles({
  ...drawerDefaultStyles,
  position: 'relative',
});

/**
 * Styles for the root slot
 */
const separatorValues = ['1px', 'solid', tokens.colorNeutralBackground3] as const;
const useDrawerRootStyles = makeStyles({
  /* Separator */
  separatorStart: {
    ...shorthands.borderRight(...separatorValues),
  },
  separatorEnd: {
    ...shorthands.borderLeft(...separatorValues),
  },

  /* Positioning */
  start: {
    transform: `translate3D(calc(var(${drawerCSSVars.drawerSizeVar}) * -1), 0, 0)`,
  },
  end: {
    transform: `translate3D(var(${drawerCSSVars.drawerSizeVar}), 0, 0)`,
  },
});

const useDrawerMotionStyles = makeStyles({
  default: {
    opacity: 0,
    transitionProperty: 'opacity, transform',
    willChange: 'opacity, transform',
  },

  enter: {
    opacity: 1,
    transform: 'translate3D(0, 0, 0)',
  },
});

/**
 * Apply styling to the DrawerInline slots based on the state
 */
export const useDrawerInlineStyles_unstable = (state: DrawerInlineState): DrawerInlineState => {
  const resetStyles = useDrawerResetStyles();
  const baseClassNames = useDrawerBaseClassNames(state);
  const rootStyles = useDrawerRootStyles();
  const motionClassNames = useMotionClassNames(state.motion, useDrawerMotionStyles());

  const separatorClass = React.useMemo(() => {
    if (!state.separator) {
      return undefined;
    }

    return state.position === 'start' ? rootStyles.separatorStart : rootStyles.separatorEnd;
  }, [state.position, state.separator, rootStyles.separatorEnd, rootStyles.separatorStart]);

  state.root.className = mergeClasses(
    drawerInlineClassNames.root,
    resetStyles,
    baseClassNames,
    separatorClass,
    rootStyles[state.position],
    motionClassNames,
    state.root.className,
  );

  return state;
};
