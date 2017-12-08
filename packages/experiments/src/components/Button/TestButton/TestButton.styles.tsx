import { ISplitButtonBaseStyleProps, ISplitButtonBaseStyles } from '../_base/SplitButton.base.types';
import { IButtonBaseStyles, IButtonBaseStyleProps } from '../_base/Button.base.types';
import { IMenuButtonBaseStyles, IMenuButtonBaseStyleProps } from '../_base/MenuButton.base.types';

export const getButtonStyles = (props: IButtonBaseStyleProps): IButtonBaseStyles => {
  const { theme, checked,
    //disabled,
    expanded } = props;
  //const { palette, fonts } = theme;

  let s = theme.semanticColors;

  // let buttonBackground = s.buttonBackground;
  let buttonBackgroundChecked = s.buttonBackgroundChecked;
  let buttonBackgroundHovered = s.buttonBackgroundHovered;
  // let buttonBackgroundCheckedHovered = s.buttonBackgroundCheckedHovered;

  let buttonText = s.buttonText;

  let buttonTextHovered = s.buttonTextHovered;
  let buttonTextChecked = s.buttonTextChecked;
  let buttonTextCheckedHovered = s.buttonTextCheckedHovered;

  return ({
    root: [
      {
        display: 'inline-flex',
        backgroundColor: 'red',
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
      checked && {
        backgroundColor: buttonBackgroundChecked,
        color: buttonTextChecked,
        selectors: {
          ':hover': {
            backgroundColor: theme.palette.neutralLight,
            color: buttonTextCheckedHovered
          },
        }
      },
      expanded && {
        backgroundColor: buttonBackgroundChecked,
        color: buttonTextChecked
      }
    ],
  });
};

export const getMenuButtonStyles = (props: IMenuButtonBaseStyleProps): IMenuButtonBaseStyles => {
  const { theme, checked, disabled, expanded } = props;
  // const { palette, fonts } = theme;

  return ({
    root: [
      {
        display: 'flex',
        color: theme.palette.white,
        backgroundColor: 'green',
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
    ],
  });
};

export const getStyles = (props: ISplitButtonBaseStyleProps): ISplitButtonBaseStyles => {
  const {
    theme,
    // checked,
    // disabled,
    // expanded
  } = props;
  return ({
    root: [
      'ms-Split-Button', {
        padding: '5px', // to see the bg working
        background: 'blue',
        display: 'inline-flex',
      }
    ],
    divider: {
      backgroundColor: theme.palette.neutralTertiaryAlt
    }
  });
};
