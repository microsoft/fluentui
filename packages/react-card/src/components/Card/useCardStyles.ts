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
    ...shorthands.overflow('hidden'),

    color: tokens.colorNeutralForeground1,
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderWidth(tokens.strokeWidthThin),

    // Size: medium
    ...shorthands.borderRadius(tokens.borderRadiusMedium),

    [`> *:not(.${cardPreviewClassNames.root})`]: {
      // Size: medium
      ...shorthands.margin('12px'),
    },
  },

  filledInteractive: {
    cursor: 'pointer',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    boxShadow: tokens.shadow4,

    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
      boxShadow: tokens.shadow8,
    },
    ':active': {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
    },
  },
  filled: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    boxShadow: tokens.shadow4,
  },
  filledAlternativeInteractive: {
    cursor: 'pointer',
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    boxShadow: tokens.shadow4,

    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2Hover,
      ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
      boxShadow: tokens.shadow8,
    },
    ':active': {
      backgroundColor: tokens.colorNeutralBackground2Pressed,
      ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
    },
  },
  filledAlternative: {
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    boxShadow: tokens.shadow4,
  },
  outlineInteractive: {
    cursor: 'pointer',
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    boxShadow: 'none',

    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
    },
    ':active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
    },
  },
  outline: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    boxShadow: 'none',
  },
  subtleInteractive: {
    cursor: 'pointer',
    backgroundColor: tokens.colorSubtleBackground,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    boxShadow: 'none',

    ':hover': {
      backgroundColor: tokens.colorSubtleBackgroundHover,
    },
    ':active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
    },
  },
  subtle: {
    backgroundColor: tokens.colorSubtleBackground,
    ...shorthands.borderColor(tokens.colorTransparentStroke),
    boxShadow: 'none',
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
    state.root.className,
  );

  return state;
};
