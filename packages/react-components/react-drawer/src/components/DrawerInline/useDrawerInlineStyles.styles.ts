import * as React from 'react';
import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

import type { DrawerInlineSlots, DrawerInlineState } from './DrawerInline.types';
import { drawerCSSVars, drawerDefaultStyles, useDrawerBaseClassNames } from '../../shared/useDrawerBaseStyles.styles';

export const drawerInlineClassNames: SlotClassNames<DrawerInlineSlots> = {
  root: 'fui-DrawerInline',
};

const useDrawerResetStyles = makeResetStyles({
  ...drawerDefaultStyles,
  position: 'relative',
  opacity: 0,
  transitionProperty: 'opacity, transform',
  willChange: 'opacity, transform',
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
  separatorBottom: {
    ...shorthands.borderTop(...separatorValues),
  },

  /* Positioning */
  start: {
    transform: `translate3D(calc(var(${drawerCSSVars.drawerSizeVar}) * -1), 0, 0)`,
  },
  end: {
    transform: `translate3D(var(${drawerCSSVars.drawerSizeVar}), 0, 0)`,
  },
  bottom: {
    transform: `translate3D(0, var(${drawerCSSVars.drawerSizeVar}), 0)`,
    width: '100%',
    height: `var(${drawerCSSVars.drawerSizeVar})`,
  },

  /* Visible */
  visible: {
    opacity: 1,
    transform: `translate3D(0, 0, 0)`,
  },
});

/**
 * Apply styling to the DrawerInline slots based on the state
 */
export const useDrawerInlineStyles_unstable = (state: DrawerInlineState): DrawerInlineState => {
  const resetStyles = useDrawerResetStyles();
  const baseClassNames = useDrawerBaseClassNames(state);
  const rootStyles = useDrawerRootStyles();

  const separatorClass = React.useMemo(() => {
    if (!state.separator) {
      return undefined;
    }

    switch (state.position) {
      case 'start':
        return rootStyles.separatorStart;

      case 'end':
        return rootStyles.separatorEnd;

      case 'bottom':
        return rootStyles.separatorBottom;

      default:
        return undefined;
    }
  }, [state.position, state.separator, rootStyles.separatorEnd, rootStyles.separatorStart, rootStyles.separatorBottom]);

  state.root.className = mergeClasses(
    drawerInlineClassNames.root,
    resetStyles,
    baseClassNames,
    separatorClass,
    rootStyles[state.position],
    state.motion.active && rootStyles.visible,
    state.root.className,
  );

  return state;
};
