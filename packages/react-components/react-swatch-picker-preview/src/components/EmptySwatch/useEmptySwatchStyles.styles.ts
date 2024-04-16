import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
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
  backgroundColor: tokens.colorTransparentBackground,
  border: `1px dashed ${tokens.colorNeutralForeground4}`,
});

const useSizeStyles = makeStyles({
  extraSmall: {
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
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
    }),
  },
  circular: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
    }),
  },
  square: {
    ...shorthands.borderRadius(tokens.borderRadiusNone),
    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderRadius(tokens.borderRadiusNone),
    }),
  },
});

/**
 * Apply styling to the EmptySwatch slots based on the state
 */
export const useEmptySwatchStyles_unstable = (state: EmptySwatchState): EmptySwatchState => {
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
