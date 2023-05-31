import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DrawerInlineSlots, DrawerInlineState } from './DrawerInline.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useDrawerBaseStyles } from '../../util/useDrawerBaseStyles.styles';
import { tokens } from '@fluentui/react-theme';

export const drawerInlineClassNames: SlotClassNames<DrawerInlineSlots> = {
  root: 'fui-DrawerInline',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    position: 'relative',
  },

  /* Separator */
  separatorLeft: {
    ...shorthands.borderRight('1px', 'solid', tokens.colorNeutralBackground3),
  },
  separatorRight: {
    ...shorthands.borderLeft('1px', 'solid', tokens.colorNeutralBackground3),
  },
});

/**
 * Apply styling to the DrawerInline slots based on the state
 */
export const useDrawerInlineStyles_unstable = (state: DrawerInlineState): DrawerInlineState => {
  const baseStyles = useDrawerBaseStyles();
  const styles = useStyles();

  const separatorClass = React.useMemo(() => {
    if (!state.separator) {
      return undefined;
    }

    return state.position === 'left' ? styles.separatorLeft : styles.separatorRight;
  }, [state.position, state.separator, styles.separatorRight, styles.separatorLeft]);

  state.root.className = mergeClasses(
    drawerInlineClassNames.root,
    baseStyles.root,
    styles.root,
    state.size && baseStyles[state.size],
    state.position && baseStyles[state.position],
    separatorClass,
    state.root.className,
  );

  return state;
};
