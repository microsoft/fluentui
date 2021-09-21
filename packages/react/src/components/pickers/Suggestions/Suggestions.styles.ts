import {
  getGlobalClassNames,
  getHighContrastNoAdjustStyle,
  HighContrastSelector,
  hiddenContentStyle,
} from '../../../Styling';
import type { IStyle } from '../../../Styling';
import type { ISuggestionsStyleProps, ISuggestionsStyles } from './Suggestions.types';

const GlobalClassNames = {
  root: 'ms-Suggestions',
  suggestionsContainer: 'ms-Suggestions-container',
  title: 'ms-Suggestions-title',
  forceResolveButton: 'ms-forceResolve-button',
  searchForMoreButton: 'ms-SearchMore-button',
  spinner: 'ms-Suggestions-spinner',
  noSuggestions: 'ms-Suggestions-none',
  suggestionsAvailable: 'ms-Suggestions-suggestionsAvailable',
  isSelected: 'is-selected',
};

export function getStyles(props: ISuggestionsStyleProps): ISuggestionsStyles {
  const { className, suggestionsClassName, theme, forceResolveButtonSelected, searchForMoreButtonSelected } = props;

  const { palette, semanticColors, fonts } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const actionButtonStyles: IStyle = {
    backgroundColor: 'transparent',
    border: 0,
    cursor: 'pointer',
    margin: 0,
    paddingLeft: 8,
    position: 'relative',
    borderTop: `1px solid ${palette.neutralLight}`,
    height: 40,
    textAlign: 'left',
    width: '100%',
    fontSize: fonts.small.fontSize,
    selectors: {
      ':hover': {
        backgroundColor: semanticColors.menuItemBackgroundPressed,
        cursor: 'pointer',
      },
      ':focus, :active': {
        backgroundColor: palette.themeLight,
      },
      '.ms-Button-icon': {
        fontSize: fonts.mediumPlus.fontSize,
        width: 25,
      },
      '.ms-Button-label': {
        margin: '0 4px 0 9px',
      },
    },
  };

  const actionButtonSelectedStyles: IStyle = {
    backgroundColor: palette.themeLight,
    selectors: {
      [HighContrastSelector]: {
        backgroundColor: 'Highlight',
        borderColor: 'Highlight',
        color: 'HighlightText',
        ...getHighContrastNoAdjustStyle(),
      },
    },
  };

  return {
    root: [
      classNames.root,
      {
        minWidth: 260,
      },
      className,
    ],
    suggestionsContainer: [
      classNames.suggestionsContainer,
      {
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: 300,
        transform: 'translate3d(0,0,0)',
      },
      suggestionsClassName,
    ],
    title: [
      classNames.title,
      {
        padding: '0 12px',
        fontSize: fonts.small.fontSize,
        color: palette.themePrimary,
        lineHeight: 40,
        borderBottom: `1px solid ${semanticColors.menuItemBackgroundPressed}`,
      },
    ],
    forceResolveButton: [
      classNames.forceResolveButton,
      actionButtonStyles,
      forceResolveButtonSelected && [classNames.isSelected, actionButtonSelectedStyles],
    ],
    searchForMoreButton: [
      classNames.searchForMoreButton,
      actionButtonStyles,
      searchForMoreButtonSelected && [classNames.isSelected, actionButtonSelectedStyles],
    ],
    noSuggestions: [
      classNames.noSuggestions,
      {
        textAlign: 'center',
        color: palette.neutralSecondary,
        fontSize: fonts.small.fontSize,
        lineHeight: 30,
      },
    ],
    suggestionsAvailable: [classNames.suggestionsAvailable, hiddenContentStyle],
    subComponentStyles: {
      spinner: {
        root: [
          classNames.spinner,
          {
            margin: '5px 0',
            paddingLeft: 14,
            textAlign: 'left',
            whiteSpace: 'nowrap',
            lineHeight: 20,
            fontSize: fonts.small.fontSize,
          },
        ],
        circle: {
          display: 'inline-block',
          verticalAlign: 'middle',
        },
        label: {
          display: 'inline-block',
          verticalAlign: 'middle',
          margin: '0 10px 0 16px',
        },
      },
    },
  };
}
