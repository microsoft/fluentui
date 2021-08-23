import {
  getGlobalClassNames,
  getTheme,
  HighContrastSelector,
  getHighContrastNoAdjustStyle,
} from '@fluentui/style-utilities';
import type {
  IFloatingSuggestionItemStylesProps,
  IFloatingSuggestionItemStyles,
} from './FloatingSuggestionsItem.types';

const GlobalClassNames = {
  root: 'ms-FloatingSuggestionsItem',
  itemButton: 'ms-FloatingSuggestionsItem-itemButton',
  closeButton: 'ms-FloatingSuggestionsItem-closeButton',
  isSelected: 'ms-FloatingSuggestionsItem-isSelected',
  displayText: 'ms-FloatingSuggestionsItem-displayText',
};

export const getStyles = (props: IFloatingSuggestionItemStylesProps): IFloatingSuggestionItemStyles => {
  const theme = getTheme();

  if (!theme) {
    throw new Error('theme is undefined or null in FloatingSuggestionsItem getStyles function.');
  }

  const { isSelected } = props;
  const { palette, fonts } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      {
        display: 'flex',
        alignItems: 'stretch',
        boxSizing: 'border-box',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        selectors: {
          '&:hover': {
            background: palette.neutralLighter,
          },
          '&:hover .ms-FloatingSuggestionsItem-closeButton': {
            display: 'block',
          },
          '&:active, &:focus': {
            background: palette.themeLight,
          },
        },
      },
    ],
    itemButton: [
      classNames.itemButton,
      {
        width: '100%',
        padding: '0px',
        minWidth: '0',
        height: '100%',
        selectors: {
          [HighContrastSelector]: {
            color: 'WindowText',
          },
        },
      },
      isSelected && [
        classNames.isSelected,
        {
          background: palette.themeLighter,
          selectors: {
            ':hover': {
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
    ],
    closeButton: [
      classNames.closeButton,
      {
        display: 'none',
        padding: '0 4px',
        height: 'auto',
        width: 32,
        selectors: {
          ':hover': {
            [HighContrastSelector]: {
              background: 'Window',
              color: 'WindowText',
              ...getHighContrastNoAdjustStyle(),
            },
          },
        },
      },
      isSelected && [
        classNames.isSelected,
        {
          background: palette.themeLighter,
          selectors: {
            ':hover': {
              background: palette.themeLight,
            },
            [HighContrastSelector]: {
              background: 'Highlight',
              color: 'HighlightText',
              ...getHighContrastNoAdjustStyle(),
            },
          },
        },
      ],
    ],
    displayText: [
      classNames.displayText,
      {
        padding: '0 12px',
        fontSize: fonts.medium.fontSize,
        lineHeight: '40px',
      },
    ],
  };
};
