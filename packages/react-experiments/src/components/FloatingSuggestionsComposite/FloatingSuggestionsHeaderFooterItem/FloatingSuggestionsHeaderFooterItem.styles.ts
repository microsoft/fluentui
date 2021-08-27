import {
  getGlobalClassNames,
  getTheme,
  HighContrastSelector,
  getHighContrastNoAdjustStyle,
} from '@fluentui/style-utilities';
import type {
  IFloatingSuggestionHeaderFooterItemStylesProps,
  IFloatingSuggestionHeaderFooterItemStyles,
} from './FloatingSuggestionsHeaderFooterItem.types';

const GlobalClassNames = {
  actionButton: 'ms-FloatingSuggestionsHeaderFooterItem-actionButton',
  buttonSelected: 'ms-FloatingSuggestionsHeaderFooterItem-buttonSelected',
};

export const getStyles = (
  props: IFloatingSuggestionHeaderFooterItemStylesProps,
): IFloatingSuggestionHeaderFooterItemStyles => {
  const theme = getTheme();

  if (!theme) {
    throw new Error('theme is undefined or null in FloatingSuggestionsItem getStyles function.');
  }

  const { palette } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    actionButton: [
      classNames.actionButton,
      {
        width: '100%',
        padding: '0px',
        minWidth: '0',
        height: '100%',
        selectors: {
          [HighContrastSelector]: {
            color: 'WindowText',
            ...getHighContrastNoAdjustStyle(),
          },
          '&:hover': {
            background: palette.neutralLighter,
          },
        },
      },
    ],
    buttonSelected: [
      classNames.buttonSelected,
      {
        background: palette.themeLighter,
        selectors: {
          '&:hover': {
            background: palette.themeLight,
            [HighContrastSelector]: {
              background: 'Highlight',
              color: 'HighlightText',
              ...getHighContrastNoAdjustStyle(),
            },
          },
          [HighContrastSelector]: {
            background: 'Highlight',
            color: 'HighlightText',
            ...getHighContrastNoAdjustStyle(),
          },
        },
      },
    ],
  };
};
