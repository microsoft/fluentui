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
  separatorLeft: {
    ...shorthands.borderRight('1px', 'solid', tokens.colorNeutralBackground3),
  },
  separatorRight: {
    ...shorthands.borderLeft('1px', 'solid', tokens.colorNeutralBackground3),
  },
});

const useDrawerMotionStyles = makeStyles({
  root: {
    opacity: 0,
    transitionProperty: 'opacity, transform',
    willChange: 'opacity, transform',
  },

  /* Hidden */
  hiddenLeft: {
    transform: `translate3D(calc(var(${drawerCSSVars.drawerSizeVar}) * -1), 0, 0)`,
  },
  hiddenRight: {
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

    return state.position === 'left' ? rootStyles.separatorLeft : rootStyles.separatorRight;
  }, [state.position, state.separator, rootStyles.separatorRight, rootStyles.separatorLeft]);

  const motionClasses = React.useMemo(() => {
    return mergeClasses(
      rootMotionStyles.root,
      rootMotionStyles.root,
      state.size && durationStyles[state.size],
      !state.motion.isActive() && state.position === 'left'
        ? rootMotionStyles.hiddenLeft
        : rootMotionStyles.hiddenRight,
      state.motion.isActive() && rootMotionStyles.visible,
    );
  }, [
    durationStyles,
    rootMotionStyles.hiddenLeft,
    rootMotionStyles.hiddenRight,
    rootMotionStyles.root,
    rootMotionStyles.visible,
    state.motion,
    state.position,
    state.size,
  ]);

  state.root.className = mergeClasses(
    drawerInlineClassNames.root,
    useDrawerBaseClassNames(state, baseStyles),
    rootStyles.root,
    separatorClass,
    state.motion.hasInternalMotion && motionClasses,
    state.root.className,
  );

  return state;
};
