import * as React from 'react';
import { shorthands, makeStyles, mergeClasses, makeResetStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { textClassNames } from '@fluentui/react-text';
import { FocusOutlineStyleOptions, createFocusOutlineStyle } from '@fluentui/react-tabster';

import { cardPreviewClassNames } from '../CardPreview/useCardPreviewStyles.styles';
import { cardHeaderClassNames } from '../CardHeader/useCardHeaderStyles.styles';
import { cardFooterClassNames } from '../CardFooter/useCardFooterStyles.styles';
import type { CardSlots, CardState } from './Card.types';

/**
 * Static CSS class names used internally for the component slots.
 */
export const cardClassNames: SlotClassNames<CardSlots> = {
  root: 'fui-Card',
  floatingAction: 'fui-Card__floatingAction',
  checkbox: 'fui-Card__checkbox',
};

/**
 * CSS variable names used internally for uniform styling in Card.
 */
export const cardCSSVars = {
  cardSizeVar: '--fui-Card--size',
  cardBorderRadiusVar: '--fui-Card--border-radius',
};

const focusOutlineStyle: Partial<FocusOutlineStyleOptions> = {
  outlineRadius: `var(${cardCSSVars.cardBorderRadiusVar})`,
  outlineWidth: `var(--697, var(--698, ${tokens.strokeWidthThick}))`,
  outlineOffset: '-2px', // FIXME: tokens.strokeWidthThick causes some weird bugs
};

const useCardResetStyles = makeResetStyles({
  overflow: 'hidden',
  borderRadius: `var(${cardCSSVars.cardBorderRadiusVar})`,
  padding: `var(${cardCSSVars.cardSizeVar})`,
  gap: `var(${cardCSSVars.cardSizeVar})`,

  display: 'flex',
  position: 'relative',
  boxSizing: 'border-box',
  color: `var(--699, var(--700, ${tokens.colorNeutralForeground1})`,

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
    borderRadius: `var(${cardCSSVars.cardBorderRadiusVar})`,
  },

  // Prevents CardHeader and CardFooter from shrinking.
  [`> .${cardHeaderClassNames.root}, > .${cardFooterClassNames.root}`]: {
    flexShrink: 0,
  },
});

