import {
  getFocusStyle,
  hiddenContentStyle,
  HighContrastSelector,
  getGlobalClassNames,
} from '../../Styling';
import { IRatingStyleProps, IRatingStyles } from './Rating.types';

const GlobalClassNames = {
  root: 'ms-RatingStar-root',
  rootIsSmall: 'ms-RatingStar-root--small',
  rootIsLarge: 'ms-RatingStar-root--large',
  ratingStar: 'ms-RatingStar-container',
  ratingStarBack: 'ms-RatingStar-back',
  ratingStarFront: 'ms-RatingStar-front',
  ratingButton: 'ms-Rating-button',
  ratingStarIsSmall: 'ms-Rating--small',
  ratingStartIsLarge: 'ms-Rating--large',
  labelText: 'ms-Rating-labelText',
  ratingFocusZone: 'ms-Rating-focuszone',
};

function _getColorWithHighContrast(color: string, highContrastColor: string) {
  return {
    color: color,
    selectors: {
      [HighContrastSelector]: {
        color: highContrastColor
      }
    }
  };
}

export function getStyles(props: IRatingStyleProps): IRatingStyles {
  const {
    disabled,
    readOnly,
    theme
  } = props;

  const {
    semanticColors,
    palette
  } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const ratingSmallIconSize = 16;
  const ratingLargeIconSize = 20;
  const ratingPadding = 3;

  const ratingStarUncheckedColor = palette.neutralTertiary;
  const ratingStarUncheckedHoverColor = palette.themePrimary;
  const ratingStarUncheckedHoverSelectedColor = palette.themeDark;
  const ratingStarCheckedColor = semanticColors.bodyTextChecked;
  const ratingStarDisabledColor = semanticColors.disabledBodyText;

  return {
    root: [
      classNames.root,
      !disabled && !readOnly && {
        selectors: {
          // This is part 1 of highlighting all stars up to the one the user is hovering over
          '&:hover': {
            selectors: {
              '.ms-RatingStar-back': _getColorWithHighContrast(ratingStarCheckedColor, 'Highlight'),
            }
          }
        }
      }
    ],
    rootIsSmall: [
      classNames.rootIsSmall,
      {
        height: ratingSmallIconSize + (ratingPadding * 2) + 'px'
      }
    ],
    rootIsLarge: [
      classNames.rootIsLarge,
      {
        height: ratingLargeIconSize + (ratingPadding * 2) + 'px'
      }
    ],
    ratingStar: [
      classNames.ratingStar,
      {
        display: 'inline-block',
        position: 'relative'
      }
    ],
    ratingStarBack: [
      classNames.ratingStarBack,
      {
        // TODO: Use a proper semantic color for this
        color: ratingStarUncheckedColor,
        width: '100%'
      },
      disabled && _getColorWithHighContrast(ratingStarDisabledColor, 'GrayText')
    ],
    ratingStarFront: [
      classNames.ratingStarFront,
      {
        position: 'absolute',
        height: '100 %',
        left: '0',
        top: '0',
        textAlign: 'center',
        verticalAlign: 'middle',
        overflow: 'hidden',
      },
      _getColorWithHighContrast(ratingStarCheckedColor, 'Highlight')
    ],
    ratingButton: [
      getFocusStyle(theme, 0),
      classNames.ratingButton,
      {
        backgroundColor: 'transparent',
        padding: `${ratingPadding}px ${ratingPadding}px ${ratingPadding}px 0px`,
        margin: '0px',
        border: 'none',
        cursor: 'pointer',
        selectors: {
          '&:disabled': {
            cursor: 'default'
          },
          '&[disabled]': {
            cursor: 'default'
          }
        }
      },
      !disabled && !readOnly && {
        selectors: {
          // This is part 2 of highlighting all stars up to the one the user is hovering over
          '&:hover ~ .ms-Rating-button': {
            selectors: {
              '.ms-RatingStar-back': _getColorWithHighContrast(ratingStarUncheckedColor, 'WindowText'),
              '.ms-RatingStar-front': _getColorWithHighContrast(ratingStarUncheckedColor, 'WindowText'),
            }
          },
          '&:hover': {
            selectors: {
              '.ms-RatingStar-back': {
                color: ratingStarUncheckedHoverColor
              },
              '.ms-RatingStar-front': {
                color: ratingStarUncheckedHoverSelectedColor
              }
            }
          }
        }
      },
      disabled && {
        cursor: 'default'
      },
    ],
    ratingStarIsSmall: [
      classNames.ratingStarIsSmall,
      {
        fontSize: ratingSmallIconSize + 'px',
        lineHeight: ratingSmallIconSize + 'px'
      }
    ],
    ratingStarIsLarge: [
      classNames.ratingStartIsLarge,
      {
        fontSize: ratingLargeIconSize + 'px',
        lineHeight: ratingLargeIconSize + 'px'
      }
    ],
    labelText: [
      classNames.labelText,
      hiddenContentStyle
    ],
    ratingFocusZone: [
      classNames.ratingFocusZone,
      {
        display: 'inline-block',
        paddingBottom: '1px'
      }
    ]
  };
}
