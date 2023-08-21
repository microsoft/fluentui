import * as React from 'react';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DrawerInlineSlots, DrawerInlineState } from './DrawerInline.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import {
  drawerCSSVars,
  useDrawerBaseClassNames,
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
  },

  /* Separator */
  separatorStart: {
    ...shorthands.borderRight('1px', 'solid', tokens.colorNeutralBackground3),
  },
  separatorEnd: {
    ...shorthands.borderLeft('1px', 'solid', tokens.colorNeutralBackground3),
  },
});

const useDrawerMotionStyles = makeStyles({
  root: {
    opacity: 0,
    transitionProperty: 'opacity, transform',
    willChange: 'opacity, transform',
  },
  start: {
    transform: `translate3D(calc(var(${drawerCSSVars.drawerSizeVar}) * -1), 0, 0)`,
  },
  end: {
    transform: `translate3D(calc(var(${drawerCSSVars.drawerSizeVar})), 0, 0)`,
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
  const baseStyles = useDrawerBaseStyles();
  const durationStyles = useDrawerDurationStyles();
  const rootStyles = useDrawerRootStyles();
  const rootMotionStyles = useDrawerMotionStyles();

  const separatorClass = React.useMemo(() => {
    if (!state.separator) {
      return undefined;
    }

    return state.position === 'start' ? rootStyles.separatorStart : rootStyles.separatorEnd;
  }, [state.position, state.separator, rootStyles.separatorEnd, rootStyles.separatorStart]);

  const motionClasses = React.useMemo(() => {
    if (!state.motion.hasInternalMotion) {
      return;
    }

    return mergeClasses(
      rootMotionStyles.root,
      state.size && durationStyles[state.size],
      state.position && !state.motion.isActive() && rootMotionStyles[state.position],
      state.motion.isActive() && rootMotionStyles.visible,
    );
  }, [durationStyles, rootMotionStyles, state.motion, state.position, state.size]);

  state.root.className = mergeClasses(
    drawerInlineClassNames.root,
    useDrawerBaseClassNames(state, baseStyles),
    rootStyles.root,
    separatorClass,
    motionClasses,
    state.root.className,
  );

  return state;
};
