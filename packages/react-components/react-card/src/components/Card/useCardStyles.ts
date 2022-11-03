import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { cardPreviewClassNames } from '../CardPreview/useCardPreviewStyles';
import { cardHeaderClassNames } from '../CardHeader/useCardHeaderStyles';
import { cardFooterClassNames } from '../CardFooter/useCardFooterStyles';
import type { CardSlots, CardState } from './Card.types';

/**
 * Static CSS class names used internally for the component slots.
 */
export const cardClassNames: SlotClassNames<CardSlots> = {
  root: 'fui-Card',
  select: 'fui-Card__select',
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
    ...shorthands.overflow('hidden'),
    ...shorthands.borderRadius(`var(${cardCSSVars.cardBorderRadiusVar})`),
    ...shorthands.padding(`var(${cardCSSVars.cardSizeVar})`),
    ...shorthands.gap(`var(${cardCSSVars.cardSizeVar})`),

    display: 'flex',
    position: 'relative',
    boxSizing: 'border-box',
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

  interactiveLink: {
    textDecorationLine: 'none',
  },
  interactiveButton: {
    ...shorthands.border('0'),
    width: '100%',
    alignItems: 'normal',
    appearance: 'none',
    lineHeight: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    textAlign: 'start',
  },

  filled: {
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,

    '::after': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
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
  filledInteractiveSelected: {
    backgroundColor: tokens.colorNeutralBackground1Selected,

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
    },

    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Selected,
    },
  },

  filledAlternative: {
    backgroundColor: tokens.colorNeutralBackground2,
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
  filledAlternativeInteractiveSelected: {
    backgroundColor: tokens.colorNeutralBackground2Selected,

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
    },

    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2Selected,
    },
  },

  outline: {
    backgroundColor: tokens.colorTransparentBackground,
    boxShadow: 'none',

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1),
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
  outlineInteractiveSelected: {
    backgroundColor: tokens.colorTransparentBackgroundSelected,

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
    },

    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundSelected,
    },
  },

  subtle: {
    backgroundColor: tokens.colorSubtleBackground,
    boxShadow: 'none',

    '::after': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
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
  subtleInteractiveSelected: {
    backgroundColor: tokens.colorSubtleBackgroundSelected,

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
    },

    ':hover': {
      backgroundColor: tokens.colorSubtleBackgroundSelected,
    },
  },

  select: {
    position: 'absolute',
    top: '4px',
    right: '4px',
  },

  selectHidden: {
    width: 0,
    height: 0,
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

const getInteractiveClassnames = (state: CardState, styles: ReturnType<typeof useStyles>) => {
  const selectedMap = {
    filled: styles.filledInteractiveSelected,
    'filled-alternative': styles.filledAlternativeInteractiveSelected,
    outline: styles.outlineInteractiveSelected,
    subtle: styles.subtleInteractiveSelected,
  };
  const interactiveMap = {
    filled: styles.filledInteractive,
    'filled-alternative': styles.filledAlternativeInteractive,
    outline: styles.outlineInteractive,
    subtle: styles.subtleInteractive,
  };
  const baseClass = mergeClasses(interactiveMap[state.appearance], state.selected && selectedMap[state.appearance]);

  if (state.components.root === 'button') {
    return mergeClasses(baseClass, styles.interactiveButton);
  }

  if (state.components.root === 'a') {
    return mergeClasses(baseClass, styles.interactiveLink);
  }

  return baseClass;
};

/**
 * Apply styling to the Card slots based on the state.
 */
export const useCardStyles_unstable = (state: CardState): CardState => {
  const styles = useStyles();

  const orientationMap = {
    horizontal: styles.orientationHorizontal,
    vertical: styles.orientationVertical,
  };

  const sizeMap = {
    small: styles.sizeSmall,
    medium: styles.sizeMedium,
    large: styles.sizeLarge,
  };

  const appearanceMap = {
    filled: styles.filled,
    'filled-alternative': styles.filledAlternative,
    outline: styles.outline,
    subtle: styles.subtle,
  };

  state.root.className = mergeClasses(
    cardClassNames.root,
    styles.root,
    orientationMap[state.orientation],
    sizeMap[state.size],
    appearanceMap[state.appearance],
    state.interactive && getInteractiveClassnames(state, styles),
    state.root.className,
  );

  if (state.select) {
    state.select.className = mergeClasses(
      cardClassNames.select,
      state.hasSelectSlot ? styles.select : styles.selectHidden,
      state.select.className,
    );
  }

  return state;
};
