import { getGlobalClassNames, getTheme, HighContrastSelector, getHighContrastNoAdjustStyle } from '@uifabric/styling';
import {
  IFloatingSuggestionHeaderFooterItemStylesProps,
  IFloatingSuggestionHeaderFooterItemStyles,
} from './FloatingSuggestionsHeaderFooterItem.types';

const GlobalClassNames = {
  actionButton: 'ms-FloatingSuggestionsHeaderFooterItem-actionButton',
  buttonSelected: 'ms-FloatingSuggestionsHeaderFooterItem-buttonSelected',
  suggestionsTitle: 'ms-FloatingSuggestionsHeaderFooterItem-suggestionsTitle',
};

export const getStyles = (
  props: IFloatingSuggestionHeaderFooterItemStylesProps,
): IFloatingSuggestionHeaderFooterItemStyles => {
  const theme = getTheme();

  if (!theme) {
    throw new Error('theme is undefined or null in FloatingSuggestionsItem getStyles function.');
  }

  const { semanticColors } = theme;
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
          },
          '&:hover': {
            color: semanticColors.menuItemTextHovered,
          },
        },
      },
    ],
    buttonSelected: [
      classNames.buttonSelected,
      {
        background: semanticColors.menuItemBackgroundPressed,
        selectors: {
          ':hover': {
            background: semanticColors.menuDivider,
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
