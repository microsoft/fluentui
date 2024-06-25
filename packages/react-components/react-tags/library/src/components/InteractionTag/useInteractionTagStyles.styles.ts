import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { InteractionTagSlots, InteractionTagState } from './InteractionTag.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const interactionTagClassNames: SlotClassNames<InteractionTagSlots> = {
  root: 'fui-InteractionTag',
};

const useRootBaseClassName = makeResetStyles({
  display: 'inline-flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  width: 'fit-content',
});

const useRootStyles = makeStyles({
  rounded: { borderRadius: tokens.borderRadiusMedium },
  circular: { borderRadius: tokens.borderRadiusCircular },

  medium: {
    height: '32px',
  },
  small: {
    height: '24px',
  },
  'extra-small': {
    height: '20px',
  },
});

/**
 * Apply styling to the InteractionTag slots based on the state
 */
export const useInteractionTagStyles_unstable = (state: InteractionTagState): InteractionTagState => {
  'use no memo';

  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles();

  const { shape, size } = state;

  state.root.className = mergeClasses(
    interactionTagClassNames.root,
    rootBaseClassName,
    rootStyles[shape],
    rootStyles[size],
    state.root.className,
  );

  return state;
};
