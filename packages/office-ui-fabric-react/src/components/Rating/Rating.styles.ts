import {
  getFocusStyle,
  hiddenContentStyle,
  HighContrastSelector,
  getGlobalClassNames,
} from '../../Styling';
import { IRatingStyleProps, IRatingStyles } from './Rating.types';

const GlobalClassNames = {
  ratingStar: 'ms-RatingStar-container',
  ratingStarBack: 'ms-RatingStar-back',
  ratingStarFront: 'ms-RatingStar-front',
  ratingButton: 'ms-Rating-button',
  rootIsSmall: 'ms-Rating--small',
  rootIsLarge: 'ms-Rating--large',
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

  const ratingSmallIconSize = '16px';
  const ratingLargeIconSize = '20px';

  const ratingStarUncheckedColor = palette.neutralTertiary;
  const ratingStarCheckedColor = semanticColors.bodyTextChecked;
  const ratingStarDisabledColor = semanticColors.disabledBodyText;

  return {
    root: [
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
        padding: '3px 3px 0px 0px',
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
          }
        }
      },
      disabled && {
        cursor: 'default'
      },
    ],
    rootIsSmall: [
      classNames.rootIsSmall,
      {
        fontSize: ratingSmallIconSize,
        lineHeight: ratingSmallIconSize
      }
    ],
    rootIsLarge: [
      classNames.rootIsLarge,
      {
        fontSize: ratingLargeIconSize,
        lineHeight: ratingLargeIconSize
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
