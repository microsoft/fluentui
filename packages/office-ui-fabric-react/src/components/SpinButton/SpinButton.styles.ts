import { memoizeFunction } from '../../Utilities';
import { ISpinButtonStyles } from './SpinButton.Props';
import {
  ITheme,
  mergeStyleSets,
} from '../../Styling';

const MS_HIGHCONTRAST_ACTIVE = '@media screen and (-ms-high-contrast: active)';
const MS_HIGHCONTRAST_BLACK_ON_WHITE = '@media screen and (-ms-high-contrast: black-on-white)';

export const getStyles = memoizeFunction((
  customStyles: Partial<ISpinButtonStyles>,
  theme: ITheme
): ISpinButtonStyles => {
  const { semanticColors, fonts, palette } = theme;

  const defaultStyles: ISpinButtonStyles = {
    container: {
      outline: 'none',
      fontSize: '12px',
      width: '100%',
      minWidth: '86px',
      padding: '2px',
    },
    labelWrapper: {
      display: 'inline-flex'
    },
    labelWrapperStart: {
      float: 'left',
      marginRight: '10px'
    },
    labelWrapperEnd: {
      float: 'right',
      marginLeft: '10px'
    },
    labelWrapperTop: {
      marginBottom: '10px'
    },
    labelWrapperBottom: {
      marginTop: '10px'
    },
    icon: {
      padding: '2px 5px',
      fontSize: '20px'
    },
    label: {
      pointerEvents: 'none',
      padding: '2px 0px'
    },
    root: {
      display: 'flex',
      height: '26px',
      minWidth: '86px'
    },
    rootTopBottom: {
      width: '100%'
    },
    input: {
      boxSizing: 'border-box',
      boxShadow: 'none',
      margin: '0',
      border: '1px solid',
      borderColor: semanticColors.inputBorder,
      borderRadius: '0',
      fontWeight: '$ms-font-weight-regular',
      fontSize: fonts.medium,
      color: palette.neutralPrimary,
      height: '100%',
      padding: '3px 3px 4px 4px',
      outline: '0',
      textOverflow: 'ellipsis',
      display: 'block',
      float: 'left',
      width: 'calc(100% - 14px)',
      minWidth: '72px',
      borderRightWidth: '0px',
      overflow: 'hidden',
      cursor: 'text',
      userSelect: 'text'
    },
    inputHovered: {
      borderColor: semanticColors.inputBorderHovered,
      outline: '2px dashed transparent',
      [MS_HIGHCONTRAST_ACTIVE]: {
        borderColor: 'Highlight'
      }
    },
    inputFocused: {
      borderColor: palette.themePrimary,
      outline: '2px dashed transparent',
      [MS_HIGHCONTRAST_ACTIVE]: {
        borderColor: 'Highlight'
      }
    },
    inputTextSelected: {
      backgroundColor: palette.themePrimary,
      color: palette.white,
      [MS_HIGHCONTRAST_ACTIVE]: {
        backgroundColor: 'Highlight',
        borderColor: 'Highlight',
        color: 'HighlightText',
      }
    },
    inputDisabled: {
      backgroundColor: palette.neutralLighter,
      borderColor: palette.neutralLighter,
      pointerEvents: 'none',
      cursor: 'default',
      color: palette.neutralTertiaryAlt,
      [MS_HIGHCONTRAST_ACTIVE]: {
        color: 'GrayText'
      }
    },
    arrowBox: {
      outline: 'none',
      fontSize: '12px',
      display: 'block',
      float: 'left',
      height: '100%',
      border: '1px solid',
      borderColor: palette.neutralTertiaryAlt,
      borderLeftWidth: '0px',
      cursor: 'default',
      padding: '0px',
      boxSizing: 'border-box'
    },
    arrowBoxHovered: {
      borderColor: semanticColors.inputBorderHovered,
      outline: '2px dashed transparent',
      [MS_HIGHCONTRAST_ACTIVE]: {
        borderColor: 'Highlight'
      }
    },
    arrowBoxDisabled: {
      backgroundColor: palette.neutralLighter,
      borderColor: palette.neutralLighter,
      pointerEvents: 'none',
      cursor: 'default',
      color: palette.neutralTertiaryAlt,
      [MS_HIGHCONTRAST_ACTIVE]: {
        color: 'GrayText'
      }
    },
    arrowButton: {
      outline: 'none',
      display: 'block',
      height: '50%',
      width: '12px',
      padding: '0px',
      backgroundColor: 'red',
      textAlign: 'center',
      cursor: 'default',
      fontSize: '6px',
      color: palette.neutralPrimary
    },
    arrowButtonHovered: {
      backgroundColor: palette.neutralLight
    },
    arrowButtonActive: {
      backgroundColor: palette.neutralPrimary,
      color: palette.white,
      [MS_HIGHCONTRAST_ACTIVE]: {
        backgroundColor: 'Highlight',
        color: 'HighlightText'
      }
    },
    arrowButtonDisabled: {
      opacity: '0',
      [MS_HIGHCONTRAST_ACTIVE]: {
        color: 'GrayText'
      }
    },

  };
  return mergeStyleSets(defaultStyles, customStyles) as ISpinButtonStyles;
});