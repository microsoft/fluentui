import { getGlobalClassNames, FontSizes, IStyle, hiddenContentStyle } from '../../../Styling';
import { ISuggestionsStyleProps, ISuggestionsStyles } from './Suggestions.types';

const GlobalClassNames = {
  root: 'ms-Suggestions',
  suggestionsContainer: 'ms-Suggestions-container',
  title: 'ms-Suggestions-title',
  forceResolveButton: 'ms-forceResolve-button',
  searchForMoreButton: 'ms-SearchMore-button',
  spinner: 'ms-Suggestions-spinner',
  noSuggestions: 'ms-Suggestions-none',
  suggestionsAvailable: 'ms-Suggestions-suggestionsAvailable',
  isSelected: 'is-selected'
};

export function getStyles(props: ISuggestionsStyleProps): ISuggestionsStyles {
  const { className, suggestionsClassName, theme, forceResolveButtonSelected, searchForMoreButtonSelected } = props;

  const { palette } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const actionButtonStyles: IStyle = {
    background: 'none',
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
    fontSize: FontSizes.small,
    selectors: {
      ':hover': {
        backgroundColor: palette.neutralLight,
        cursor: 'pointer'
      },
      ':focus, :active': {
        backgroundColor: palette.themeLight
      },
      '.ms-Button-icon': {
        fontSize: FontSizes.icon,
        width: 25
      },
      '.ms-Button-label': {
        margin: '0 4px 0 9px'
      }
    }
  };

  const actionButtonSelectedStyles: IStyle = {
    backgroundColor: palette.themeLight
  };

  return {
    root: [
      classNames.root,
      {
        minWidth: 260
      },
      className
    ],
    suggestionsContainer: [
      classNames.suggestionsContainer,
      {
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: 300
      },
      suggestionsClassName
    ],
    title: [
      classNames.title,
      {
        padding: '0 12px',
        fontSize: FontSizes.small,
        color: palette.themePrimary,
        lineHeight: 40,
        borderBottom: `1px solid ${palette.neutralLight}`
      }
    ],
    forceResolveButton: [
      classNames.forceResolveButton,
      actionButtonStyles,
      forceResolveButtonSelected && [classNames.isSelected, actionButtonSelectedStyles]
    ],
    searchForMoreButton: [
      classNames.searchForMoreButton,
      actionButtonStyles,
      searchForMoreButtonSelected && [classNames.isSelected, actionButtonSelectedStyles]
    ],
    noSuggestions: [
      classNames.noSuggestions,
      {
        textAlign: 'center',
        color: palette.neutralSecondary,
        fontSize: FontSizes.small,
        lineHeight: 30
      }
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
            fontSize: FontSizes.small
          }
        ],
        circle: {
          display: 'inline-block',
          verticalAlign: 'middle'
        },
        label: {
          display: 'inline-block',
          verticalAlign: 'middle',
          margin: '0 10px 0 16px'
        }
      }
    }
  };
}
