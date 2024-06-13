import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { EmptySwatchSlots, EmptySwatchState } from './EmptySwatch.types';
import { tokens } from '@fluentui/react-theme';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';

export const emptySwatchClassNames: SlotClassNames<EmptySwatchSlots> = {
  root: 'fui-EmptySwatch',
};

/**
 * Styles for the root slot
 */
const useStyles = makeResetStyles({
  backgroundColor: `var(--ctrl-token-EmptySwatch-1871, var(--semantic-token-EmptySwatch-1872, ${tokens.colorTransparentBackground}))`,
  border: `1px dashed ${tokens.colorNeutralForeground4}`,
});

const useSizeStyles = makeStyles({
  'extra-small': {
    width: '20px',
    height: '20px',
  },
  small: {
    width: '24px',
    height: '24px',
  },
  medium: {
    width: '28px',
    height: '28px',
  },
  large: {
    width: '32px',
    height: '32px',
  },
});

const useShapeStyles = makeStyles({
  rounded: {
    borderRadius: `var(--ctrl-token-EmptySwatch-1873, var(--semantic-token-EmptySwatch-1874, ${tokens.borderRadiusMedium}))`,
    ...createCustomFocusIndicatorStyle({ borderRadius: `var(--ctrl-token-EmptySwatch-1875, var(--semantic-token-EmptySwatch-1876, ${tokens.borderRadiusMedium}))` }),
  },
  circular: {
    borderRadius: `var(--ctrl-token-EmptySwatch-1877, var(--semantic-token-EmptySwatch-1878, ${tokens.borderRadiusCircular}))`,
    ...createCustomFocusIndicatorStyle({ borderRadius: `var(--ctrl-token-EmptySwatch-1879, var(--semantic-token-EmptySwatch-1880, ${tokens.borderRadiusCircular}))` }),
  },
  square: {
    borderRadius: `var(--ctrl-token-EmptySwatch-1881, var(--semantic-token-EmptySwatch-1882, ${tokens.borderRadiusNone}))`,
    ...createCustomFocusIndicatorStyle({ borderRadius: `var(--ctrl-token-EmptySwatch-1883, var(--semantic-token-EmptySwatch-1884, ${tokens.borderRadiusNone}))` }),
  },
});

/**
 * Apply styling to the EmptySwatch slots based on the state
 */
export const useEmptySwatchStyles_unstable = (state: EmptySwatchState): EmptySwatchState => {
  'use no memo';

  const styles = useStyles();
  const sizeStyles = useSizeStyles();
  const shapeStyles = useShapeStyles();

  const size = state.size ?? 'medium';

  state.root.className = mergeClasses(
    emptySwatchClassNames.root,
    styles,
    sizeStyles[size],
    shapeStyles[state.shape ?? 'square'],
    state.root.className,
  );

  return state;
};
