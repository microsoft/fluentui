import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DrawerInlineSlots, DrawerInlineState } from './DrawerInline.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import {
  drawerCSSVars,
  getDrawerBaseClassNames,
  useDrawerBaseStyles,
  useDrawerDurationStyles,
} from '../../util/useDrawerBaseStyles.styles';
import { tokens } from '@fluentui/react-theme';

export const drawerInlineClassNames: SlotClassNames<DrawerInlineSlots> = {
  root: 'fui-DrawerInline',
};

/**
 * Styles for the root slot
 */
const useDrawerRootStyles = makeStyles({
  root: {
    position: 'relative',
    transform: 'translateZ(0)',
    transitionProperty: 'margin',
    willChange: 'margin',
  },

  /* Separator */
  separatorLeft: {
    ...shorthands.borderRight('1px', 'solid', tokens.colorNeutralBackground3),
  },
  separatorRight: {
    ...shorthands.borderLeft('1px', 'solid', tokens.colorNeutralBackground3),
  },

  /* Hidden */
  hiddenLeft: {
    marginLeft: `calc(var(${drawerCSSVars.drawerSizeVar}) * -1)`,
  },
  hiddenRight: {
    marginRight: `calc(var(${drawerCSSVars.drawerSizeVar}) * -1)`,
  },
});

/**
 * Apply styling to the DrawerInline slots based on the state
 */
export const useDrawerInlineStyles_unstable = (state: DrawerInlineState): DrawerInlineState => {
  const baseStyles = useDrawerBaseStyles();
  const durationStyles = useDrawerDurationStyles();
  const styles = useDrawerRootStyles();

  const separatorClass = React.useCallback(() => {
    if (!state.separator) {
      return undefined;
    }

    return state.position === 'left' ? styles.separatorLeft : styles.separatorRight;
  }, [state.position, state.separator, styles.separatorRight, styles.separatorLeft]);

  const hiddenClass = React.useCallback(() => {
    if (state.active) {
      return undefined;
    }

    return state.position === 'left' ? styles.hiddenLeft : styles.hiddenRight;
  }, [state.position, state.active, styles.hiddenLeft, styles.hiddenRight]);

  state.root.className = mergeClasses(
    drawerInlineClassNames.root,
    baseStyles.root,
    styles.root,
    getDrawerBaseClassNames(state, baseStyles),
    hiddenClass(),
    separatorClass(),
    state.size && durationStyles[state.size],
    state.root.className,
  );

  return state;
};
