import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { cardPreviewClassNames } from '../CardPreview/useCardPreviewStyles';
import { cardHeaderClassNames } from '../CardHeader/useCardHeaderStyles';
import { cardFooterClassNames } from '../CardFooter/useCardFooterStyles';
import type { CardSlots, CardState } from './Card.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';

/**
 * Static CSS class names used internally for the component slots.
 */
export const cardClassNames: SlotClassNames<CardSlots> = {
  root: 'fui-Card',
};

/**
 * CSS variable names used internally for uniform styling in Card.
 */
export const cardCSSVars = {
  cardSizeVar: '--fui-Card--size',
  cardBorderRadiusVar: '--fui-Card--border-radius',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    position: 'relative',
    ...shorthands.overflow('hidden'),
    color: tokens.colorNeutralForeground1,

    // Border setting using after pseudo element to allow CardPreview to render behind it.
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
      ...shorthands.borderRadius(`var(${cardCSSVars.cardBorderRadiusVar})`),
    },

    ...shorthands.borderRadius(`var(${cardCSSVars.cardBorderRadiusVar})`),
    ...shorthands.padding(`var(${cardCSSVars.cardSizeVar})`),
    ...shorthands.gap(`var(${cardCSSVars.cardSizeVar})`),

    // Prevents CardHeader and CardFooter from shrinking.
    [`> .${cardHeaderClassNames.root}, > .${cardFooterClassNames.root}`]: {
      flexShrink: 0,
    },
    // Allows non-card components to grow to fill the available space.
    [`> :not(.${cardPreviewClassNames.root}):not(.${cardHeaderClassNames.root}):not(.${cardFooterClassNames.root})`]: {
      flexGrow: 1,
    },

    ...createFocusOutlineStyle({
      style: {
        outlineRadius: `var(${cardCSSVars.cardBorderRadiusVar})`,
        outlineWidth: tokens.strokeWidthThick,
      },
      selector: 'focus',
    }),
  },

  orientationHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',

    // Remove vertical padding to keep CardPreview content flush with Card's borders.
    [`> .${cardPreviewClassNames.root}`]: {
      marginTop: `calc(var(${cardCSSVars.cardSizeVar}) * -1)`,
      marginBottom: `calc(var(${cardCSSVars.cardSizeVar}) * -1)`,
    },
    // Due to Tabster's "Groupper" focus functionality, hidden elements are injected before and after Card's content.
    // As such, the code below targets a CardPreview, when it's the first element.
    // Since this is on horizontal cards, the left padding is removed to keep the content flush with the border.
    [`> :not([aria-hidden="true"]):first-of-type.${cardPreviewClassNames.root}`]: {
      marginLeft: `calc(var(${cardCSSVars.cardSizeVar}) * -1)`,
    },
  },
  orientationVertical: {
    flexDirection: 'column',

    // Remove lateral padding to keep CardPreview content flush with Card's borders.
    [`> .${cardPreviewClassNames.root}`]: {
      marginLeft: `calc(var(${cardCSSVars.cardSizeVar}) * -1)`,
      marginRight: `calc(var(${cardCSSVars.cardSizeVar}) * -1)`,
    },
    // Due to Tabster's "Groupper" focus functionality, hidden elements are injected before and after Card's content.
    // As such, the code below targets a CardPreview, when it's the first element.
    // Since this is on vertical cards, the top padding is removed to keep the content flush with the border.
    [`> :not([aria-hidden="true"]):first-of-type.${cardPreviewClassNames.root}`]: {
      marginTop: `calc(var(${cardCSSVars.cardSizeVar}) * -1)`,
    },
  },

  sizeSmall: {
    [cardCSSVars.cardSizeVar]: '8px',
    [cardCSSVars.cardBorderRadiusVar]: tokens.borderRadiusSmall,
  },
  sizeMedium: {
    [cardCSSVars.cardSizeVar]: '12px',
    [cardCSSVars.cardBorderRadiusVar]: tokens.borderRadiusMedium,
  },
  sizeLarge: {
    [cardCSSVars.cardSizeVar]: '16px',
    [cardCSSVars.cardBorderRadiusVar]: tokens.borderRadiusLarge,
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
 * Apply styling to the Card slots based on the state.
 */
export const useCardStyles_unstable = (state: CardState): CardState => {
  const styles = useStyles();

  const orientationMap = {
    horizontal: styles.orientationHorizontal,
    vertical: styles.orientationVertical,
  } as const;

  const sizeMap = {
    small: styles.sizeSmall,
    medium: styles.sizeMedium,
    large: styles.sizeLarge,
  } as const;

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
    orientationMap[state.orientation],
    sizeMap[state.size],
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
