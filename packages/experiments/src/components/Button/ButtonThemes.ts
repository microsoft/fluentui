import { IButtonBaseStyles, IButtonBaseStyleProps } from './_base/Button.base.types';
import { ISplitButtonBaseStyles, ISplitButtonBaseStyleProps } from './_base/SplitButton.base.types';
import { HighContrastSelector } from '../../Styling';

export function standardStyles(props: IButtonBaseStyleProps): IButtonBaseStyles {
  const {
    expanded,
    checked,
    // disabled
  } = props;

  let s = props.theme.semanticColors;

  let buttonBackground = s.buttonBackground;
  let buttonBackgroundChecked = s.buttonBackgroundChecked;
  let buttonBackgroundHovered = s.buttonBackgroundHovered;
  let buttonBackgroundCheckedHovered = s.buttonBackgroundCheckedHovered;

  let buttonText = s.buttonText;
  let buttonTextHovered = s.buttonTextHovered;
  let buttonTextChecked = s.buttonTextChecked;
  let buttonTextCheckedHovered = s.buttonTextCheckedHovered;

  return {
    button: [
      {
        backgroundColor: buttonBackground,
        color: buttonText,
        selectors: {
          ':hover': {
            backgroundColor: buttonBackgroundHovered,
            color: buttonTextHovered
          },
          ':active': {
            backgroundColor: buttonBackgroundChecked,
            color: buttonTextChecked
          }
        }
      },
      expanded && {
        backgroundColor: buttonBackgroundChecked,
        color: buttonTextChecked
      },
      checked && {
        backgroundColor: buttonBackgroundChecked,
        color: buttonTextChecked,
        selectors: {
          ':hover': {
            backgroundColor: buttonBackgroundCheckedHovered,
            color: buttonTextCheckedHovered
          },
        }
      }
    ]
  };
}

export function standardSplitStyles(props: ISplitButtonBaseStyleProps): ISplitButtonBaseStyles {
  const { theme, disabled, checked, expanded } = props;
  return ({
    // Split button styles
    divider: {
      backgroundColor: theme.palette.neutralTertiaryAlt
    },

    button: [{
      color: theme.palette.white,
      backgroundColor: theme.palette.neutralLighter,
      selectors: {
        ':hover': {
          backgroundColor: theme.palette.neutralLight
        }
      },
    },
    disabled && {
      backgroundColor: theme.palette.neutralLighter,
      selectors: {
        ':hover': {
          backgroundColor: theme.palette.neutralLighter,
        }
      }
    },
    checked && {
      backgroundColor: theme.palette.themePrimary,

    },
    expanded && {
      backgroundColor: theme.palette.neutralLight,
    }
    ],
    menuIcon: [
      {
        color: theme.palette.neutralPrimary
      },
      disabled && {
        color: theme.palette.neutralTertiary
      }
    ]
  })
}

export function primaryStyles(props: IButtonBaseStyleProps): IButtonBaseStyles {

  const {
    theme,
    disabled,
    checked,
    expanded
  } = props;

  return {
    button: [
      {
        backgroundColor: theme.palette.themePrimary,
        color: theme.palette.white,
        selectors: {
          [HighContrastSelector]: {
            color: 'Window',
            backgroundColor: 'WindowText',
            MsHighContrastAdjust: 'none'
          },
          ':hover': {
            backgroundColor: theme.palette.themeDarkAlt,
            color: theme.palette.white,
            selectors: {
              [HighContrastSelector]: {
                color: 'Window',
                backgroundColor: 'WindowText',
                MsHighContrastAdjust: 'none'
              }
            }
          },
          ':active': {
            backgroundColor: theme.palette.themeDark,
            color: theme.palette.white,
            selectors: {
              [HighContrastSelector]: {
                color: 'Window',
                backgroundColor: 'WindowText',
                MsHighContrastAdjust: 'none'
              }
            }
          }
        }
      },
      expanded && {
        backgroundColor: theme.palette.themeDark,
        color: theme.palette.white
      },
      checked && {
        backgroundColor: theme.palette.themeDark,
        color: theme.palette.white,
        selectors: {
          ':hover': {
            backgroundColor: theme.palette.themePrimary,
            color: theme.palette.white
          },
        }
      },
      disabled && {
        selectors: {
          [HighContrastSelector]: {
            color: 'GrayText',
            borderColor: 'GrayText',
            backgroundColor: 'Window'
          }
        },
      }
    ]
  }
}

export function primarySplitStyles(props: ISplitButtonBaseStyleProps): ISplitButtonBaseStyles {
  const { theme, disabled, checked, expanded } = props;
  return ({
    // Split button styles
    divider: {
      backgroundColor: theme.palette.themeLighter
    },

    button: [{
      backgroundColor: theme.palette.themePrimary,
      color: theme.palette.white,
      selectors: {
        ':hover': {
          backgroundColor: theme.palette.themeDark
        }
      },
    },
    disabled && {
      backgroundColor: theme.palette.neutralLighter,
      selectors: {
        ':hover': {
          backgroundColor: theme.palette.neutralLighter,
        }
      }
    },
    checked && {
      backgroundColor: theme.palette.themeDark,

    },
    expanded && {
      backgroundColor: theme.palette.themeDark,
    }
    ],
    menuIcon: [
      {
        color: theme.palette.white
      },
      disabled && {
        color: theme.palette.neutralTertiary
      }
    ]
  })
}