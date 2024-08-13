import { getFocusStyle, hiddenContentStyle, HighContrastSelector, getGlobalClassNames } from '../../Styling';
import type { IRatingStyleProps, IRatingStyles } from './Rating.types';

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
    color,
    selectors: {
      [HighContrastSelector]: {
        color: highContrastColor,
      },
    },
  };
}

export function getStyles(props: IRatingStyleProps): IRatingStyles {
  const { disabled, readOnly, theme } = props;

  const { semanticColors, palette } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const ratingSmallIconSize = 16;
  const ratingLargeIconSize = 20;
  const ratingVerticalPadding = 8;
  const ratingHorizontalPadding = 2;

  const ratingStarUncheckedColor = palette.neutralSecondary;
  const ratingStarUncheckedHoverColor = palette.themePrimary;
  const ratingStarUncheckedHoverSelectedColor = palette.themeDark;
  const ratingStarCheckedColor = palette.neutralPrimary;
  const ratingStarDisabledColor = semanticColors.disabledBodySubtext;

  return {
    root: [
      classNames.root,
      theme.fonts.medium,
      !disabled &&
        !readOnly && {
          selectors: {
            // This is part 1 of highlighting all stars up to the one the user is hovering over
            '&:hover': {
              selectors: {
                '.ms-RatingStar-back': _getColorWithHighContrast(ratingStarCheckedColor, 'Highlight'),
              },
            },
          },
        },
    ],
    rootIsSmall: [
      classNames.rootIsSmall,
      {
        height: ratingSmallIconSize + ratingVerticalPadding * 2 + 'px',
      },
    ],
    rootIsLarge: [
      classNames.rootIsLarge,
      {
        height: ratingLargeIconSize + ratingVerticalPadding * 2 + 'px',
      },
    ],
    ratingStar: [
      classNames.ratingStar,
      {
        display: 'inline-block',
        position: 'relative',
        height: 'inherit',
      },
    ],
    ratingStarBack: [
      classNames.ratingStarBack,
      {
        // TODO: Use a proper semantic color for this
        color: ratingStarUncheckedColor,
        width: '100%',
      },
      disabled && _getColorWithHighContrast(ratingStarDisabledColor, 'GrayText'),
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
      _getColorWithHighContrast(ratingStarCheckedColor, 'Highlight'),
    ],
    ratingButton: [
      getFocusStyle(theme),
      classNames.ratingButton,
      {
        backgroundColor: 'transparent',
        padding: `${ratingVerticalPadding}px ${ratingHorizontalPadding}px`,
        boxSizing: 'content-box',
        margin: '0px',
        border: 'none',
        cursor: 'pointer',
        selectors: {
          '&:disabled': {
            cursor: 'default',
          },
          '&[disabled]': {
            cursor: 'default',
          },
        },
      },
      !disabled &&
        !readOnly && {
          selectors: {
            // This is part 2 of highlighting all stars up to the one the user is hovering over
            '&:hover ~ .ms-Rating-button': {
              selectors: {
                '.ms-RatingStar-back': _getColorWithHighContrast(ratingStarUncheckedColor, 'WindowText'),
                '.ms-RatingStar-front': _getColorWithHighContrast(ratingStarUncheckedColor, 'WindowText'),
              },
            },
            '&:hover': {
              selectors: {
                '.ms-RatingStar-back': {
                  color: ratingStarUncheckedHoverColor,
                },
                '.ms-RatingStar-front': {
                  color: ratingStarUncheckedHoverSelectedColor,
                },
              },
            },
          },
        },
      disabled && {
        cursor: 'default',
      },
    ],
    ratingStarIsSmall: [
      classNames.ratingStarIsSmall,
      {
        fontSize: ratingSmallIconSize + 'px',
        lineHeight: ratingSmallIconSize + 'px',
        height: ratingSmallIconSize + 'px',
      },
    ],
    ratingStarIsLarge: [
      classNames.ratingStartIsLarge,
      {
        fontSize: ratingLargeIconSize + 'px',
        lineHeight: ratingLargeIconSize + 'px',
        height: ratingLargeIconSize + 'px',
      },
    ],
    labelText: [classNames.labelText, hiddenContentStyle],
    ratingFocusZone: [
      getFocusStyle(theme),
      classNames.ratingFocusZone,
      {
        display: 'inline-block',
      },
    ],
  };
}
