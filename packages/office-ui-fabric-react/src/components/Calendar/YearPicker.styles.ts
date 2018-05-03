import { IStyle, ITheme, getTheme, concatStyleSets, FontSizes, FontWeights } from '../../Styling';
import { memoizeFunction } from '../../Utilities';

interface IYearPickerStyles {
  root?: IStyle;
  header?: IStyle;
  title?: IStyle;
  navContainer?: IStyle;
  navPrev?: IStyle;
  navNext?: IStyle;
  body?: IStyle;
  optionGrid?: IStyle;
  optionGridCell?: IStyle;
}

const getStyles = memoizeFunction((theme: ITheme, customStyles?: IYearPickerStyles): IYearPickerStyles => {
  if (!theme) {
    theme = getTheme();
  }
  const styles: IYearPickerStyles = {
    root: {
      color: theme.palette.black,
      fontSize: FontSizes.medium,
      width: 280
    },
    header: {
      height: 28,
      lineHeight: 28,
      width: "100%",
      position: "relative",
      display: "inline-flex"
    },
    title: {
      display: "inline-block",
      fontSize: FontSizes.large,
      fontWeight: FontWeights.semibold,
      height: 28,
      lineHeight: 28,
      marginLeft: 5,
      flexGrow: 1,
      paddingTop: 0,
      paddingRight: 5,
      paddingBottom: 0,
      paddingLeft: 5,
      textAlign: "left",
      border: "none",
      selectors: {
        "&.selectable": {
          background: "transparent",
          cursor: "pointer",
          selectors: {
            ":hover": {
              color: theme.palette.neutralSecondary
            }
          }
        }
      }
    },
    navContainer: {
      lineHeight: 28,
      alignSelf: "flex-end",
      marginRight: 12
    },
    navPrev: {
      display: "inline-block",
      fontSize: FontSizes.medium,
      position: "relative",
      border: "none",
      padding: 0,
      background: "transparent",
      width: 28,
      height: 28,
      lineHeight: 28,
      cursor: "pointer",
      selectors: {
        ":hover": {
          backgroundColor: theme.palette.neutralLight
        },
        "&.disabled": {
          visibility: "hidden"
        }
      }
    },
    navNext: {
      display: "inline-block",
      fontSize: FontSizes.medium,
      position: "relative",
      border: "none",
      padding: 0,
      background: "transparent",
      width: 28,
      height: 28,
      lineHeight: 28,
      marginLeft: 3,
      marginRight: 2,
      cursor: "pointer",
      selectors: {
        ":hover": {
          backgroundColor: theme.palette.neutralLight
        },
        "&.disabled": {
          visibility: "hidden"
        }
      }
    },
    body: {},
    optionGrid: {
      height: 210,
      width: 280,
      marginTop: 12
    },
    optionGridCell: {
      width: 60,
      height: 60,
      lineHeight: 60,
      fontSize: FontSizes.smallPlus,
      border: "none",
      cursor: "pointer",
      marginRight: 10,
      marginBottom: 10,
      backgroundColor: "transparent",
      selectors: {
        ":hover": {
          backgroundColor: theme.palette.neutralLight
        },
        "&.current": {
          backgroundColor: theme.palette.themeLight
        },
        "&.disabled": {
          backgroundColor: theme.palette.neutralLighter,
          color: theme.palette.neutralTertiaryAlt,
          pointerEvents: "none"
        }
      }
    }
  };

  return concatStyleSets(styles, customStyles);
});

export { IYearPickerStyles, getStyles }