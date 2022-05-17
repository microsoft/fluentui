import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { cardPreviewClassNames } from '../CardPreview/index';
import type { CardSlots, CardState } from './Card.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @deprecated Use `cardClassNames.root` instead.
 */
export const cardClassName = 'fui-Card';
export const cardClassNames: SlotClassNames<CardSlots> = {
  root: 'fui-Card',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'block',
    position: 'relative',
    ...shorthands.overflow('hidden'),
    color: tokens.colorNeutralForeground1,

    // TODO: Extract this to separate stiles when tackling the `size` prop
    ...shorthands.borderRadius(tokens.borderRadiusMedium),

    '::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      content: '""',
      pointerEvents: 'none',

      ...shorthands.borderStyle('solid'),
      ...shorthands.borderWidth(tokens.strokeWidthThin),
      // TODO: Extract this to separate styles when tackling the `size` prop
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
    },

    [`> *:not(.${cardPreviewClassNames.root})`]: {
      // TODO: Extract this to separate styles when tackling the `size` prop
      ...shorthands.margin('12px'),
    },
  },

  interactiveNoOutline: {
    ':hover::after': {
      ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
    },
    ':active::after': {
      ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
    },
  },

  filledInteractive: {
    cursor: 'pointer',
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,

    '::after': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },

    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      boxShadow: tokens.shadow8,
    },
    ':active': {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
    },
  },
  filled: {
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,

    '::after': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },
  },
  filledAlternativeInteractive: {
    cursor: 'pointer',
    backgroundColor: tokens.colorNeutralBackground2,
    boxShadow: tokens.shadow4,

    '::after': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },

    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2Hover,
      boxShadow: tokens.shadow8,
    },
    ':active': {
      backgroundColor: tokens.colorNeutralBackground2Pressed,
    },
  },
  filledAlternative: {
    backgroundColor: tokens.colorNeutralBackground2,
    boxShadow: tokens.shadow4,

    '::after': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },
  },
  outlineInteractive: {
    cursor: 'pointer',
    backgroundColor: tokens.colorTransparentBackground,
    boxShadow: 'none',

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1),
    },

    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,

      '::after': {
        ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      },
    },
    ':active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,

      '::after': {
        ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      },
    },
  },
  outline: {
    backgroundColor: tokens.colorTransparentBackground,
    boxShadow: 'none',

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1),
    },
  },
  subtleInteractive: {
    cursor: 'pointer',
    backgroundColor: tokens.colorSubtleBackground,
    boxShadow: 'none',

    '::after': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },

    ':hover': {
      backgroundColor: tokens.colorSubtleBackgroundHover,
    },
    ':active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
    },
  },
  subtle: {
    backgroundColor: tokens.colorSubtleBackground,
    boxShadow: 'none',

    '::after': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },
  },
});

/**
 * Apply styling to the Card slots based on the state
 */
export const useCardStyles_unstable = (state: CardState): CardState => {
  const styles = useStyles();

  const interactive =
    state.root.onClick ||
    state.root.onMouseUp ||
    state.root.onMouseDown ||
    state.root.onPointerUp ||
    state.root.onPointerDown ||
    state.root.onTouchStart ||
    state.root.onTouchEnd;

  state.root.className = mergeClasses(
    cardClassNames.root,
    styles.root,
    state.appearance === 'filled' && styles.filled,
    state.appearance === 'filled-alternative' && styles.filledAlternative,
    state.appearance === 'outline' && styles.outline,
    state.appearance === 'subtle' && styles.subtle,
    interactive && state.appearance === 'filled' && styles.filledInteractive,
    interactive && state.appearance === 'filled-alternative' && styles.filledAlternativeInteractive,
    interactive && state.appearance === 'outline' && styles.outlineInteractive,
    interactive && state.appearance === 'subtle' && styles.subtleInteractive,
    interactive && state.appearance !== 'outline' && styles.interactiveNoOutline,
    state.root.className,
  );

  return state;
};
