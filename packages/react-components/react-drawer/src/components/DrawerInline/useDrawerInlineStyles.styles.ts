import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

import type { DrawerInlineSlots, DrawerInlineState } from './DrawerInline.types';
import { drawerCSSVars, useDrawerBaseClassNames } from '../../util/useDrawerBaseStyles.styles';

export const drawerInlineClassNames: SlotClassNames<DrawerInlineSlots> = {
  root: 'fui-DrawerInline',
};

/**
 * Styles for the root slot
 */
const separatorValues = ['1px', 'solid', tokens.colorNeutralBackground3] as const;
const useDrawerRootStyles = makeStyles({
  root: {
    position: 'relative',
    opacity: 0,
    transitionProperty: 'opacity, transform',
    willChange: 'opacity, transform',
  },

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
  const baseClassNames = useDrawerBaseClassNames(state);
  const rootStyles = useDrawerRootStyles();

  const separatorClass = React.useMemo(() => {
    if (!state.separator) {
      return undefined;
    }

    return state.position === 'start' ? rootStyles.separatorStart : rootStyles.separatorEnd;
  }, [state.position, state.separator, rootStyles.separatorEnd, rootStyles.separatorStart]);

  state.root.className = mergeClasses(
    drawerInlineClassNames.root,
    baseClassNames,
    rootStyles.root,
    separatorClass,
    rootStyles[state.position],
    state.motion.active && rootStyles.visible,
    state.root.className,
  );

  return state;
};
