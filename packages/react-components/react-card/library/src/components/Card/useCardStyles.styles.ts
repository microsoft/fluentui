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
  outlineWidth: `var(--ctrl-token-Card-697, var(--semantic-token-Card-698, ${tokens.strokeWidthThick}))`,
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
    [cardCSSVars.cardBorderRadiusVar]: `var(--ctrl-token-Card-701, var(--semantic-token-Card-702, ${tokens.borderRadiusSmall}))`,
  },
  sizeMedium: {
    [cardCSSVars.cardSizeVar]: '12px',
    [cardCSSVars.cardBorderRadiusVar]: `var(--ctrl-token-Card-703, var(--semantic-token-Card-704, ${tokens.borderRadiusMedium}))`,
  },
  sizeLarge: {
    [cardCSSVars.cardSizeVar]: '16px',
    [cardCSSVars.cardBorderRadiusVar]: `var(--ctrl-token-Card-705, var(--semantic-token-Card-706, ${tokens.borderRadiusLarge}))`,
  },

  interactive: {
    [`& .${textClassNames.root}`]: {
      color: 'currentColor',
    },
  },

  filled: {
    backgroundColor: `var(--ctrl-token-Card-707, var(--semantic-token-Card-708, ${tokens.colorNeutralBackground1}))`,
    boxShadow: `var(--ctrl-token-Card-709, var(--semantic-token-Card-710, ${tokens.shadow4}))`,

    '::after': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },
  },
  filledInteractive: {
    cursor: 'pointer',
    backgroundColor: `var(--ctrl-token-Card-711, var(--semantic-token-Card-712, ${tokens.colorNeutralBackground1}))`,
    boxShadow: `var(--ctrl-token-Card-713, var(--semantic-token-Card-714, ${tokens.shadow4}))`,

    '::after': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },

    ':hover': {
      color: tokens.colorNeutralForeground1Hover,
      backgroundColor: `var(--ctrl-token-Card-715, var(--semantic-token-Card-716, ${tokens.colorNeutralBackground1Hover}))`,
      boxShadow: `var(--ctrl-token-Card-717, var(--semantic-token-Card-718, ${tokens.shadow8}))`,
    },
    ':active': {
      backgroundColor: `var(--ctrl-token-Card-719, var(--semantic-token-Card-720, ${tokens.colorNeutralBackground1Pressed}))`,
    },
  },
  filledInteractiveSelected: {
    backgroundColor: `var(--ctrl-token-Card-721, var(--semantic-token-Card-722, ${tokens.colorNeutralBackground1Selected}))`,

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
    },

    ':hover': {
      color: tokens.colorNeutralForeground1Selected,
      backgroundColor: `var(--ctrl-token-Card-723, var(--semantic-token-Card-724, ${tokens.colorNeutralBackground1Selected}))`,
    },
  },

  filledAlternative: {
    backgroundColor: `var(--ctrl-token-Card-725, var(--semantic-token-Card-726, ${tokens.colorNeutralBackground2}))`,
    boxShadow: `var(--ctrl-token-Card-727, var(--semantic-token-Card-728, ${tokens.shadow4}))`,

    '::after': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },
  },
  filledAlternativeInteractive: {
    cursor: 'pointer',
    backgroundColor: `var(--ctrl-token-Card-729, var(--semantic-token-Card-730, ${tokens.colorNeutralBackground2}))`,
    boxShadow: `var(--ctrl-token-Card-731, var(--semantic-token-Card-732, ${tokens.shadow4}))`,

    '::after': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },

    ':hover': {
      color: tokens.colorNeutralForeground2Hover,
      backgroundColor: `var(--ctrl-token-Card-733, var(--semantic-token-Card-734, ${tokens.colorNeutralBackground2Hover}))`,
      boxShadow: `var(--ctrl-token-Card-735, var(--semantic-token-Card-736, ${tokens.shadow8}))`,
    },
    ':active': {
      backgroundColor: `var(--ctrl-token-Card-737, var(--semantic-token-Card-738, ${tokens.colorNeutralBackground2Pressed}))`,
    },
  },
  filledAlternativeInteractiveSelected: {
    backgroundColor: `var(--ctrl-token-Card-739, var(--semantic-token-Card-740, ${tokens.colorNeutralBackground2Selected}))`,

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
    },

    ':hover': {
      color: tokens.colorNeutralForeground2Selected,
      backgroundColor: `var(--ctrl-token-Card-741, var(--semantic-token-Card-742, ${tokens.colorNeutralBackground2Selected}))`,
    },
  },

  outline: {
    backgroundColor: `var(--ctrl-token-Card-743, var(--semantic-token-Card-744, ${tokens.colorTransparentBackground}))`,
    boxShadow: 'none',

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1),
    },
  },
  outlineInteractive: {
    cursor: 'pointer',
    backgroundColor: `var(--ctrl-token-Card-745, var(--semantic-token-Card-746, ${tokens.colorTransparentBackground}))`,
    boxShadow: 'none',

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1),
    },

    ':hover': {
      color: tokens.colorNeutralForeground1Hover,
      backgroundColor: `var(--ctrl-token-Card-747, var(--semantic-token-Card-748, ${tokens.colorTransparentBackgroundHover}))`,

      '::after': {
        ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      },
    },
    ':active': {
      backgroundColor: `var(--ctrl-token-Card-749, var(--semantic-token-Card-750, ${tokens.colorTransparentBackgroundPressed}))`,

      '::after': {
        ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      },
    },
  },
  outlineInteractiveSelected: {
    backgroundColor: `var(--ctrl-token-Card-751, var(--semantic-token-Card-752, ${tokens.colorTransparentBackgroundSelected}))`,

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
    },

    ':hover': {
      color: tokens.colorNeutralForeground1Selected,
      backgroundColor: `var(--ctrl-token-Card-753, var(--semantic-token-Card-754, ${tokens.colorTransparentBackgroundSelected}))`,
    },
  },

  subtle: {
    backgroundColor: `var(--ctrl-token-Card-755, var(--semantic-token-Card-756, ${tokens.colorSubtleBackground}))`,
    boxShadow: 'none',

    '::after': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },
  },
  subtleInteractive: {
    cursor: 'pointer',
    backgroundColor: `var(--ctrl-token-Card-757, var(--semantic-token-Card-758, ${tokens.colorSubtleBackground}))`,
    boxShadow: 'none',

    '::after': {
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },

    ':hover': {
      color: tokens.colorNeutralForeground1Hover,
      backgroundColor: `var(--ctrl-token-Card-759, var(--semantic-token-Card-760, ${tokens.colorSubtleBackgroundHover}))`,
    },
    ':active': {
      backgroundColor: `var(--ctrl-token-Card-761, var(--semantic-token-Card-762, ${tokens.colorSubtleBackgroundPressed}))`,
    },
  },
  subtleInteractiveSelected: {
    backgroundColor: `var(--ctrl-token-Card-763, var(--semantic-token-Card-764, ${tokens.colorSubtleBackgroundSelected}))`,

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
    },

    ':hover': {
      color: tokens.colorNeutralForeground1Selected,
      backgroundColor: `var(--ctrl-token-Card-765, var(--semantic-token-Card-766, ${tokens.colorSubtleBackgroundSelected}))`,
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
