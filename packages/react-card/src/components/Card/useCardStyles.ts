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

  scaleAutoWidth: {
    width: 'fit-content',
  },
  scaleAutoHeight: {
    height: 'fit-content',
  },
  scaleAuto: {
    width: 'fit-content',
    height: 'fit-content',
  },
  scaleFluidWidth: {
    width: '100%',
  },
  scaleFluidHeight: {
    height: '100%',
  },
  scaleFluid: {
    width: '100%',
    height: '100%',
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

  const appearanceStyles = {
    filled: styles.filled,
    'filled-alternative': styles.filledAlternative,
    outline: styles.outline,
    subtle: styles.subtle,
  };
  const interactiveAppearanceStyles = {
    filled: styles.filledInteractive,
    'filled-alternative': styles.filledAlternativeInteractive,
    outline: styles.outlineInteractive,
    subtle: styles.subtleInteractive,
  };

  const scaleStyles = {
    'auto-width': styles.scaleAutoWidth,
    'auto-height': styles.scaleAutoHeight,
    auto: styles.scaleAuto,
    'fluid-width': styles.scaleFluidWidth,
    'fluid-height': styles.scaleFluidHeight,
    fluid: styles.scaleFluid,
  };

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
    interactive ? interactiveAppearanceStyles[state.appearance] : appearanceStyles[state.appearance],
    state.scale && scaleStyles[state.scale],
    state.root.className,
  );

  return state;
};
