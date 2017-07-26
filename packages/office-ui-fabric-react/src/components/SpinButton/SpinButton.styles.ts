import { memoizeFunction } from '../../Utilities';
import { ISpinButtonStyles, ISpinButtonArrowButtonStyles } from './SpinButton.Props';
import {
  ITheme,
  mergeStyleSets,
} from '../../Styling';

const MS_HIGHCONTRAST_ACTIVE = '@media screen and (-ms-high-contrast: active)';
const MS_HIGHCONTRAST_BLACK_ON_WHITE = '@media screen and (-ms-high-contrast: black-on-white)';

export const getArrowButtonStyles = memoizeFunction((
  theme: ITheme,
  customStyles: Partial<ISpinButtonArrowButtonStyles>
): ISpinButtonArrowButtonStyles => {

  const { semanticColors, fonts, palette } = theme;

  const defaultStyles: ISpinButtonArrowButtonStyles = {
    root: {
      outline: 'none',
      display: 'block',
      height: '50%',
      width: '14px',
      padding: '0px',
      backgroundColor: 'transparent',
      textAlign: 'center',
      cursor: 'default',
      color: palette.neutralPrimary
    },
    rootHovered: {
      backgroundColor: palette.neutralLight
    },
    rootPressed: {
      backgroundColor: palette.themePrimary,
      color: palette.white,
      [MS_HIGHCONTRAST_ACTIVE]: {
        backgroundColor: 'Highlight',
        color: 'HighlightText'
      }
    },
    rootDisabled: {
      opacity: '0',
      [MS_HIGHCONTRAST_ACTIVE]: {
        color: 'GrayText'
      }
    },
    icon: {
      fontSize: '6px',
      margin: '0'
    }
  };

  return mergeStyleSets(defaultStyles, customStyles) as ISpinButtonStyles;
});

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles: Partial<ISpinButtonStyles>
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
      minWidth: '86px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: palette.neutralTertiaryAlt,
      borderRadius: '0'
    },
    rootTopBottom: {
      width: '100%'
    },
    rootHovered: {
      borderColor: palette.neutralSecondaryAlt,
      outline: '2px dashed transparent',
      [MS_HIGHCONTRAST_ACTIVE]: {
        borderColor: 'Highlight'
      }
    },
    rootFocused: {
      borderColor: palette.themePrimary,
      outline: '2px dashed transparent',
      [MS_HIGHCONTRAST_ACTIVE]: {
        borderColor: 'Highlight'
      }
    },
    input: {
      boxSizing: 'border-box',
      boxShadow: 'none',
      border: 'none',
      margin: '0',
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
      overflow: 'hidden',
      cursor: 'text',
      userSelect: 'text'
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
      cursor: 'default',
      padding: '0px',
      boxSizing: 'border-box'
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
    arrowButtonStyles: getArrowButtonStyles(theme, customStyles ? customStyles.arrowButtonStyles : null),
  };
  return mergeStyleSets(defaultStyles, customStyles) as ISpinButtonStyles;
});