const useCardStyles = makeStyles({
  focused: {
    ...createFocusOutlineStyle({
      style: focusOutlineStyle,
      selector: 'focus',
    }),
  },

  selectableFocused: createFocusOutlineStyle({
    style: focusOutlineStyle,
    selector: 'focus-within',
  }),

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
    [`> :not([aria-hidden="true"]).${cardPreviewClassNames.root}:first-of-type`]: {
      marginLeft: `calc(var(${cardCSSVars.cardSizeVar}) * -1)`,
    },
    // Due to Tabster's "Groupper" focus functionality, hidden elements are injected before and after Card's content.
    // As such, the code below targets a CardPreview, when it's the last element.
    // Since this is on horizontal cards, the right padding is removed to keep the content flush with the border.
    [`> :not([aria-hidden="true"]).${cardPreviewClassNames.root}:last-of-type`]: {
      marginRight: `calc(var(${cardCSSVars.cardSizeVar}) * -1)`,
    },

    // If the last child is a CardHeader or CardFooter, allow it to grow to fill the available space.
    [`> .${cardHeaderClassNames.root}:last-of-type, > .${cardFooterClassNames.root}:last-of-type`]: {
      flexGrow: 1,
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
    [`> :not([aria-hidden="true"]).${cardPreviewClassNames.root}:first-of-type`]: {
      marginTop: `calc(var(${cardCSSVars.cardSizeVar}) * -1)`,
    },
    [`> .${cardClassNames.floatingAction} + .${cardPreviewClassNames.root}`]: {
      marginTop: `calc(var(${cardCSSVars.cardSizeVar}) * -1)`,
    },

    // Due to Tabster's "Groupper" focus functionality, hidden elements are injected before and after Card's content.
    // As such, the code below targets a CardPreview, when it's the first element.
    // Since this is on vertical cards, the bottom padding is removed to keep the content flush with the border.
    [`> :not([aria-hidden="true"]).${cardPreviewClassNames.root}:last-of-type`]: {
      marginBottom: `calc(var(${cardCSSVars.cardSizeVar}) * -1)`,
    },
  },

  sizeSmall: {
    [cardCSSVars.cardSizeVar]: '8px',
    [cardCSSVars.cardBorderRadiusVar]: `var(--701, var(--702, ${tokens.borderRadiusSmall}))`,
  },
  sizeMedium: {
    [cardCSSVars.cardSizeVar]: '12px',
    [cardCSSVars.cardBorderRadiusVar]: `var(--703, var(--704, ${tokens.borderRadiusMedium}))`,
  },
  sizeLarge: {
    [cardCSSVars.cardSizeVar]: '16px',
    [cardCSSVars.cardBorderRadiusVar]: `var(--705, var(--706, ${tokens.borderRadiusLarge}))`,
  },

  interactive: {
    [`& .${textClassNames.root}`]: {
      color: 'currentColor',
    },
  },

  filled: {
    backgroundColor: `var(--707, var(--708, ${tokens.colorNeutralBackground1}))`,
    boxShadow: `var(--709, var(--710, ${tokens.shadow4}))`,

    '::after': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },
  },
  filledInteractive: {
    cursor: 'pointer',
    backgroundColor: `var(--711, var(--712, ${tokens.colorNeutralBackground1}))`,
    boxShadow: `var(--713, var(--714, ${tokens.shadow4}))`,

    '::after': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },

    ':hover': {
      color: tokens.colorNeutralForeground1Hover,
      backgroundColor: `var(--715, var(--716, ${tokens.colorNeutralBackground1Hover}))`,
      boxShadow: `var(--717, var(--718, ${tokens.shadow8}))`,
    },
    ':active': {
      backgroundColor: `var(--719, var(--720, ${tokens.colorNeutralBackground1Pressed}))`,
    },
  },
  filledInteractiveSelected: {
    backgroundColor: `var(--721, var(--722, ${tokens.colorNeutralBackground1Selected}))`,

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
    },

    ':hover': {
      color: tokens.colorNeutralForeground1Selected,
      backgroundColor: `var(--723, var(--724, ${tokens.colorNeutralBackground1Selected}))`,
    },
  },

  filledAlternative: {
    backgroundColor: `var(--725, var(--726, ${tokens.colorNeutralBackground2}))`,
    boxShadow: `var(--727, var(--728, ${tokens.shadow4}))`,

    '::after': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },
  },
  filledAlternativeInteractive: {
    cursor: 'pointer',
    backgroundColor: `var(--729, var(--730, ${tokens.colorNeutralBackground2}))`,
    boxShadow: `var(--731, var(--732, ${tokens.shadow4}))`,

    '::after': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },

    ':hover': {
      color: tokens.colorNeutralForeground2Hover,
      backgroundColor: `var(--733, var(--734, ${tokens.colorNeutralBackground2Hover}))`,
      boxShadow: `var(--735, var(--736, ${tokens.shadow8}))`,
    },
    ':active': {
      backgroundColor: `var(--737, var(--738, ${tokens.colorNeutralBackground2Pressed}))`,
    },
  },
  filledAlternativeInteractiveSelected: {
    backgroundColor: `var(--739, var(--740, ${tokens.colorNeutralBackground2Selected}))`,

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
    },

    ':hover': {
      backgroundColor: `var(--741, var(--742, ${tokens.colorNeutralBackground2Selected}))`,
    },
  },

  outline: {
    backgroundColor: `var(--743, var(--744, ${tokens.colorTransparentBackground}))`,
    boxShadow: 'none',

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1),
    },
  },
  outlineInteractive: {
    cursor: 'pointer',
    backgroundColor: `var(--745, var(--746, ${tokens.colorTransparentBackground}))`,
    boxShadow: 'none',

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1),
    },

    ':hover': {
      color: tokens.colorNeutralForeground1Hover,
      backgroundColor: `var(--747, var(--748, ${tokens.colorTransparentBackgroundHover}))`,

      '::after': {
        ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      },
    },
    ':active': {
      backgroundColor: `var(--749, var(--750, ${tokens.colorTransparentBackgroundPressed}))`,

      '::after': {
        ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      },
    },
  },
  outlineInteractiveSelected: {
    backgroundColor: `var(--751, var(--752, ${tokens.colorTransparentBackgroundSelected}))`,

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
    },

    ':hover': {
      color: tokens.colorNeutralForeground1Selected,
      backgroundColor: `var(--753, var(--754, ${tokens.colorTransparentBackgroundSelected}))`,
    },
  },

  subtle: {
    backgroundColor: `var(--755, var(--756, ${tokens.colorSubtleBackground}))`,
    boxShadow: 'none',

    '::after': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },
  },
  subtleInteractive: {
    cursor: 'pointer',
    backgroundColor: `var(--757, var(--758, ${tokens.colorSubtleBackground}))`,
    boxShadow: 'none',

    '::after': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },

    ':hover': {
      color: tokens.colorNeutralForeground1Hover,
      backgroundColor: `var(--759, var(--760, ${tokens.colorSubtleBackgroundHover}))`,
    },
    ':active': {
      backgroundColor: `var(--761, var(--762, ${tokens.colorSubtleBackgroundPressed}))`,
    },
  },
  subtleInteractiveSelected: {
    backgroundColor: `var(--763, var(--764, ${tokens.colorSubtleBackgroundSelected}))`,

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
    },

    ':hover': {
      color: tokens.colorNeutralForeground1Selected,
      backgroundColor: `var(--765, var(--766, ${tokens.colorSubtleBackgroundSelected}))`,
    },
  },

  highContrastSelected: {
    '@media (forced-colors: active)': {
      forcedColorAdjust: 'none',
      backgroundColor: 'Highlight',
      color: 'HighlightText',

      [`& .${cardPreviewClassNames.root}, & .${cardFooterClassNames.root}`]: {
        forcedColorAdjust: 'auto',
      },

      '::after': {
        ...shorthands.borderColor('Highlight'),
      },
    },
  },

  highContrastInteractive: {
    '@media (forced-colors: active)': {
      ':hover, :active': {
        forcedColorAdjust: 'none',
        backgroundColor: 'Highlight',
        color: 'HighlightText',

        [`& .${cardPreviewClassNames.root}, & .${cardFooterClassNames.root}`]: {
          forcedColorAdjust: 'auto',
        },
      },

      '::after': {
        ...shorthands.borderColor('Highlight'),
      },
    },
  },

  select: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    zIndex: 1,
  },

  hiddenCheckbox: {
    overflow: 'hidden',
    width: '1px',
    height: '1px',
    position: 'absolute',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
  },
});

