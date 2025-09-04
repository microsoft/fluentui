import * as React from 'react';
import { shorthands, makeStyles, mergeClasses, makeResetStyles, GriffelStyle } from '@griffel/react';
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
  outlineWidth: tokens.strokeWidthThick,
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

const disabledStyles: GriffelStyle = {
  cursor: 'not-allowed',
  userSelect: 'none',
  color: tokens.colorNeutralForegroundDisabled,
  backgroundColor: tokens.colorNeutralBackgroundDisabled,
  boxShadow: tokens.shadow2,
  ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),

  '::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    zIndex: `calc(${tokens.zIndexContent} + 1)`,
  },

  '::after': {
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
  },
};

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

  interactive: {
    [`& .${textClassNames.root}`]: {
      color: 'currentColor',
    },
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
      color: tokens.colorNeutralForeground1Hover,
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
      color: tokens.colorNeutralForeground1Selected,
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
      color: tokens.colorNeutralForeground2Hover,
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
      color: tokens.colorNeutralForeground2Selected,
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
      color: tokens.colorNeutralForeground1Hover,
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
      color: tokens.colorNeutralForeground1Selected,
      backgroundColor: tokens.colorTransparentBackgroundSelected,
    },
  },
  outlineDisabled: {
    backgroundColor: tokens.colorTransparentBackground,
    boxShadow: 'none',
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),

    '&:hover, &:active': {
      backgroundColor: tokens.colorTransparentBackground,
      boxShadow: 'none',
    },

    '::after': {
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
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
      color: tokens.colorNeutralForeground1Hover,
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
      color: tokens.colorNeutralForeground1Selected,
      backgroundColor: tokens.colorSubtleBackgroundSelected,
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
    zIndex: tokens.zIndexContent,
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

  disabled: {
    ...disabledStyles,
    '&:hover, &:active': disabledStyles,
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

  const isSelectableOrInteractive = !state.disabled && (state.interactive || state.selectable);

  const focusedClassName = React.useMemo(() => {
    if (state.disabled) {
      return '';
    }

    if (state.selectable) {
      if (state.selectFocused) {
        return styles.selectableFocused;
      }

      return '';
    }

    return styles.focused;
  }, [state.disabled, state.selectFocused, state.selectable, styles.focused, styles.selectableFocused]);

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
    state.disabled && styles.disabled,
    state.disabled && state.appearance === 'outline' && styles.outlineDisabled,
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
