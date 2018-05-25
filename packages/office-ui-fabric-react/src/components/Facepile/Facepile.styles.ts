import { IFacepileStyleProps, IFacepileStyles } from './Facepile.types';

import {
  IStyle,
  hiddenContentStyle,
  getFocusStyle,
  getGlobalClassNames,
} from '../../Styling';

const GlobalClassNames = {
  root: 'ms-Facepile',
  addButton: 'ms-Facepile-addButton',
  descriptiveOverflowButton: 'ms-Facepile-descriptiveOverflowButton',
  itemButton: 'ms-Facepile-itemButton',
  itemContainer: 'ms-Facepile-itemContainer',
  members: 'ms-Facepile-members',
  overflowButton: 'ms-Facepile-overflowButton',
}

export const getStyles = (
  props: IFacepileStyleProps
): IFacepileStyles => {
  const {
    className,
    theme,
    spacingAroundItemButton = 2,
  } = props;

  const { palette, fonts } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const ItemButtonStyles: IStyle = {
    textAlign: 'center',
    padding: 0,
    borderRadius: '50%',
    verticalAlign: 'top',
    // :global(.ms-Persona-details) {
    //   flex: 1 0 auto;
    // }
    selectors: {
      'button&': {
        display: 'inline',
        background: 'none',
        backgroundColor: 'transparent',
        padding: 0,
        cursor: 'pointer',
        border: 'none',
        selectors: {
          // test in firefox
          '&::-moz-focus-inner': {
            padding: 0,
            border: 0
          }
        }
      },
      '.ms-Persona-details': {
        background: 'red',
      }
    }
  }

  return ({
    root: [
      classNames.root,
      {
        width: 'auto'
      },
      className
    ],
    addButton: [
      classNames.addButton,
      getFocusStyle(theme, -1),
      ItemButtonStyles,
      {
        selectors: {
          'button&': {
            fontSize: fonts.medium.fontSize,
            color: palette.white,
            backgroundColor: palette.themePrimary,
            marginLeft: spacingAroundItemButton * 2 + 'px',
            selectors: {
              '&:hover': {
                backgroundColor: palette.themeDark,
              },
              '&:focus': {
                backgroundColor: palette.themeDark,
              },
              '&:active': {
                backgroundColor: palette.themeDarker,
              },
              '&:disabled': {
                backgroundColor: palette.neutralTertiaryAlt,
              },
            }
          },
        }

      }
    ],
    descriptiveOverflowButton: [
      classNames.descriptiveOverflowButton,
      getFocusStyle(theme, -1),
      ItemButtonStyles,
      {
        selectors: {
          'button&': {
            fontSize: fonts.small.fontSize,
            color: palette.neutralSecondary,
            backgroundColor: palette.neutralLight,
            marginLeft: '${spacingAroundItemButton * 2}px',
          }
        }
      }
    ],
    itemButton: [
      classNames.itemButton,
      ItemButtonStyles,
    ],
    itemContainer: [
      classNames.itemContainer,
      {
        display: 'flex'
      }
    ],
    members: [
      classNames.members,
      {
        display: 'flex',
        overflow: 'hidden',
        margin: '${-1 * spacingAroundItemButton}px',
        selectors: {
          '& > *': {
            flex: '0 0 auto',
            margin: '${spacingAroundItemButton}px',
          }
        }
      }
    ],
    overflowButton: [
      classNames.overflowButton,
      getFocusStyle(theme, -1),
      ItemButtonStyles,
      {
        selectors: {
          'button&': {
            fontSize: fonts.medium.fontSize,
            color: palette.neutralSecondary,
            backgroundColor: palette.neutralLight,
            marginLeft: '${spacingAroundItemButton * 2}px',
          }
        }
      }
    ],
    overflowInitialsIcon: [
      {
        color: palette.neutralPrimary
      }
    ],
    screenReaderOnly: hiddenContentStyle
  });
};