/**
 * Apply styling to the Card slots based on the state.
 */
export const useCardStyles_unstable = (state: CardState): CardState => {
  'use no memo';

  const resetStyles = useCardResetStyles();
  const styles = useCardStyles();

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

  const isSelectableOrInteractive = state.interactive || state.selectable;

  const focusedClassName = React.useMemo(() => {
    if (state.selectable) {
      if (state.selectFocused) {
        return styles.selectableFocused;
      }

      return '';
    }

    return styles.focused;
  }, [state.selectFocused, state.selectable, styles.focused, styles.selectableFocused]);

  state.root.className = mergeClasses(
    cardClassNames.root,
    resetStyles,
    orientationMap[state.orientation],
    sizeMap[state.size],
    appearanceMap[state.appearance],
    isSelectableOrInteractive && styles.interactive,
    isSelectableOrInteractive && interactiveMap[state.appearance],
    state.selected && selectedMap[state.appearance],
    focusedClassName,
    isSelectableOrInteractive && styles.highContrastInteractive,
    state.selected && styles.highContrastSelected,
    state.root.className,
  );

  if (state.floatingAction) {
    state.floatingAction.className = mergeClasses(
      cardClassNames.floatingAction,
      styles.select,
      state.floatingAction.className,
    );
  }

  if (state.checkbox) {
    state.checkbox.className = mergeClasses(cardClassNames.checkbox, styles.hiddenCheckbox, state.checkbox.className);
  }

  return state;
};
